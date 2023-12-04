import React from 'react';
import { render } from '@testing-library/react-native';
import { SettingScreen } from './SettingScreen';

test('renders title correctly', () => {
  const { getByText } = render(<SettingScreen />);
  const titleElement = getByText('Ajustes');
  expect(titleElement).toBeTruthy();
});
