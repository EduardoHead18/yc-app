import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const SpinnerComponet = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="red" />
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
