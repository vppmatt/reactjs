import axios from 'axios';

export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `http://localhost:8080/api/cctransaction?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : "http://localhost:8080/api/countries", method: "GET", headers : {'Accept': 'application/json'} });
}
