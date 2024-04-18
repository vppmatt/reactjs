import { render, screen } from '@testing-library/react';
import App from "./App";
import { expect, test, vi } from 'vitest';

vi.mock('./data/DataFunctions', () => {
    return {};
})

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText("Payments Application");
    expect(linkElement).toBeInTheDocument();
});
