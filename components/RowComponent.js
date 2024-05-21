import { View, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyles";

const RowComponent = (props) => {
  const { children, justify, onPress, onLongPress, styles } = props;

  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify ?? "center",
    },
    styles,
  ];

  return onPress ? (
    <TouchableOpacity
      style={localStyle}
      onPress={onPress ? () => onPress() : undefined}
      onLongPress={onLongPress ? () => onLongPress() : undefined}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  );
};

export default RowComponent;
