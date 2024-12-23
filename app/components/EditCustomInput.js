import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // Importing an icon set (MaterialIcons)

// CustomInput Component
const EditCustomInput = ({
  title,
  onChangeText,
  secureTextEntry,
  values,
  onChange,
  keyboardType,
  onBlur,
  editable,
  maxLength,
  placeholder,
  inputStyle,
  labelsStyle,
  inputMode,
  multiline,
  numberOfLines,
  required,
  badgeStyles
}) => {
  // Local state to handle editing
  const [isEditable, setIsEditable] = useState(editable);

  // Function to toggle editable state when icon is pressed
  const toggleEditable = () => {
    setIsEditable((prevState) => !prevState);
  };

  return (
    <View>
      {title && (
        required ? (
          <Text style={labelsStyle}>
            {title}
            <Text style={badgeStyles}>*</Text>
          </Text>
        ) : (
          <Text style={labelsStyle}>{title}</Text>
        )
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={inputStyle}
          onChangeText={onChangeText}
          value={values}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onBlur={onBlur}
          editable={isEditable}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor="#C4C4C4"
          inputMode={inputMode}
        />

        {/* Edit icon to toggle editable state */}
        <TouchableOpacity onPress={toggleEditable} style={{ marginLeft: 10 }}>
          <MaterialIcons name={isEditable ? 'edit' : 'lock'} size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditCustomInput;
