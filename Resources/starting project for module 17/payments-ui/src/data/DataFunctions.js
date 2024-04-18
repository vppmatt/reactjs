import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL;


export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `${serverURL}/api/payment?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : `${serverURL}/api/country`, method: "GET", headers : {'Accept': 'application/json'} });
}

export const addNewTransaction = (payment) => {
    return axios({url : `${serverURL}/api/payment`,
        method: "POST",
        headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'},
        data: payment});
}

export const getAllPaymentsForOrderId = (orderId) => {
    const transactionsPromise = axios({url : `${serverURL}/api/payment?order=${orderId}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

