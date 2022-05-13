import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../../App';

afterEach(cleanup);

it('Check grid render', () => {
    const { getByTestId, getAllByTestId } = render(<App />);

    const grid = getByTestId(/grid/i);
    const el = getAllByTestId(/cell-test/i);

    expect(grid).toBeDefined();
    expect(el).toBeDefined();
    expect(el.length).toBe(2500);

});
