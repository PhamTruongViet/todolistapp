import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { fontFamilies } from "../constants";
import { globalStyles } from "../styles/globalStyles";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { useNavigation } from "@react-navigation/native";

const Container = (props) => {
  const { title, back, right, children, isScroll } = props;

  const navigation = useNavigation();

  return (
    <View style={[globalStyles.container, { flex: 1 }]}>
      {/* Header container */}

      <RowComponent
        styles={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={30} color={COLORS.black} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, zIndex: -1 }}>
          {title && (
            <TextComponent
              flex={0}
              font={fontFamilies.bold}
              size={16}
              text={title}
              styles={{ textAlign: "center", marginLeft: back ? -24 : 0 }}
            />
          )}
        </View>
      </RowComponent>
      {isScroll ? (
        <ScrollView style={{ flex: 1, flexGrow: 1 }}>{children}</ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
    </View>
  );
};

export default Container;
