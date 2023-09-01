import {useDebugValue, useState} from "react";

export const useLocalStorage = (key, isArray, value) => {

    //on first set up, see if there is some data in local storage, if not use the value passed into the function
    const getIntitailState = () => {
        if (localStorage.getItem(key) != null) {
            const rawValue = localStorage.getItem(key);
            if (isArray) {
                return rawValue.split(",");
            }
            else {
                return localStorage.getItem(key);
            }
        }
        else {
            return value;
        }
    }

    const [state, setState] = useState(getIntitailState());

    const storeValue = (newValue) => {
        setState(newValue);
        localStorage.setItem(key, newValue);
    }

    useDebugValue("countries : " + state.length);

    return [state, storeValue];

}
