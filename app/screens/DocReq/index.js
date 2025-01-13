import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { styles } from '../../../styles/screens/DocReqStyle.';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

// Sample data for the list
const data = [
    "Matric Result & Provisional Certificate PDF",
    "Inter Result & Provisional Certificate PDF",
    "Inter Admit Card PDF",
    "Inter Registration Card PDF",
    "Aadhar Card PDF",
    "Mother's Aadhar Card PDF",
    "Father's Aadhar Card PDF",
    "Caste, Income & Residence Certificate PDF",
    "Passport Size Color Photo with Name & D.O.B in Image",
    "Signature in Image",
    "Original CLC/T.C. & Migration PDF",
    "University Apply/Rank Card PDF",
    "Declaration Form PDF",
];
const DocReqScreen = () => {
    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={styles.number}>{index + 1}. </Text>
            <Text style={styles.text}>{item}</Text>
        </View>
    );

    return (
        <>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.redStyle}>Please Read All The Documents</Text>

                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.bottomButton}>
                    <CustomButton
                        buttonStyle={styles.buttonStyle}
                        buttonStyleText={styles.buttonStyleText}
                        children={'Next'}
                        onClick={() => router.push('/screens/DCAdmission/')

                        }
                    />
                </View>
            </View>
        </>
    );
};

export default DocReqScreen;
