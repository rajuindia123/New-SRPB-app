import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { styles } from '../../../styles/screens/DocReqStyle.';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

// Sample data for the list
const data = [
    "Matric Result &Provisional Certificate",
    "Inter Result & Provisional Cert",
    "Inter Admit Card",
    "Inter Registration Card",
    "Aadhar Card",
    "Mother`s Aadhar Card",
    "Father`s Aadhar Card",
    "Caste, Income & Residence Cert",
    "Passport Size Color Photo 02 with name & D.O.B",
    "Original CLC/T.C. & Migration",
    "Univ. Apply/Rank Card",
    "Declaration Form",
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
