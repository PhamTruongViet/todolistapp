import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constants";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheetSearch";
import CircularComponent from "../components/CircularComponent";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../config/firebase";
import { StatusBar } from "expo-status-bar";
import Container from "../components/Container";
import RowComponent from "../components/RowComponent";
import SpaceComponent from "../components/SpaceComponent";

const CustomCalendar = ({ navigation }) => {
  const refRBSearch = useRef();
  const [selectedDate, setSelectedDate] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const isSelected = selectedDate?.selected;
  const [taskData, setTaskData] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const date = new Date();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksQuery = query(
        collection(database, "tasks"),
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(tasksQuery);
      let dates = {};
      let doneTasks = 0;

      querySnapshot.forEach((doc) => {
        const task = doc.data();
        if (task.status === "done") {
          doneTasks++;
        }
        const date = task.dueDate.toDate();
        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        );
        const dateString = localDate.toISOString().split("T")[0];

        dates = {
          ...dates,
          [dateString]: { selected: true, selectedColor: "green" },
        };
      });

      if (querySnapshot.size === 0) {
        setTaskCompleted(0);
      } else {
        setTaskCompleted((doneTasks / querySnapshot.size) * 100);
      }
      setSelectedDate(dates);
    };

    const unsubscribe = onSnapshot(collection(database, "tasks"), () => {
      fetchTasks();
    });

    return () => unsubscribe();
  }, []);

  const onDayPress = useCallback(
    (day) => {
      console.log("selected day", day);
      if (selectedDate[day.dateString]) {
        // If the day already has tasks, navigate to the "Checklist" screen
        navigation.navigate("Checklist", { date: day.dateString });
      } else {
        // If the day doesn't have tasks, navigate to the "AddNewTask" screen
        navigation.navigate("AddNewTask", { date: day.dateString });
      }
      setTaskData(day);
    },
    [selectedDate, navigation]
  );

  return (
    <Container styles={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
        <Header
          title="CusTomCalendar"
          onPress={() => refRBSearch.current.open()}
        />
        <Calendar
          onDayPress={onDayPress}
          markedDates={selectedDate}
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: "gray",
            height: 370,
            borderRadius: 10,
          }}
          renderArrow={(direction) => (
            <Image
              source={
                direction === "left"
                  ? require("../assets/icons/left-arrow.png")
                  : require("../assets/icons/right-arrow.png")
              }
            />
          )}
          theme={{
            textSectionTitleColor: "#b6c1cd",
            // selectedDayBackgroundColor: "red",
            selectedDayTextColor: "white",
            todayTextColor: "red",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            textInactiveColor: "green",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            monthTextColor: "black",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                // ... handle the selected date ...
              }}
            />
          )}
          <Text style={styles.dateContainer}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, top: 10 }}>
          <RowComponent styles={{ justifyContent: "flex-start" }}>
            <SpaceComponent width={30} />
            <Text style={{ fontSize: 15 }}>Task Completed</Text>
            <SpaceComponent width={20} />
            <CircularComponent value={taskCompleted} />
          </RowComponent>
        </View>
      </View>
      <BottomSheet taskData={taskData} bottomSheetRef={refRBSearch} />
    </Container>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    padding: 10,
    fontSize: 20,
    color: COLORS.black,
    backgroundColor: COLORS.lightGray,
  },
});
export default CustomCalendar;
