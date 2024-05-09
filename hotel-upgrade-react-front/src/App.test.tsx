import React from 'react';
import { findAllByText, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('e2e test', () => {
  render(<App />);
  const pElement = screen.getByText('Your management tool to maximise revenue')
  expect(pElement).toBeInTheDocument();

  const button = screen.getAllByText('Dashboard')[1]

  fireEvent.click(button);
});
