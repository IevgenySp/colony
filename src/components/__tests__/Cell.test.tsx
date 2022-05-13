import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Cell from '../Cell';

afterEach(cleanup);

it('Check alive cell', () => {
    const { getByTestId } = render(<Cell isAlive={true} cellSize={10} />);

    const el = getByTestId(/cell-test/i);

    expect(el).toBeDefined();
    expect(el.style.width).toBe('10px');
    expect(el.className.includes('alive')).toBe(true)
});

it('Check dead cell', () => {
    const { getByTestId } = render(<Cell isAlive={false} cellSize={25} />);

    const el = getByTestId(/cell-test/i);

    expect(el).toBeDefined();
    expect(el.style.width).toBe('25px');
    expect(el.className.includes('alive')).not.toBe(true)
});
