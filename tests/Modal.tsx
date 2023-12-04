import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { allColors } from "../src/utils/colors";

export const ModalComponent = ({ isModalOpen, setIsModalOpen, onPress, title, titleButton }: any) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModalOpen(!isModalOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setIsModalOpen(!isModalOpen); if(onPress)onPress()}}
            >
              <Text style={styles.textStyle}>{titleButton}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setIsModalOpen(true)}></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: allColors.backgorunGreen,
  },
  buttonClose: {
    paddingHorizontal:50,
    backgroundColor: allColors.backgorunGreen,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
  },
});
