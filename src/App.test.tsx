import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import SignInPage from './pages/SignInPage';

test('renders login', () => {
  const { getByText } = render(<SignInPage />);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});

test('failed Login', () => {
  const { getByText } = render(<SignInPage />);
  fireEvent.click(getByText('Sign in'))
  const errorMessage = getByText(/Invalid Credentials/i);
  expect(errorMessage).toBeInTheDocument();
})
