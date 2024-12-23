import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { styles } from '../../../styles/screens/studentUpdate'
const UpdateStudent = () => {
  return (
    <>
      <ScrollView style={{backgroundColor:'#fff',marginBottom:200}} showsVerticalScrollIndicator={false}>
 <View style={styles.container}>
      <Text>UpdateStudent</Text>
    </View>
    </ScrollView>
    <View style={styles.buttomContainer}>

    </View>
    </>
  
   
  )
}

export default UpdateStudent