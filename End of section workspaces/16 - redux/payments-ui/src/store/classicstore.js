import {applyMiddleware, legacy_createStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {getCountries} from "../data/DataFunctions";

const initialState = {
    user: {name : "Matt", role : ""},
    countries : {data : [], loading: false},
    lastCountryRefresh: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "user/update":
            return {...state, user : action.payload};
        case "user/logout":
            return {...state, user : {name : "", role : ""}};
        case "countries/loading":
            return {...state, countries : {data : state.countries.data, loading: true}};
        case "countries/update":
            return {...state, countries : {data : action.payload, loading: false}, lastCountryRefresh: new Date().getDate()};
        default:
            return state;
    }
}

const store = legacy_createStore(reducer, applyMiddleware(thunk));

export default store;

export const login = (user) => ({type: "user/update", payload: user});
export const logout = () => ({type: "user/logout"});

//export const updateCountries = (countries) => ({type: "countries/update", payload: countries});

export const updateCountries = (countries) => {
    console.log(countries); //just logging it to avoid the warning it's an unused variable
    dispatchEvent(new Event({type: "countries/loading"}));

    return async (dispatch, getState) => {
        console.log(getState); //just logging it to avoid the warning it's an unused variable
        const result = await getCountries();
        console.log("data has arrived - updating the store");
        dispatch({type: "countries/update", payload: result.data});
    }
}

