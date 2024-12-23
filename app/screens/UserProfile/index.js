import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../../../styles/screens/profilePage';
import CustomInput from '../../components/CustomInput';

export default function StudentProfilePage() {
    // State to manage the profile image
    const [profileImage, setProfileImage] = useState(null);
    const [text, onChangeText] = React.useState('Rohan Kumar');
    const [uan, onChangeUAN] = React.useState('225732737634876');
    const [reg, onChangeReg] = React.useState('342353451235');

    // Dummy student information
    const studentData = {
        name: 'John Doe',
        userType: 'Student',
        applicationStatus: 'Approved', // Can be 'Pending', 'Approved', 'Rejected'
    };

    // Function to pick an image
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access gallery is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setProfileImage(pickerResult.assets[0].uri);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#0A3981" }}>


            <View style={styles.container}>
                {/* Profile Image */}
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: "https://dummyimage.com/300" }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.uploadText}>Upload Profile Image</Text>
                </TouchableOpacity>

                {/* Student Information */}
                <View style={styles.infoContainer}>

                    <View>
                        <Text style={styles.labelsStyle}>{"Name:"}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={onChangeText}
                            value={text}
                            editable={false}
                        />



                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.labelsStyle}>{"UAN No:"}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={onChangeUAN}
                            value={uan}
                            editable={false}
                        />



                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.labelsStyle}>{"Registration No:"}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={onChangeReg}
                            value={reg}
                            editable={false}
                        />



                    </View>

                    {/*         
        <Text style={styles.label}>Name: <Text style={styles.value}>{studentData.name}</Text></Text>
       

        <Text style={styles.label}>UAN No: {studentData.userType}</Text>
       

        <Text style={styles.label}>Application Status:</Text> */}
                    <View style={styles.infoView}>
                        <Text style={styles.infoViewHeader}>Application Status:</Text>
                        <Text
                            style={[
                                styles.infoViewSubHeader,
                                studentData.applicationStatus === 'Pending' && { color: 'orange' },
                                studentData.applicationStatus === 'Approved' && { color: 'green' },
                                studentData.applicationStatus === 'Rejected' && { color: 'red' },
                            ]}
                        >
                            {studentData.applicationStatus}
                        </Text>


                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.TimeTable}> Download Time Table:-</Text>
                        <TouchableOpacity>
                            <Text style={styles.Click}>Click Hare</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.TimeTable}> Download Mark Sheet:-</Text>
                        <TouchableOpacity>
                            <Text style={styles.Click}>Click Hare</Text>
                        </TouchableOpacity>

                    </View>




                </View>
            </View>
        </ScrollView>
    );
}
