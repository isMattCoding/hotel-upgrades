import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('e2e test', async () => {
  render(<App />)
  const pElement = screen.getByText('Your management tool to maximise revenue')
  expect(pElement).toBeInTheDocument();
  const button = screen.getAllByText('Dashboard')[0]
  fireEvent.click(button);

});
