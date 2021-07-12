import {createStore} from 'redux';

const initialState = { countries : [], lastFetch: null};

const paymentsSystemReducer = (state = initialState, action) => {
    if (action.type === 'replace-countries') {
        return {countries : action.value, lastFetch: new Date()}
    }
    else {
        return state;
    }
};

const store = createStore(paymentsSystemReducer);

export default store;
