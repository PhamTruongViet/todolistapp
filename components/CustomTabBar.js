import { StyleSheet, Text, View, Keyboard } from "react-native";
import React from "react";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";

const CustomTabBar = ({ keyboardShown, ...props }) => {
  if (keyboardShown) {
    return null;
  }

  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    marginBottom: -50,
    marginHorizontal: 10,
    bottom: 60,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 0,
  },
});
