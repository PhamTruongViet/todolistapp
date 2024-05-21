import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../constants";
import { globalStyles } from "../styles/globalStyles";
import RowComponent from "./RowComponent";
import TitleComponent from "./TitleComponent";
import { Eye, EyeSlash } from "iconsax-react-native";

const InputComponent = ({
  value = "",
  onChange = () => {},
  placeholder = "",
  title,
  prefix,
  affix,
  allowClear = false,
  multible = false,
  numberOfLine = 1,
  type = "default",
  isPassword = false,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multible && numberOfLine ? 32 * numberOfLine : 32,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: "flex-start",
          },
        ]}
      >
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}
        >
          <TextInput
            style={[
              globalStyles.text,
              { margin: 0, padding: 0, paddingVertical: 6, flex: 1 },
            ]}
            placeholder={placeholder}
            placeholderTextColor={"white"}
            value={value}
            onChangeText={onChange}
            multiline={multible}
            numberOfLines={numberOfLine}
            keyboardType={type}
            secureTextEntry={isPassword ? !showPass : false}
            autoCapitalize="none"
          />
        </View>

        {affix && affix}

        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange("")}>
            <AntDesign name="close" size={20} color={COLORS.desc} />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeSlash size={20} color={COLORS.desc} />
            ) : (
              <Eye size={20} color={COLORS.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
