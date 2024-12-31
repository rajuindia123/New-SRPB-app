import { View, Text, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../../../styles/screens/studentDetails';
import { router, useLocalSearchParams } from 'expo-router';
import { Divider } from 'react-native-paper';
import { getDocumentsById, deleteDocument } from '../../Function/AppwriteCollection';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';

const StudentDetails = () => {
    const isFocused = useIsFocused();
    const { uan } = useLocalSearchParams();
    // console.log(uan)
    const [isModalVisible, setModalVisible] = useState(false);
    const [studentData, setStudentsData] = useState([])
    const [loading, setLoading] = useState(false);
    const [documentId, setDocumentId] = useState()

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    const tableHeaders = [
        "Create Date",
        "UAN",
        "Rank No",
        "Name",
        "Mother`s Name",
        "Father`s Name",
        "Gender",
        "DOB",
        "Category",
        "Session",
        "Password",
        "College Name"
    ];


    useEffect(() => {
        const fatchAllStudentById = async () => {
            setLoading(true);
            try {
                const getAllStudent = await getDocumentsById("67644c3d002c8007fd51", "stuUAN", uan);

                //   console.log("getAllStudent",getAllStudent)
                const tableData = getAllStudent.length > 0 ? getAllStudent.map(student => [
                    student.$createdAt.slice(0, 10) || "",
                    student.stuUAN || "",
                    student.stuRankNo || "",
                    student.stuName || "",
                    student.stuMotherName || "",
                    student.stuFatherName || "",
                    student.stuGender || "",
                    student.stuDOB || "",
                    student.stuCategory || "",
                    student.stuSession || "",
                    student.stuPassword || "",
                    student.stuCollegeName || "",
                ]) : [];
                const flattenedArray = tableData[0];
                setDocumentId(getAllStudent[0].$id)
                setStudentsData(flattenedArray);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        }
        fatchAllStudentById()

    }, [isFocused])


    const handleYes = async () => {
        setLoading(true);
        try {
            const res = await deleteDocument("67644c3d002c8007fd51", documentId)
            if (res == "Document Deleted") {
                hideModal();
                router.back()
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <Loader /> :
            <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>

                <View style={styles.container}>
                    <View style={styles.topButtonSection}>
                        <TouchableOpacity style={styles.firstButton}


                            onPress={() =>
                                router.push({
                                    pathname: '/screens/Admin/UpdateStudent',
                                    params: { uan: uan }, // Pass JSON data as a string
                                })
                            }

                        >
                            <Text style={styles.textStyles}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topdeleteButon} onPress={showModal}>
                            <Text style={styles.textStyles}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 20 }} />
                    <View style={styles.mainContainer}>
                        {tableHeaders.map((data, i) => (
                            <View key={i}>
                                <Text style={styles.lebal}>{data}</Text>
                                <View style={styles.boxStyles}>
                                    <Text style={styles.textdataStyles}>{studentData[i]}</Text>
                                </View>

                            </View>

                        ))}

                    </View>


                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={hideModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to delete the Student Infomation?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonYes} onPress={handleYes}>
                                    <Text style={styles.buttonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={hideModal}>
                                    <Text style={styles.buttonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>

    );
};

export default StudentDetails;
