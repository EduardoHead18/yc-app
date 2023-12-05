import React from 'react';
import { render } from '@testing-library/react-native';
import { Picker } from '@react-native-picker/picker';

describe('Picker Component', () => {
  test('Picker renders correctly', () => {
    const { getByDisplayValue } = render(
      <Picker selectedValue="Chiapas" onValueChange={() => {}}>
        <Picker.Item label="Chiapas" value="Chiapas" />
        <Picker.Item label="Tabasco" value="Tabasco" />
        <Picker.Item label="Quintana Roo" value="Quintana Roo" />
      </Picker>
    );

    // Asegúrate de que el componente se renderice correctamente
    expect(getByDisplayValue('Chiapas')).toBeTruthy();
    expect(getByDisplayValue('Tabasco')).toBeTruthy();
    expect(getByDisplayValue('Quintana Roo')).toBeTruthy();
  });
});
import React from 'react';
import { render } from '@testing-library/react-native';
import { Picker } from '@react-native-picker/picker';

describe('Picker Component', () => {
  test('Picker renders correctly', () => {
    const { getByTestId } = render(
      <Picker selectedValue="Chiapas" onValueChange={() => {}} testID="myPicker">
        <Picker.Item label="Chiapas" value="Chiapas" />
        <Picker.Item label="Tabasco" value="Tabasco" />
        <Picker.Item label="Quintana Roo" value="Quintana Roo" />
      </Picker>
    );

    // Asegúrate de que el componente se renderice correctamente
    expect(getByTestId('myPicker')).toBeTruthy();
  });
});
