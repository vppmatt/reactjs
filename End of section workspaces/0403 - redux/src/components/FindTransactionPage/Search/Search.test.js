import {render, screen} from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

test('searchTerm stateful variable is updated as user types in value', () => {
    render(<Search />);
    const input = screen.getByLabelText('Order Id:');
    userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
});

describe('css applied correctly for search box validation', () => {

    test('check search initially has no class applied to it', () => {
        render(<Search/>);
        const input = screen.getByLabelText('Order Id:'); //note we have used get so this will fail if it can't find it.
        expect(input).not.toHaveClass('searchBoxError');
    }),

        test('Invalid entry in input results in a search error', () => {
            render(<Search/>);
            const input = screen.getByLabelText('Order Id:');
            userEvent.type(input, '  ');
            expect(input).toHaveClass('searchBoxError');
        })
});
