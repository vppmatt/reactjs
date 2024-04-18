import {applyMiddleware, combineReducers, createAsyncThunk, createSlice, legacy_createStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import {getCountries} from "../data/DataFunctions";

const initialUserState = {
    user: {name: "Matt", role: ""},
}

const initialCountriesState = {
    countries : {data : [], loading: false},
    lastCountryRefresh: null
}

const userSlice = createSlice(
    {
        name: "user",
        initialState: initialUserState,
        reducers: {
            update: (state, action) => {
                state.user = action.payload;
            },
            logout: (state) => {
                state.user = {name: "", role: ""};
            }
        }
    }
);

const getCountriesThunk = createAsyncThunk(
    "countries/get",
    async () => {
        console.log("matt")
        const result = await getCountries();
        console.log("data has arrived - updating the store");
        return result.data;
    }
)

const countriesSlice = createSlice(
    {
        name: "countries",
        initialState: initialCountriesState,
        reducers: {
            loading: (state) => {
                console.log("countries marked as loading")
                state.countries.loading = true;
            }

        },
        extraReducers: builder => {
            builder.addCase(getCountriesThunk.fulfilled, (state, action) => {
                console.log("data has arrived", action.payload)
                state.countries.data = action.payload;
                state.countries.loading = false;
                console.log("state updated")
                });
        }
    }
);

const rootReducer = combineReducers({user: userSlice.reducer, countries: countriesSlice.reducer});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;

export const login = userSlice.actions.update;
export const logout = userSlice.actions.logout;
export const updateCountries = getCountriesThunk;
export const loadingCountries = countriesSlice.actions.loading;

