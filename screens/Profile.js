import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import Container from "../components/Container";
import SectionComponent from "../components/SectionComponent";
import auth from "firebase/auth";
import { getAuth } from "firebase/auth";
const Profile = () => {
  const onPress = () => {
    const auth = getAuth();
    auth.signOut().then(() => console.log("User signed out!"));
  };

  return (
    <Container
      color={COLORS.bgColor}
      style={{ justifyContent: "center", alignItem: "center" }}
    >
      <SectionComponent
        styles={{
          marginTop: 200,
        }}
      >
        <TouchableOpacity style={style.signoutBtn} onPress={onPress}>
          <Text style={style.signoutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </SectionComponent>
    </Container>
  );
};

export default Profile;

const style = StyleSheet.create({
  signoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginHorizontal: 50,
  },
  signoutBtnText: {
    color: COLORS.white,
    padding: 10,
    fontSize: 20,
  },
});
