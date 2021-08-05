import {createStore} from 'redux';

const initialState = {
    countries : [],
    lastFetch : null,
    refreshCounter : 0
}

//action .... {type : "receive-new-countries", value : [...]  }
//            {type : "increment-counter" }
const paymentsSystemReducer = (state = initialState, action) => {
    if (action.type === "increment-counter") {
        return {...state, refreshCounter : state.refreshCounter + 1};
    }
    else if (action.type === "receive-new-countries") {
        return { ...state, countries : action.value, lastFetch : new Date()};
    }
    else {
        //log a problem!
        return state;
    }
}

const store = createStore(paymentsSystemReducer);

export default store;