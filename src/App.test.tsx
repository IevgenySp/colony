import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders select colony preset dropdown', () => {
  render(<App />);

  const controlPanelElement = screen.getAllByTestId(/control-panel/i);
  const gridElement = screen.getAllByTestId(/grid/i);

  expect(controlPanelElement).toBeDefined();
  expect(gridElement).toBeDefined();
});
