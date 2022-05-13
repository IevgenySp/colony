import React from 'react';
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react';
import ControlPanel from '../ControlPanel';
import App from '../../App';

afterEach(cleanup);

it('Check ticking button', () => {
    render(<ControlPanel />);

    const startButton = screen.getByText(/Start ticking/i);
    expect(startButton).toBeDefined();

    fireEvent.click(startButton);

    const stopButton = screen.getByText(/Stop ticking/i);
    expect(stopButton).toBeDefined();
});

describe('Dropdowns check', () => {
    it('Check presets dropdown', () => {
        const { getByText, getByTestId } = render(<ControlPanel />);

        const presetsDropdown = getByTestId(/presets-input/i);
        expect(presetsDropdown).toBeDefined();

        fireEvent.change(presetsDropdown, {target: {value: 'preset1'}});

        const presetsDropdown2 = getByText(/4x4 predefined/i);
        expect(presetsDropdown2).toBeDefined();
    });

    it('Check speed dropdown', () => {
        const { getByText, getByTestId } = render(<ControlPanel />);

        const speedDropdown = getByTestId(/speed-input/i);
        expect(speedDropdown).toBeDefined();

        fireEvent.change(speedDropdown, {target: {value: 2000}});

        const speedDropdown2 = getByText(/speed ms: 2000/i);
        expect(speedDropdown2).toBeDefined();
    })
});

it('Check tick label', async () => {
    jest.useFakeTimers();
    const { getByText, getByTestId } = render(<App/>);

    const startButton = getByText(/Start ticking/i);
    const tickLabel = getByTestId(/refresh-tick/i);

    expect(tickLabel).toBeDefined();

    fireEvent.click(startButton);

    act(() => {
        jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
        expect(tickLabel.textContent).not.toBe('Current tick: 0');
    });
});
