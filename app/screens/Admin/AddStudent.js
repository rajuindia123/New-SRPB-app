import { View, Text, ScrollView, TouchableOpacity, TextInput,ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../styles/screens/adminHomePage';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addDocument,addStudentDocument } from '../../Function/AppwriteCollection';
import { router } from 'expo-router';
import Loader from '../../components/Loader';
const EnrollmentStuSchema = Yup.object().shape({
    stuUAN: Yup.string().required('Please Enter Student UAN No.'),
    stuRankNo: Yup.string().required('Please Enter Student Rank No.'),
    stuName: Yup.string().required('Please Enter Student Name'),
    stuFatherName: Yup.string().required('Please Enter Student Father`s Name'),
    stuMotherName: Yup.string().required('Please Enter Student Mother`s Name'),
    stuVAC: Yup.string().required('Please Enter Value Added Course'),
    stuSEC: Yup.string().required('Please Enter Skill Enhancement Course'),
    stuGender: Yup.string().required('Please Select Gender'),
    stuCategory: Yup.string().required('Please Select Category'),
    stuPassword: Yup.string().required('Please Enter Password'),
    stuSession: Yup.string().required("Please select a session."),
    stuCollege: Yup.string().required("Please select a college."),
});

const CategoryData = [
    { key: '1', value: 'GEN' },
    { key: '2', value: 'OBC' },
    { key: '3', value: 'EBC' },
    { key: '4', value: 'SC' },
    { key: '5', value: 'ST' },
];

const SectionData = [
    { key: '1', value: '2023-2026' },
    { key: '2', value: '2020-2023' },
    { key: '3', value: '2017-2020' },
    { key: '4', value: '2014-2017' },
    { key: '5', value: '2011-2014' },
    { key: '6', value: '2008-2011' },
];

const CollegeData = [
    { key: '1', value: 'DC Dagarua' },
    { key: '2', value: 'DC Mothopare' },
    { key: '3', value: 'SRP School' },
    { key: '4', value: 'SRP Teachers Training College' },
];

const AddStudent = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (dateVal) => {
        const date = new Date(dateVal);

        // Get the day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        // Format as dd/mm/yyyy
        const formattedDate = `${day}/${month}/${year}`

        setSelectedDate(formattedDate)
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FBFBFB' }}>
            {loading?<Loader />:
            <Formik
                initialValues={{
                    stuUAN: '',
                    stuRankNo: '',
                    stuName: '',
                    stuFatherName: '',
                    stuMotherName: '',
                    stuGender: '',
                    stuCategory: '',
                    stuSession: '',
                    stuCollege: '',
                    stuPassword: '',
                    stuVAC: '',
                    stuSEC: '',
                }}
                validationSchema={EnrollmentStuSchema}
                onSubmit={async (values) => {
if(selectedDate.length==0){
Alert.alert("Error","Please Enter Date Of Birth")
}else{
                    setLoading(true); // Show loading spinner
                    try {
                        const trimmedValues = {
                            stuUAN: values.stuUAN.trim(),
                            stuRankNo: values.stuRankNo.trim(),
                            stuName: values.stuName.trim(),
                            stuFatherName: values.stuFatherName.trim(),
                            stuMotherName: values.stuMotherName.trim(),
                            stuGender: values.stuGender.trim(),
                            stuCategory: values.stuCategory.trim(),
                            stuSession: values.stuSession.trim(),
                            stuCollegeName: values.stuCollege.trim(),
                            stuPassword: values.stuPassword.trim(),
                            stuDOB:selectedDate,
                            stuVAC:values.stuVAC.trim(),
                            stuSEC:values.stuSEC.trim(),
                        };
                   
                const res=await addStudentDocument("67644c3d002c8007fd51",trimmedValues)
                     
                       if(res=="Document Added"){
                        router.back()
                       }
                       
                       
                    } catch (error) {
                        console.log("Login Error:", error);
                        // Show error to user here if necessary
                    } finally {
                        setLoading(false); // Hide loading spinner
                    }
                }
                    
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                    // Function to generate a password
                    const generatePassword = (name) => {
                        if (name) {
                            // Remove spaces from the name and trim it to ensure no leading/trailing spaces
                            const sanitized = name.trim().replace(/\s+/g, '');

                            // Limit the sanitized name to the first 4 characters (if longer)
                            const limitedName = sanitized.substring(0, 4);

                            // Generate a 4-digit random number
                            const randomDigits = Math.floor(1000 + Math.random() * 9000);

                            // Combine the sanitized name (up to 4 characters) and random digits
                            const stuPassword = `${limitedName}${randomDigits}`.slice(0, 8); // Ensure the password is 8 characters long

                            // Update the Formik field value with the generated password
                            setFieldValue('stuPassword', stuPassword);
                        }
                    };
                    return (
                        <View style={styles.containerAddStudent}>


                            <CategorySelectList
                                label="Select Session"
                                data={SectionData}
                                selectedValue={values.stuSession}
                                onSelect={(val) => setFieldValue('stuSession', val)}
                                search={false}
                                required={true}
                            />



                            {touched.stuSession && errors.stuSession && (
                                <Text style={{ color: 'red' }}>{errors.stuSession}</Text>
                            )}

                            <CategorySelectList
                                label="Select College Name"
                                data={CollegeData}
                                selectedValue={values.stuCollege}
                                onSelect={(val) => setFieldValue('stuCollege', val)}
                                search={false}
                                required={true}
                            />
                            {touched.stuCollege && errors.stuCollege && (
                                <Text style={{ color: 'red' }}>{errors.stuCollege}</Text>
                            )}

                            <CustomInput
                                title="Student UAN No."
                                required={true}
                                onChangeText={handleChange('stuUAN')}
                                onBlur={handleBlur('stuUAN')}
                                value={values.stuUAN}
                                placeholder="Enter UAN No."
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuUAN && errors.stuUAN && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuUAN}</Text>
                            )}

                            <CustomInput
                                title="Student Rank No."
                                required={true}
                                onChangeText={handleChange('stuRankNo')}
                                onBlur={handleBlur('stuRankNo')}
                                value={values.stuRankNo}
                                placeholder="Enter Rank No."
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuRankNo && errors.stuRankNo && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuRankNo}</Text>
                            )}

                            <CustomInput
                                title="Student Name"
                                required={true}
                                onChangeText={(text) => {
                                    setFieldValue('stuName', text); // Update the student name
                                    console.log("Student Name Entered: ", text); // Debugging log
                                    generatePassword(text); // Generate password dynamically
                                }}
                                onBlur={handleBlur('stuName')}
                                value={values.stuName}
                                placeholder="Enter Student Name"
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuName && errors.stuName && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuName}</Text>
                            )}

                            <CustomInput
                                title="Father`s Name"
                                required={true}
                                onChangeText={handleChange('stuFatherName')}
                                onBlur={handleBlur('stuFatherName')}
                                value={values.stuFatherName}
                                placeholder="Enter Father`s Name"
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuFatherName && errors.stuFatherName && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuFatherName}</Text>
                            )}

                            <CustomInput
                                title="Mother`s Name"
                                required={true}
                                onChangeText={handleChange('stuMotherName')}
                                onBlur={handleBlur('stuMotherName')}
                                value={values.stuMotherName}
                                placeholder="Enter Mother`s Name"
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuMotherName && errors.stuMotherName && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuMotherName}</Text>
                            )}
                            {/* Repeat CustomInput for other fields with proper keys */}

                            <Text style={styles.label}>
                                Select Gender.<Text style={styles.badge}>*</Text>

                            </Text>
                            <RadioButton.Group
                                onValueChange={(val) => setFieldValue('stuGender', val)}
                                value={values.stuGender}
                            >
                                <View style={styles.groupData}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="Male" color="#690405" />
                                        <Text style={styles.labelRedio}>Male</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="Female" color="#690405" />
                                        <Text style={styles.labelRedio}>Female</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="Others" color="#690405" />
                                        <Text style={styles.labelRedio}>Others</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                            {touched.stuGender && errors.stuGender && (
                                <Text style={{ color: 'red' }}>{errors.stuGender}</Text>
                            )}

                            <Text style={[styles.label, { marginTop: 10, marginBottom: 2 }]}>Select DOB <Text style={styles.badge}>*</Text></Text>
                            <TouchableOpacity
                                style={styles.dateOfBirthPikerView}
                                onPress={showDatePicker}
                            >
                                <Text style={styles.textDateTimePiker}>
                                    {selectedDate || 'Select Date Of Birth'}
                                </Text>
                            </TouchableOpacity>

                            <CategorySelectList
                                label="Select Category"
                                data={CategoryData}
                                selectedValue={values.stuCategory}
                                onSelect={(val) => setFieldValue('stuCategory', val)}
                                search={false}
                                required={true}
                            />
                            {touched.stuCategory && errors.stuCategory && (
                                <Text style={{ color: 'red' }}>{errors.stuCategory}</Text>
                            )}
                            {/* Automatically Generated Password */}
                            <Text style={[styles.label, { marginBottom: 4 }]}>
                                Student Password.<Text style={styles.badge}>*</Text>

                            </Text>
                            <TextInput
                                onChangeText={handleChange('stuPassword')}
                                onBlur={handleBlur('stuPassword')}
                                value={values.stuPassword}// Ensure Formik's state is bound here
                                placeholder="Generated Password"
                                style={styles.inputStyle}
                                editable={false} // Control editability
                                keyboardType="default"

                            />


                            {touched.stuPassword && errors.stuPassword && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuPassword}</Text>
                            )}

<CustomInput
                                title="Skill Enhancement Course (stuSEC)"
                                required={true}
                                onChangeText={handleChange('stuSEC')}
                                onBlur={handleBlur('stuSEC')}
                                value={values.stuSEC}
                                placeholder="Enter Skill Enhancement Course"
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuSEC && errors.stuSEC && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuSEC}</Text>
                            )}

<CustomInput
                                title="Value Added Course (stuVAC)"
                                required={true}
                                onChangeText={handleChange('stuVAC')}
                                onBlur={handleBlur('stuVAC')}
                                value={values.stuSEC}
                                placeholder="Enter Value Added Course"
                                labelsStyle={styles.labelsStyle}
                                inputStyle={styles.inputStyle}
                                keyboardType="default"
                                badgeStyles={styles.badge}
                            />
                            {touched.stuVAC && errors.stuVAC && (
                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuVAC}</Text>
                            )}









<View >
                                    {loading ? (
                                        <ActivityIndicator
                                            size="large"
                                            color="#000"
                                            style={{ alignSelf: "center" }}
                                        />

                                    ) : (
                                        <CustomButton
                                        buttonStyle={styles.buttonStyle}
                                        buttonStyleText={styles.buttonStyleText}
                                        children="Submit"
                                        onClick={handleSubmit}
                                        required={true}
                                    />
                                    )}
                                </View>
                           
                        </View>
                    )

                }
                }
            </Formik>
            }
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </ScrollView>
    );
};

export default AddStudent;
