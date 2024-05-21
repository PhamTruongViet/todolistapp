import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Container from "../components/Container";
import SectionComponent from "../components/SectionComponent";
import TitleComponent from "../components/TitleComponent";
import { ArrowLeft2 } from "iconsax-react-native";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";
import RowComponent from "../components/RowComponent";
import TextComponent from "../components/TextComponent";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Octicons";
import { Calendar } from "iconsax-react-native";
import SpaceComponent from "../components/SpaceComponent";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { HandleDateTime } from "../utils/HandleDateTime";

const database = getFirestore();

const TaskDetail = ({ route }) => {
  const navigation = useNavigation();
  const taskId = route.params.taskId;
  const [taskDetail, setTaskDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const taskData = await fetchTask(taskId);
      setTaskDetail(taskData);
      setIsLoading(false);
    };

    fetchData();
  }, [taskId]);

  const fetchTask = async (taskId) => {
    try {
      const tasksCollection = collection(database, "tasks");
      const taskRef = doc(tasksCollection, taskId);
      const taskDoc = await getDoc(taskRef);

      if (taskDoc.exists()) {
        const taskData = taskDoc.data();
        console.log("Document data:", taskData);
        return taskData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching task: ", error);
    }
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SectionComponent
        color={"#A4CE95"}
        styles={{
          paddingTop: 70,
          paddingBottom: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 12, marginLeft: 5 }}
            />
          </TouchableOpacity>
          <TitleComponent
            text={taskDetail.title}
            size={22}
            color={COLORS.gray}
          />
        </RowComponent>

        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.transparent,
            width: "100%",
            height: 50,
          }}
        >
          <TextComponent text="Due Date" />
          <RowComponent styles={{ flex: 1, justifyContent: "flex-start" }}>
            <Icon name={"clock"} size={20} color={COLORS.desc} />
            <SpaceComponent width={4} />
            {taskDetail && taskDetail.start && taskDetail.end && (
              <TextComponent
                flex={0}
                color={COLORS.desc}
                text={`${HandleDateTime.GetHour(
                  taskDetail.start?.toDate()
                )} - ${HandleDateTime.GetHour(taskDetail.end?.toDate())}`}
              />
            )}
            <SpaceComponent width={40} />
            <Calendar
              size={20}
              color={COLORS.desc}
              style={{ marginRight: 5 }}
            />
            {taskDetail && taskDetail.dueDate && (
              <TextComponent
                flex={0}
                color={COLORS.desc}
                text={`${HandleDateTime.GetFormattedDate(
                  taskDetail.dueDate?.toDate()
                )}`}
              />
            )}
          </RowComponent>
        </View>
      </SectionComponent>
      <View
        styles={{
          paddingBottom: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 22, color: "black", left: 20 }}>
          Description
        </Text>
        <SpaceComponent height={20} />
        <View style={styles.description}>
          <TextComponent
            text={taskDetail?.description}
            color={COLORS.black}
            size={16}
          />
        </View>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  description: {
    padding: 20,
    borderRadius: 10,
    borderColor: COLORS.grayLight,
    borderWidth: 1,
    height: "60%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: "5%",
  },
});
