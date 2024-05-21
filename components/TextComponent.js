import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import { fontFamilies } from "../constants";
import { COLORS } from "../constants";

const TextComponent = (props) => {
  const { text, font, size, color, flex, styles } = props;

  return (
    <Text
      style={[
        globalStyles.text,
        {
          flex: flex ?? 1,
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? COLORS.desc,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default TextComponent;
