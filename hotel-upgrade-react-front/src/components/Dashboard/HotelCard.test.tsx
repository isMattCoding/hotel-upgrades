import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelCard from './HotelCard';

const hotel = {
  id: 42,
  name: "Crown",
  city: "Melbourne"
}

test('renders h1 element', () => {
  const { container } = render(<HotelCard hotel={hotel}/>);
  expect(container).toMatchSnapshot()
  const h5Element = screen.getByText(`${hotel.name}, ${hotel.city}`)
  expect(h5Element).toBeInTheDocument();
});
