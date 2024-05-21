import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../config/firebase";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";

const BottomSheetSearch = ({ bottomSheetRef, children }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const tasksCollection = collection(database, "tasks");

    const unsubscribe = onSnapshot(
      query(tasksCollection, where("uid", "==", auth.currentUser.uid)),
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => {
          const task = {
            id: doc.id,
            ...doc.data(),
          };
          return task;
        });

        setTasks(tasks);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, tasks]);

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={500}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        draggableIcon: {
          backgroundColor: COLORS.gray,
          width: 100,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FAIcon name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </View>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listButton}
              onPress={() => {
                bottomSheetRef.current.close();
                navigation.navigate("TaskDetail", { taskId: item.id });
              }}
            >
              <Text style={styles.listLabel}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </RBSheet>
  );
};

export default BottomSheetSearch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  searchIcon: {
    color: "#000",
    fontSize: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
});
