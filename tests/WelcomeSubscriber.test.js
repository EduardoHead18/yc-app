import React from 'react';
import { render } from '@testing-library/react-native';
import { WelcomeSubscriber } from '../src/screens/WelcomeSubscriber';

describe('WelcomeSubscriber Component', () => {
  test('should render WelcomeSubscriber component', () => {
    const { getByText } = render(<WelcomeSubscriber />);
    
    // Verificar que el componente se renderice correctamente
    expect(getByText('Welcome subscriber subscriptor to Your Confort 🙂')).toBeTruthy();
  });
});
