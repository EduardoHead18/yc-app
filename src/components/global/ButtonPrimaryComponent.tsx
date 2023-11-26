import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import { allColors } from "../../utils/colors";

export const ButtonPrimaryComponent = ({
  onPress,
  text,
  marginBottom,
  marginTop
}: any) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      borderRadius: 20,
      padding: 10,
      backgroundColor: allColors.primary,
      width: windowWidth * 0.8, //80%
      marginTop:  marginTop,
      marginBottom: marginBottom,
    },
    text: {
      fontSize: 15,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={[styles.text, { color: "#fff", fontWeight: "bold" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
