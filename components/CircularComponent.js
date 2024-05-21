import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { COLORS } from "../constants";
import { fontFamilies } from "../constants";

const CicularComponent = (props) => {
  const { color, value, maxValue, radius } = props;
  return (
    <CircularProgress
      value={value}
      // title={`${value}`}
      valueSuffix="%"
      radius={radius ?? 46}
      showProgressValue={true}
      activeStrokeColor={color ?? COLORS.green}
      inActiveStrokeColor={"#3C444A"}
      titleColor={COLORS.text}
      activeStrokeWidth={14}
      inActiveStrokeWidth={14}
      titleFontSize={10}
      titleStyle={{
        fontFamily: fontFamilies.medium,
      }}
    />
  );
};

export default CicularComponent;
