import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { styles } from '../../../styles/screens/DocReqStyle.';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

// Sample data for the list
const data = [
    "Admission Slip",
    "10th Marksheet",
    "Inter Admit Card",
    "Inter Marksheet",
    "Aadhar Card",
    "Registration Card",
    "Registration Payment slip",
    "Rank Card",
    "Student`s Signature"
];

const DocReq = () => {
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
                        onClick={() => router.push('/screens/DCCIA/')

                        }
                    />
                </View>
            </View>
        </>
    )
}

export default DocReq