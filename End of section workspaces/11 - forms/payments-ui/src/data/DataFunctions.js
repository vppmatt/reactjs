import axios from 'axios';

let serverURL = "https://payments.multicode.uk";

if (process.env.APP_SERVER_URL) {
    serverURL = process.env.APP_SERVER_URL;
}


export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `${serverURL}/api/payment?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : `${serverURL}/api/country`, method: "GET", headers : {'Accept': 'application/json'} });
}
