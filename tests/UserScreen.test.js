import React from 'react';
import { render, getByText } from '@testing-library/react-native';
import { UserScreen } from './UserScreen';


describe('UserScreen Component', () => {
  test('should render UserScreen component', () => {
    const { getByText } = render(<UserScreen />);
    
    // Verificar que el componente se renderice correctamente
    expect(getByText('UserScreen')).toBeTruthy();
  });
});
