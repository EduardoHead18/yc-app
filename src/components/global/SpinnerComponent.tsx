import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { allColors } from "../../utils/colors";

export const SpinnerComponet = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={allColors.backgorunGreen} />
  </View>
);

const styles = StyleSheet.create({
  container: {
  
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
