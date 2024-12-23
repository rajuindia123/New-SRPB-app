import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ children, onClick,buttonStyle,buttonStyleText ,loading}) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onClick}>
     <Text style={buttonStyleText}>{children}</Text>
   </TouchableOpacity>
  

  );
};

export default CustomButton;