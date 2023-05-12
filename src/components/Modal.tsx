import React, { useState } from "react";
import { StyleSheet, Modal as RNModal, TouchableOpacity, ScrollView } from "react-native";
import Block from "./Block";
import { useTheme } from '../hooks/';

const Modal = ({ children, isVisible, onClose }) => {
  const { assets, colors, sizes } = useTheme();

  return (
    <RNModal visible={isVisible} animationType='fade' transparent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <Block style={{
          // backgroundColor: "#fff",
          borderRadius: 3,
          width: "90%",
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {children}
        </Block>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
