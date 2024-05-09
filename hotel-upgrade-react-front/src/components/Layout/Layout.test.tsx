import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders h1 element', () => {
  const { container } = render(<Layout>toto</Layout>);
  expect(container).toMatchSnapshot()
  const nav = screen.getByRole("navigation")
  expect(nav).toBeInTheDocument();
});
