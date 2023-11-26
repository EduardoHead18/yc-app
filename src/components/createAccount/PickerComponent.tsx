import { Picker } from "@react-native-picker/picker";

export const PickerCity = ({ selectedCity, setSelectedCity }:any) => {

  return (
    <Picker
      selectedValue={selectedCity}
      onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
    >
      <Picker.Item label="Altamirano" value="Altamirano" />
      <Picker.Item label="Ocosingo" value="Ocosingo" />
    </Picker>
  );
};

export const PickerState = ({ selectedState, setSelectedState}:any) => {
  return (
    <Picker
    selectedValue={selectedState}
    onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}
  >
    <Picker.Item label="Chiapas" value="Chiapas" />
    <Picker.Item label="Tabasco" value="Tabasco" />
    <Picker.Item label="Quintana Roo" value="Quintana Roo" />
  </Picker>
  )
}
