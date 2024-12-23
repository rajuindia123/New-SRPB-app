import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from '../../../styles/screens/successPage'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
const SuccessPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.imageView}>
                    <Image
                        source={require("../../../assets/images/cropped_image.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={[styles.imageView, { marginLeft: 130 }]}>
                    <Image
                        source={require("../../../assets/images/purneaLogo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.imageSucc}>
                    <Image
                        source={require("../../../assets/images/PAYMENT-SUCCESS__1_-removebg-preview.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>





            <View style={styles.buttonSection}>
                <View style={styles.infoView}>
                    <Text style={styles.infoText}>Your Payment is <Text style={{ fontSize: 20, color: 'green' }}>Success</Text> and Admission is Pending Please Bring All the Hard Copy of Uploaded Documents For Verification.</Text>
                </View>

                <CustomButton
                    buttonStyle={styles.buttonStyle}
                    buttonStyleText={styles.buttonStyleText}
                    children={'Go To Home'}
                    onClick={() => router.push("/screens/DCDagaruaHome/")}
                />
            </View>
        </View>
    )
}

export default SuccessPage