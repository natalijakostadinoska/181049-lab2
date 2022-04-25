import { render, screen } from '@testing-library/react';
import App from '../../../../../181049-lab2/frontend/src/components/App/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
