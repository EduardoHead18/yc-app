import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { allColors } from "../src/utils/colors";

export const SpinnerComponet = () => (
  <View testID="spinner" style={[styles.container, styles.horizontal]}>
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
