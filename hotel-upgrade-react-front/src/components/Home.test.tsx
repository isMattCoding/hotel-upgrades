import React from 'react';
import { render, screen } from '@testing-library/react';
import {Home} from './Home';

test('renders h1 element', () => {
  render(<Home />);
  const h1Element = screen.getByText('HotelUpgrades')
  expect(h1Element).toBeInTheDocument();
});
