import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import Svg, { Path } from "react-native-svg";

const CustomTabBarButton = (props) => {
  const { route, children, accessibilityState, onPress, icon } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopLeftRadius: route === "CustomCalendar" ? 10 : 0,
              },
            ]}
          />
          <Svg width={69} height={59} viewBox="0 0 75 63">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.green}
            />
          </Svg>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopRightRadius: route === "Profile" ? 10 : 0,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route === "CustomCalendar" ? 10 : 0,
            borderBottomLeftRadius: route === "CustomCalendar" ? 10 : 0,
            borderTopRightRadius: route === "Profile" ? 10 : 0,
            borderBottomRightRadius: route === "Profile" ? 10 : 0,
          },
        ]}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
  },
  activeBtn: {
    flex: 1,
    position: "absolute",
    top: -22,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: COLORS.green,
  },
});
