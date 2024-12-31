import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../styles/screens/adminHomePage';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { router, useLocalSearchParams } from 'expo-router';
import Loader from '../../components/Loader';
import { getDocumentsById, updateDocument, addStudentDocument } from '../../Function/AppwriteCollection';
import CategorySelectListUpdate from '../../components/CategorySelectListUpdate';
const EnrollmentStuSchema = Yup.object().shape({
  stuUAN: Yup.string().required('Please Enter Student UAN No.'),
  stuRankNo: Yup.string().required('Please Enter Student Rank No.'),
  stuName: Yup.string().required('Please Enter Student Name'),
  stuFatherName: Yup.string().required('Please Enter Student Father`s Name'),
  stuMotherName: Yup.string().required('Please Enter Student Mother`s Name'),
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

const UpdateStudent = () => {
  const { uan } = useLocalSearchParams();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [documentId, setDocumentId] = useState()
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (dateVal) => {
    const date = new Date(dateVal);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    setSelectedDate(`${day}/${month}/${year}`);
    hideDatePicker();
  };

  useEffect(() => {
    const fetchStudentById = async () => {
      setLoading(true);
      try {
        const result = await getDocumentsById("67644c3d002c8007fd51", "stuUAN", uan);
        setStudentData(result[0]);
        setSelectedDate(result[0]?.stuDOB || ''); // Set the date if present
        setDocumentId(result[0].$id)
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentById();
  }, [uan]);
  // console.log("studentData", studentData)
  return (
    <ScrollView style={{ backgroundColor: '#fff', marginBottom: 20 }} showsVerticalScrollIndicator={false}>
      {loading ? <Loader /> :
        <Formik
          enableReinitialize
          initialValues={{
            stuUAN: studentData?.stuUAN || '',
            stuRankNo: studentData?.stuRankNo || '',
            stuName: studentData?.stuName || '',
            stuFatherName: studentData?.stuFatherName || '',
            stuMotherName: studentData?.stuMotherName || '',
            stuGender: studentData?.stuGender || '',
            stuCategory: studentData?.stuCategory || '',
            stuSession: studentData?.stuSession || '',
            stuCollege: studentData?.stuCollegeName || '',
            stuPassword: studentData?.stuPassword || '',
          }}
          validationSchema={EnrollmentStuSchema}
          onSubmit={async (values) => {

            console.log('Submitted Values:', values);
            // Alert.alert('Success', 'Student information updated successfully!');

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
                stuDOB: selectedDate
              };

              const res = await updateDocument("67644c3d002c8007fd51", documentId, trimmedValues)

              if (res == "Document Updated") {
                router.back()
              }


            } catch (error) {
              console.log("Login Error:", error);
              // Show error to user here if necessary
            } finally {
              setLoading(false); // Hide loading spinner
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.containerAddStudent}>

              <CategorySelectListUpdate
                label="Select Session"
                data={SectionData}                     // Array of data
                selectedValue={values.stuSession}      // Pre-filled value (this should be a key from the data)
                onSelect={(val) => setFieldValue('stuSession', val)} // Update Formik field with the value (not the key)
                search={false}                          // Disable search
                required={true}                         // Mark as required
              />
              {touched.stuSession && errors.stuSession && (
                <Text style={{ color: 'red' }}>{errors.stuSession}</Text>
              )}

              <CategorySelectListUpdate
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
                values={values.stuUAN}
                placeholder="Enter UAN No."
                labelsStyle={styles.labelsStyle}
                inputStyle={styles.inputStyle}
                keyboardType="default"
                badgeStyles={styles.badge}
              />
              {touched.stuUAN && errors.stuUAN && (
                <Text style={{ color: 'red' }}>{errors.stuUAN}</Text>
              )}



              <CustomInput
                title="Student Rank No."
                required={true}
                onChangeText={handleChange('stuRankNo')}
                onBlur={handleBlur('stuRankNo')}
                values={values.stuRankNo}
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
                onChangeText={handleChange('stuName')}
                onBlur={handleBlur('stuName')}
                values={values.stuName}
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
                title="Fathers Name"
                required={true}
                onChangeText={handleChange('stuFatherName')}
                onBlur={handleBlur('stuFatherName')}
                values={values.stuFatherName}
                placeholder="Enter Fathers Name"
                labelsStyle={styles.labelsStyle}
                inputStyle={styles.inputStyle}
                keyboardType="default"
                badgeStyles={styles.badge}
              />
              {touched.stuFatherName && errors.stuFatherName && (
                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuFatherName}</Text>
              )}

              <CustomInput
                title="Mothers Name"
                required={true}
                onChangeText={handleChange('stuMotherName')}
                onBlur={handleBlur('stuMotherName')}
                values={values.stuMotherName}
                placeholder="Enter Mothers Name"
                labelsStyle={styles.labelsStyle}
                inputStyle={styles.inputStyle}
                keyboardType="default"
                badgeStyles={styles.badge}
              />
              {touched.stuMotherName && errors.stuMotherName && (
                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuMotherName}</Text>
              )}
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


              {/* Additional inputs for other fields */}
              <Text style={[styles.label, { marginTop: 10, marginBottom: 2 }]}>
                Select DOB <Text style={styles.badge}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dateOfBirthPikerView}
                onPress={showDatePicker}
              >
                <Text style={styles.textDateTimePiker}>
                  {selectedDate || 'Select Date Of Birth'}
                </Text>
              </TouchableOpacity>



              <CategorySelectListUpdate
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



              <CustomInput
                title="Password"
                required={true}
                onChangeText={handleChange('stuPassword')}
                onBlur={handleBlur('stuPassword')}
                values={values.stuPassword}
                placeholder="Enter Mothers Name"
                labelsStyle={styles.labelsStyle}
                inputStyle={styles.inputStyle}
                keyboardType="default"
                badgeStyles={styles.badge}
              />
              {touched.stuPassword && errors.stuPassword && (
                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuPassword}</Text>
              )}


              <CustomButton
                buttonStyle={styles.buttonStyle}
                buttonStyleText={styles.buttonStyleText}
                children="Update"
                onClick={handleSubmit}
                required={true}
              />
            </View>
          )}
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

export default UpdateStudent;
