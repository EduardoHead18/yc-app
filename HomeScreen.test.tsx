import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from './HomeScreen';

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    const textElement = getByText('Buscar...');
    expect(textElement).toBeTruthy();
  });

  // Puedes agregar más pruebas según sea necesario
});
