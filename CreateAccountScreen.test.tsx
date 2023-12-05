import React from 'react';
import { render } from '@testing-library/react-native';
import { CreateAccount } from './CreateAccountScreen';

test('renders CreateAccount component', () => {
  const { getByText } = render(<CreateAccount />);
  const textElement = getByText('Get Started 👋');
  expect(textElement).toBeDefined();
});
