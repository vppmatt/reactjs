import {render, screen} from "@testing-library/react";
import Transactions from "./Transactions";
import {BrowserRouter} from "react-router-dom";
import { expect, test, vi } from "vitest";

vi.mock('../../../data/DataFunctions', () => {
    return {
        getCountries: () => Promise.resolve({data: ['a', 'b', 'c']})
    };
});

test('countries are displayed when loaded', async () => {
    render(<BrowserRouter>
        <Transactions/>
    </BrowserRouter>);

    const countrySelector = await screen.findByRole('combobox', {}, 2000);   //note could find by ID but this is a chance to use findByRole!
    expect(countrySelector).toBeInTheDocument();
    expect(countrySelector.options).toHaveLength(4);
});
