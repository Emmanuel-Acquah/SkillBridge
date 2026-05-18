import { View, Text } from "react-native";
import React from "react";
import Navbar from "../components/NavBar";
import { useRouter, type RelativePathString } from "expo-router";

const ClientDashboard = () => {
    const router =useRouter()
  return (
    <View>
      <Navbar
        avatarUrl="https://example.com/avatar.jpg"
        notificationCount={3}
        messageCount={5}
      />
    </View>
  );
};

export default ClientDashboard;
