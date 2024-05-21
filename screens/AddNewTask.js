import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";
import Container from "../components/Container";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import InputComponent from "../components/InputComponent";
import RowComponent from "../components/RowComponent";
import SectionComponent from "../components/SectionComponent";
import SpaceComponent from "../components/SpaceComponent";
import { fontFamilies } from "../constants";
import { auth, database } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const initValue = {
  title: "",
  description: "",
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  status: "undone",
  notificationId: "",
  uid: "",
};

const AddNewTask = ({ route }) => {
  const navigation = useNavigation();
  const [taskDetail, setTaskDetail] = useState(initValue);

  const handleChangeValue = (id, value) => {
    const item = { ...taskDetail };

    item[id] = value;

    setTaskDetail(item);
  };
  useEffect(() => {
    if (route.params?.date) {
      setTaskDetail({ ...taskDetail, dueDate: new Date(route.params.date) });
    }
  }, [route.params?.date]);

  const handleAddNewTask = async () => {
    const data = {
      ...taskDetail,
      createdAt: new Date(),
      uid: auth.currentUser.uid,
    };
    if (data.title.trim() === "") {
      data.title = new Date(data.dueDate).toISOString().split("T")[0];
    }

    const trigger = new Date(data.dueDate);
    trigger.setHours(data.start.getHours());
    trigger.setMinutes(data.start.getMinutes());
    trigger.setSeconds(data.start.getSeconds());
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Task: ${data.title}`,
        body: `${data.description}`,
        data: { data: "goes here" },
      },
      trigger,
    });
    data.notificationId = notificationId;

    try {
      await addDoc(collection(database, "tasks"), data);
      console.log("Task added!");

      setTaskDetail(initValue);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleClearTask = () => {
    setTaskDetail(initValue);
  };

  return (
    <Container>
      <SpaceComponent height={60} />
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={(val) => handleChangeValue("title", val)}
          title="Title"
          allowClear
          placeholder="Title of task"
          multible
          numberOfLine={2}
        />
        <InputComponent
          value={taskDetail.description}
          onChange={(val) => handleChangeValue("description", val)}
          title="Description"
          allowClear
          placeholder="Content"
          multible
          numberOfLine={3}
        />
        <Text style={{ left: 10, color: COLORS.gray }}>Due Date</Text>
        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={(val) => handleChangeValue("dueDate", val)}
          placeholder="Choice"
          type="date"
          title="Due date"
        />
        <RowComponent styles={{ justifyContent: "flex-start" }}>
          <Text style={{ left: 10, color: COLORS.gray }}>Start</Text>
          <SpaceComponent width={170} />
          <Text style={{ color: COLORS.gray }}>End</Text>
        </RowComponent>
        <RowComponent>
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              type="time"
              onSelect={(val) => handleChangeValue("start", val)}
              title="Start"
              styles={{ backgroundColor: COLORS.green }}
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={(val) => handleChangeValue("end", val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          <TouchableOpacity style={styles.saveBtn} onPress={handleClearTask}>
            <Text style={styles.saveBtnText}>Clear</Text>
          </TouchableOpacity>
          <SpaceComponent width={14} />
          <TouchableOpacity style={styles.saveBtn} onPress={handleAddNewTask}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  saveBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 50,
    paddingVertical: 15,
    flex: 1,
  },
  saveBtnText: {
    textAlign: "center",
    color: COLORS.text,
    fontFamily: fontFamilies.bold,
    fontSize: 20,
  },
});
