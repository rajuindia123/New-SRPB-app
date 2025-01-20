import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert, BackHandler ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import AutoImageSlider from '../../components/AutoImageSlider';
import { styles } from '../../../styles/screens/DCDagarua';
import NoticeBoardScreen from '../../components/NoticeBoardScreen';
import { router } from 'expo-router';
import CustomHeader from '../../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

const images = [
    'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10538.jpg',
    'https://img.freepik.com/free-vector/college-students-concept-illustration_114360-10205.jpg',
    'https://img.freepik.com/free-vector/students-concept-illustration_114360-8327.jpg',
    'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10535.jpg',
    'https://img.freepik.com/free-vector/flat-design-children-back-school_52683-44264.jpg',
];

const DEDHome = () => {

  
    const handleProfilePress = () => {
        Alert.alert("Notification Pressed!");
    };
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userLoggedIn");
        router.replace("/"); // Navigate back to login screen
    };


   
    return (
        <SafeAreaView >
            <CustomHeader
                title={"DC Dagarua College"}
                onProfilePress={() => router.push('/screens/UserProfile/')}
                onNotificationPress={handleProfilePress}
            />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[styles.imageSlider]}>
                    <AutoImageSlider images={images} />
                </View>
                <View style={styles.mainContent}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                    









                    <TouchableOpacity style={[styles.admissionStyles, { backgroundColor: "#62825D" }]} onPress={() => router.push('/screens/DocReq/')}>
                        <Text style={styles.textAdmission}>Admission Form</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.admissionStyles, { backgroundColor: "#081122" }]} disabled={false} onPress={() => router.push('/screens/DCRegistration/DocReq')}>
                        <Text style={styles.textAdmission}>Registration Form</Text>
                    </TouchableOpacity>

                    <Text style={styles.infoText}>This Registration Form Active  Between </Text>
                    <Text style={[styles.infoText, { textAlign: 'center', marginTop: 0 }]}>12-01-2025 To 24-01-2025 </Text>

                    <TouchableOpacity style={[styles.admissionStyles, { backgroundColor: "#244991" }]} disabled={false} onPress={() => router.push('/screens/DCCIA/')}>
                        <Text style={styles.textAdmission}>CIA Form</Text>
                    </TouchableOpacity>

                    <Text style={styles.infoText}>This CIA Form Active  Between </Text>
                    <Text style={[styles.infoText, { textAlign: 'center', marginTop: 0 }]}>12-01-2025 To 24-01-2025 </Text>

                    <TouchableOpacity style={[styles.admissionStyles, { backgroundColor: "#4B4376" }]} disabled={false} onPress={() => router.push('/screens/FinalExamForm/')}  >
                        <Text style={styles.textAdmission}>Final Exam Form</Text>
                    </TouchableOpacity>

                    <Text style={styles.infoText}>This Final Exam Form Active  Between </Text>
                    <Text style={[styles.infoText, { textAlign: 'center', marginTop: 0 }]}>12-01-2025 To 24-01-2025 </Text>
                    {/* <NoticeBoardScreen /> */}

                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

export default DEDHome