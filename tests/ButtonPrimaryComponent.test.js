import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonPrimaryComponent } from '../src/components/global/ButtonPrimaryComponent';

describe('ButtonPrimaryComponent', () => {
  test('should render ButtonPrimaryComponent correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ButtonPrimaryComponent onPress={onPressMock} text="Click Me" />,
    );

    const button = getByText('Click Me');
    expect(button).toBeTruthy();
  });

  test('should call onPress function when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ButtonPrimaryComponent onPress={onPressMock} text="Click Me" />,
    );

    const button = getByText('Click Me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });

  // Add more tests as needed for different scenarios
});
