import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";
import { onAuthStateChanged } from "firebase/auth";
import { AuthenticatedUserContext } from "../contexts/AuthContext";
import { auth } from "../config/firebase";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Checklist from "../screens/Checklist";
import TaskDetail from "../screens/TaskDetail";
import CustomCalendar from "../screens/Calendar";
import AddNewTask from "../screens/AddNewTask";

const Stack = createNativeStackNavigator();

function DrawerStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={DrawerNavigation} />
      <Stack.Screen name="Checklist" component={Checklist} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="Calendar" component={CustomCalendar} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const AppNavigation = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
