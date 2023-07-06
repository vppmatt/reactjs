import axios from 'axios';

export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `https://payments.multicode.uk/api/payment?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : "https://payments.multicode.uk/api/country", method: "GET", headers : {'Accept': 'application/json'} });
}
