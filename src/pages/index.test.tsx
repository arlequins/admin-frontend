import { render, screen } from '@testing-library/react';

import PublicPage from '.';

test('renders PublicPage and check text', () => {
  render(<PublicPage />);
  const linkElement = screen.getByText(/Public/i);
  expect(linkElement).toBeInTheDocument();
});
