import {render, screen} from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

describe.only('css applied correctly for search box validation', () => {

    test('check search initially has no class applied to it', () => {
        render(<Search/>);
        const input = screen.getByLabelText('Order Id:');
        expect(input).not.toHaveClass('searchBoxError');
    })

    test('Invalid entry in input results in a search error', () => {
        render(<Search/>);

        const input = screen.getByLabelText('Order Id:');
        act(() => {
            userEvent.type(input, '  ');
        });
        expect(input).toHaveClass('searchBoxError');
    })

});
