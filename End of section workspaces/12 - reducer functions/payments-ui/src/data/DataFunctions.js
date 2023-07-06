import axios from 'axios';

export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `https://payments.multicode.uk/api/payment?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getAllPaymentsForOrderId = (orderId) => {
    const transactionsPromise = axios({url : `https://payments.multicode.uk/api/payment?order=${orderId}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : "https://payments.multicode.uk/api/country", method: "GET", headers : {'Accept': 'application/json'} });
}

export const addNewTransaction = (payment) => {
    return axios({url : "https://payments.multicode.uk/api/payment",
        method: "POST",
        headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'},
        data: payment});
}
