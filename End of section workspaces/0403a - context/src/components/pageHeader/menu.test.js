import {render, screen} from "@testing-library/react";
import Menu from "./Menu";
import {BrowserRouter} from "react-router-dom";

test('menu contains the link to the search page', () => {
    render(<BrowserRouter>
                <Menu />
            </BrowserRouter>);
    const firstLink = screen.getByText("Find", {exact:false} ); //this will fail if the element doesn't exist as we have used get
    expect(firstLink).toBeInTheDocument();
    expect(firstLink).toHaveAttribute('href','/find');
});
