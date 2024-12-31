import { View, Text, TouchableOpacity, ScrollView,BackHandler } from 'react-native'
import React ,{useEffect} from 'react'
import { styles } from '../../../styles/screens/adminHomePage'
import { MaterialIcons, MaterialCommunityIcons, Octicons, FontAwesome5, Foundation, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

const AdminHomePage = () => {
    // Logout function
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userLoggedIn"); // Clear session data
        router.replace("/"); // Redirect to login screen
    };

    
    return (
        <>
            <View style={styles.headerContainer}>
                {/* Left-Aligned User Icon */}


                {/* Centered Title */}
                <Text style={styles.title}>{"Admin Management"}</Text>

                {/* Right-Aligned Notification Icon */}
                <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
                    <Entypo name="log-out" size={24} color="#fff" />
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#E1D5C9" }}>
                <View style={styles.container}>

                    <Text style={styles.quickAccess}>Quick Access</Text>
                    <View style={styles.cardStyle}>
                        <TouchableOpacity style={styles.cardStyleFull} onPress={() => router.push('/screens/Admin/StudentView')}>
                            <Entypo name="add-user" size={30} color="#fff" />
                            <Text style={styles.headerText}>Enrollment Add/View Students</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.cardStyle1} onPress={()=>router.push('/screens/Admin/StudentView')}>
                    <Entypo name="add-user" size={30} color="#fff" />
                    <Text style={styles.headerText}>Enrollment View Students</Text>
                </TouchableOpacity>
                */}


                    </View>

                    <View style={styles.cardStyle}>
                        <TouchableOpacity style={styles.cardStyle1} onPress={() => router.push('/screens/Admin/AdmissionList')}>
                            <Entypo name="list" size={35} color="#fff" />
                            <Text style={styles.headerText}>Admission Add/View</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cardStyle1} onPress={() => router.push('/screens/Admin/RegList')}>
                            <FontAwesome5 name="list-alt" size={35} color="#fff" />
                            <Text style={styles.headerText}>Registration Add/View</Text>
                        </TouchableOpacity>


                    </View>

                    <View style={styles.cardStyle}>
                        <TouchableOpacity style={styles.cardStyle1} onPress={() => router.push('/screens/Admin/CIAList')}>
                            <MaterialCommunityIcons name="account-details" size={35} color="#fff" />
                            <Text style={styles.headerText}>CIA Add/View</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cardStyle1} onPress={() => router.push('/screens/Admin/ExamList')}>
                            <MaterialCommunityIcons name="card-account-details" size={35} color="#fff" />
                            <Text style={styles.headerText}>Final Exam Add/View</Text>
                        </TouchableOpacity>


                    </View>

                    <View style={styles.cardStyle}>
                        <TouchableOpacity style={styles.cardStyleFull} onPress={() => console.log("Add Students")}>
                            <Text style={styles.headerText2}>Enable / Disable Button</Text>
                            <Text style={styles.headerText2}>(Registration / CIA / Final Exam)</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </>

    )
}

export default AdminHomePage