import {BrowserRouter} from "react-router-dom";
import Transactions from "./Transactions";
import {render, screen} from "@testing-library/react";

jest.mock('../../Data/DataFunctions', () => {
    return {
        getCountries : () => Promise.resolve({data : {country : ["a","b","c"]}}),
        getAllPaymentsForCountry : () => Promise.resolve({data : {}}),
    };
});

test ("all countries are included in select when component first renders",
    async () => {
        render(<BrowserRouter><Transactions searchTerm="" /></BrowserRouter>);
        const countrySelector = await screen.findByRole('combobox', {} , 5000);
        expect(countrySelector).toBeInTheDocument();
        expect(countrySelector).toHaveLength(4);

    });