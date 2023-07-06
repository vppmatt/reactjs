import { configureStore } from "@reduxjs/toolkit";


const initialState = { countries : [], lastFetch: null};

const paymentsSystemReducer = (state = initialState, action) => {
    if (action.type === 'replace-countries') {
        return {countries : action.value, lastFetch: new Date().getTime()}
    }
    else {
        return state;
    }
};

const store = configureStore({reducer : paymentsSystemReducer});

export default store;
