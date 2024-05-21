import { View, Text, Modal, Button, Dimensions } from "react-native";
import React, { useState } from "react";
import TitleComponent from "./TitleComponent";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { COLORS } from "../constants";
import { ArrowDown2 } from "iconsax-react-native";
import { globalStyles } from "../styles/globalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerComponent = (props) => {
  const { selected, onSelect, placeholder, title, type } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());
  return (
    <>
      <View style={{ marginBottom: 16 }}>
        {title && <TitleComponent text={title} />}
        <RowComponent
          onPress={() => {
            setShowPicker(true);
          }}
          styles={[
            globalStyles.inputContainer,
            { marginTop: title ? 8 : 0, paddingVertical: 16 },
          ]}
        >
          <TextComponent
            flex={1}
            text={
              selected
                ? type === "time"
                  ? `${selected.getHours()}:${selected.getMinutes()}`
                  : `${selected.getDate()}/${
                      selected.getMonth() + 1
                    }/${selected.getFullYear()}`
                : placeholder
                ? placeholder
                : ""
            }
            color={selected ? COLORS.text : "#676767"}
          />
          <ArrowDown2 size={20} color={COLORS.text} />
        </RowComponent>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View>
          {showPicker && (
            <DateTimePicker
              mode={type ? type : "datetime"}
              value={date}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                const currentDate = selectedDate || date;
                setDate(currentDate);
                onSelect(currentDate);
              }}
              locale="vi"
            />
          )}
        </View>
      </View>
    </>
  );
};

export default DateTimePickerComponent;
