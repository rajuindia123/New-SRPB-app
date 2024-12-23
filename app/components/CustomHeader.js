import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../styles/base";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing icons library

const CustomHeader = ({ title, onProfilePress, onNotificationPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left-Aligned User Icon */}
      
      <TouchableOpacity style={styles.iconContainer} onPress={onProfilePress}>
        <Icon name="account-circle" size={40} color="#fff" />
      </TouchableOpacity>

      {/* Centered Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right-Aligned Notification Icon */}
      <TouchableOpacity style={styles.iconContainer} onPress={onNotificationPress}>
        <Icon name="notifications" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: Colors.primary, // Custom header background color
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
