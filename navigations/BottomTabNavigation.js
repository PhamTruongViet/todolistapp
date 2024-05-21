import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform, TouchableOpacity, Keyboard } from "react-native";
import { CustomCalendar, Checklist, AddNewTask, Profile } from "../screens";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";
import CustomTabBarButton from "../components/CustomTabBarButton";
import CustomTabBar from "../components/CustomTabBar";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShown(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar
          key={keyboardShown ? "shown" : "hidden"}
          {...props}
          keyboardShown={keyboardShown}
        />
      )}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: COLORS.transparent,
          borderTopWidth: 0,
          bottom: keyboardShown ? -150 : 15,
          right: 10,
          left: 10,
          height: 92,
          elevation: 0,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          size = 25;
          if (route.name === "CustomCalendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Plus") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            size = focused ? 40 : 30;
          } else if (route.name === "Checklist") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="CustomCalendar"
        component={CustomCalendar}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="CustomCalendar" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={AddNewTask}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Checklist"
        component={Checklist}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="Profile" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
    elevation: 0,
  },
});
