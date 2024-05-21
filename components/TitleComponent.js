import React from "react";
import TextComponent from "./TextComponent";
import { COLORS, fontFamilies } from "../constants";

const TitleComponent = (props) => {
  const { text, font, size, color, flex } = props;

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color ?? COLORS.text}
      text={text}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponent;
