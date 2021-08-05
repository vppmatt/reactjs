import {render, screen} from '@testing-library/react';
import Search from "./Search";
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from "react-router-dom";

describe("searchBoxError class application", () => {
    test("when component first renders the search box doesnt have the error class applied",
        () => {
            render(<BrowserRouter>
                    <Search />
                </BrowserRouter>
                );
            const input = screen.getByLabelText("Order Id:");
            expect(input).not.toHaveClass("searchBoxError");
        }),

        test ("when the user enters an invalid search term, the error class is applied",
            () => {
                render(<Search />);
                const input = screen.getByLabelText("Order Id:");
                userEvent.type(input, "  ");
                expect(input).toHaveClass("searchBoxError");
            })
});


test("the searchTerm stateful variable is updated as expected",
    () => {
        render(<Search />);
        const input = screen.getByLabelText("Order Id:");
        userEvent.type(input, "hello");
        expect(input).toHaveValue("hello");
    });