import { View, Text, Image } from "react-native";
import React from "react";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { COLORS, images } from "../constants";
import { Ionicons, AntDesign, Feather } from "react-native-vector-icons";
import BottomTabNavigation from "./BottomTabNavigation";
import { Notifications, PaymentMethod, Profile } from "../screens";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.lightGreen,
              }}
            ></View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 250,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        headerTintColor: COLORS.black,
        drawerLabelStyle: {
          color: COLORS.black,
          fontSize: 14,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Calendar"
        options={{
          drawerLabel: "Calendar",
          title: "Calendar",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={BottomTabNavigation}
      />
      <Drawer.Screen
        name="Payment Methods"
        options={{
          drawerLabel: "Payment Methods",
          title: "Payment Methods",
          headerShadowVisible: false,
          drawerIcon: () => (
            <AntDesign name="creditcard" size={24} color={COLORS.black} />
          ),
        }}
        component={PaymentMethod}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          drawerLabel: "Notifications",
          title: "Notifications",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={Notifications}
      />
      <Drawer.Screen
        name="Help"
        options={{
          drawerLabel: "Help",
          title: "Help",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Feather name="help-circle" size={24} color={COLORS.black} />
          ),
        }}
        component={Profile}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
