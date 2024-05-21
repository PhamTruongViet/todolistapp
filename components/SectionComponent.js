import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { COLORS } from "../constants";

const SectionComponent = (props) => {
  const { children, styles, color } = props;

  return (
    <View
      style={[
        globalStyles.section,
        styles,
        { backgroundColor: color ?? COLORS.transparent },
      ]}
    >
      {children}
    </View>
  );
};

export default SectionComponent;
