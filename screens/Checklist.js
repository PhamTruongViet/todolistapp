import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  Timestamp,
  query,
} from "firebase/firestore";
import Container from "../components/Container";
import { auth, database } from "../config/firebase";
import RowComponent from "../components/RowComponent";
import SpaceComponent from "../components/SpaceComponent";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HandleDateTime } from "../utils/HandleDateTime";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "iconsax-react-native";
import ProgressBarComponent from "../components/ProgressBarComponent";
import * as Notifications from "expo-notifications";

const Checklist = ({ route }) => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [isNotiVisible, setNotiVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dateStr, setDateStr] = useState(
    route.params?.date ? new Date(route.params.date) : new Date()
  );

  const handleChangeValue = (value) => {
    setDateStr(new Date(value));
  };

  useEffect(() => {
    if (route.params?.date) {
      setDateStr(new Date(route.params.date));
    } else {
      setDateStr(new Date());
    }
  }, [route.params?.date]);

  useFocusEffect(
    React.useCallback(() => {
      const tasksCollection = collection(database, "tasks");
      let doneTasks = 0;
      const date = new Date(dateStr);

      const startOfDay = Timestamp.fromDate(
        new Date(date.setHours(0, 0, 0, 0))
      );
      const endOfDay = Timestamp.fromDate(
        new Date(date.setHours(23, 59, 59, 999))
      );

      const unsubscribe = onSnapshot(
        query(
          tasksCollection,
          where("dueDate", ">=", startOfDay),
          where("dueDate", "<=", endOfDay),
          where("uid", "==", auth.currentUser.uid)
        ),
        (snapshot) => {
          doneTasks = 0;
          const tasks = snapshot.docs.map((doc) => {
            const task = {
              id: doc.id,
              ...doc.data(),
            };
            if (task.status === "done") {
              doneTasks++;
            }
            return task;
          });

          setTasks(tasks);
          if (snapshot.size === 0) {
            setNotiVisible(true);
          } else setNotiVisible(false);
          setTaskCompleted((doneTasks / snapshot.size) * 100);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }, [dateStr])
  );

  const updateStatus = async (id, status) => {
    const taskRef = doc(database, "tasks", id);
    const newStatus = status === "done" ? "undone" : "done";
    await updateDoc(taskRef, { status: newStatus });
  };

  const deleteTask = async (task) => {
    const taskRef = doc(database, "tasks", task.id);
    await Notifications.cancelScheduledNotificationAsync(task.notificationId);
    await deleteDoc(taskRef);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container iscroll>
      <StatusBar barStyle="light-content" />
      {isBoxVisible && (
        <View style={styles.deleteTaskContainer}>
          <View style={styles.deleteTaskBox}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Delete this task?
            </Text>
            <SpaceComponent height={20} />
            <RowComponent>
              <TouchableOpacity onPress={() => setBoxVisible(false)}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Close</Text>
              </TouchableOpacity>
              <SpaceComponent width={30} />
              <TouchableOpacity
                onPress={() => {
                  deleteTask(selectedTask);
                  setBoxVisible(false);
                }}
                style={{
                  backgroundColor: "red",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Delete</Text>
              </TouchableOpacity>
            </RowComponent>
          </View>
        </View>
      )}
      <View style={styles.datepicker}>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <RowComponent>
            <Calendar size={25} color={"black"} style={{ marginRight: 5 }} />
            {showPicker && (
              <DateTimePicker
                value={dateStr}
                mode={"date"}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleChangeValue(selectedDate);
                  }
                  setShowPicker(false);
                }}
              />
            )}
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "sans-serif-condensed",
              }}
            >{`${HandleDateTime.GetFormattedDate(dateStr)}`}</Text>
          </RowComponent>
        </TouchableOpacity>
      </View>
      <View>
        <ProgressBarComponent percent={taskCompleted} />
      </View>
      {isNotiVisible && (
        <TouchableOpacity
          style={styles.notiContainer}
          onPress={() =>
            navigation.navigate("AddNewTask", {
              date: new Date(dateStr).toISOString(),
            })
          }
        >
          <View style={styles.notiBox}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {`No tasks for ${HandleDateTime.GetFormattedDate(
                dateStr
              )}, set a new task!`}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.scrollList}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RowComponent
              justify="flex-start"
              styles={styles.item}
              onPress={() => {
                navigation.navigate("TaskDetail", { taskId: item.id });
              }}
              onLongPress={() => {
                setSelectedTask(item);
                setBoxVisible(true);
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  updateStatus(item.id, item.status);
                }}
              >
                <Icon
                  name={
                    item.status === "done" ? "checkbox" : "checkbox-outline"
                  }
                  size={30}
                  color={item.status === "done" ? "green" : "black"}
                />
              </TouchableOpacity>
              <SpaceComponent width={30} />
              <Text
                style={{
                  fontSize: 16,
                  textDecorationLine:
                    item.status === "done" ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
            </RowComponent>
          )}
        />
      </View>
    </Container>
  );
};

export default Checklist;

const styles = StyleSheet.create({
  scrollList: {
    marginTop: 30,
    padding: 20,
    height: "70%",
  },
  item: {
    padding: 10,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
  },
  itemText: {
    fontSize: 16,
  },
  deleteTaskContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  deleteTaskBox: {
    width: 240,
    height: 120,
    marginTop: -200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  datepicker: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  notiContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notiBox: {
    width: 400,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
