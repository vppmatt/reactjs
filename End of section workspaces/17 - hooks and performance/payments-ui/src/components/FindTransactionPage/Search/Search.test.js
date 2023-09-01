import {render, screen, within} from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

describe('css applied correctly for search box validation', () => {

    test('check search initially has no class applied to it', () => {
        render(<Search/>);
        const input = screen.getByLabelText('Order Id:');
        expect(input).not.toHaveClass('searchBoxError');
    })

    test('Invalid entry in input results in a search error', async () => {
        render(<Search/>);
        const input = screen.getByLabelText('Order Id:');
        await userEvent.click(input);
        await userEvent.keyboard('  ');
        expect(input).toHaveClass('searchBoxError');
    })

});


test('search data is correctly sent to parent component', async () => {
    const mockSetSearchTerm = jest.fn();
    render(<Search setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByRole('textbox', { name: /order id:/i });
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.click(input);
    await userEvent.keyboard('123');
    await userEvent.click(button);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('123');
});

test('exploring matchers', () => {

    const {container} = render(<Search />);
    screen.logTestingPlaygroundURL();
    screen.debug();

    //example - find by role
    const input = screen.getByRole('textbox', { name: /order id:/i });

    //you can't find a form using a role - you need to use a query selector
    const form = container.querySelector('div > div > form')

    //example - find a button inside a div - not strictly needed here!
    //within is imported from testing-library/react
    const button = within(form).getByRole('button', {name : /search/i });

    const resetButton = screen.getByTestId('reset');

});
