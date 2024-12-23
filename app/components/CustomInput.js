import { View, Text, TextInput } from 'react-native'
import React from 'react'
// import { styles } from '../../styles/component/customInput'
const CustomInput = ({
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
  return (
    <View>
      {title && (
        required?(
          <Text style={labelsStyle}>{title}<Text style={badgeStyles}>*</Text></Text>
        ): <Text style={labelsStyle}>{title}</Text>
       
      )}

      <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      
        style={inputStyle}
        onChangeText={onChangeText}
        value={values}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onBlur={onBlur}
        editable={editable}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor="#C4C4C4"
        inputMode={inputMode}
      />
    </View>
  )
}

export default CustomInput