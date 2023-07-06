import {render, screen} from "@testing-library/react";
import Transactions from "./Transactions";
import {BrowserRouter} from "react-router-dom";

jest.mock('../../../data/DataFunctions', () => {
    return {
        getCountries: () => Promise.resolve({data: {country: ['a', 'b', 'c']}})
    };
});

test('countries are displayed when loaded', async () => {
    render(<BrowserRouter>
        <Transactions/>
    </BrowserRouter>);

    const countrySelector = await screen.findByRole('combobox', {}, 5000);   //note could find by ID but this is a chance to use findByRole!
    expect(countrySelector).toBeInTheDocument();

});

test('all countries are displayed', async () => {

    render(<BrowserRouter>
        <Transactions/>
    </BrowserRouter>);

    const options = await screen.findAllByRole('option', {}, 2000);   //note could find by ID but this is a chance to use findByRole!

    expect(options).toHaveLength(4);

});

