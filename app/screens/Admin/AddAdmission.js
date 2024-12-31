import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../styles/screens/DCAdmission'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Divider, RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { addDocument, getDocumentsById } from '../../Function/AppwriteCollection';
import Loader from '../../components/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { districtData } from '../../../src/data';  // Import from the correct path
import { AdmissionCollectionId ,EnrollmentStudentsCollectionId} from '../../../src/appwriteAllid';

const validationSchema = Yup.object().shape({
    uan: Yup.string().required('UAN is required'),
    candidateName: Yup.string().required('Candidate Name is required'),
    fatherName: Yup.string().required('Father\'s Name is required'),
    motherName: Yup.string().required('Mother\'s Name is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    stream: Yup.string().required('Stream is required'),
    semester: Yup.string().required('Semester is required'),
    majorPaper: Yup.string().required('Major (Hons) Paper is required'),
    gander: Yup.string().required('Gander is required'),
    stuAadharNo: Yup.string().required('Student Aadhar No. is required'),
    fatherAadhar: Yup.string().required('Student Father Aadhar No. is required'),
    motherAadhar: Yup.string().required('Mother Father Aadhar No. is required'),
    identiMark: Yup.string().required('Identification Marks is required'),
    address: Yup.string().required('Address is required'),
    pOffice: Yup.string().required('Post Office is required'),
    psOffice: Yup.string().required('Police Office is required'),
    pinCode: Yup.string().required('Pin Code is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    stuCategory: Yup.string().required('Category is required'),
});



const data = [
    { key: '1', value: 'I', },
    { key: '2', value: 'II' },
    { key: '3', value: 'III' },
    { key: '4', value: 'IV' },
    { key: '5', value: 'V' },
    { key: '6', value: 'VI' },
    { key: '7', value: 'VII' },
    { key: '8', value: 'VIII' },
];

const BloodGroupData = [
    { key: '1', value: 'A+', },
    { key: '2', value: 'A-' },
    { key: '3', value: 'B+' },
    { key: '4', value: 'B-' },
    { key: '5', value: 'O+' },
    { key: '6', value: 'O-' },
    { key: '7', value: 'AB+' },
    { key: '8', value: 'AB-' },
];



const AddAdmission = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Select Date Of Birth");
    const [value, setValue] = React.useState('');
    const [selected, setSelected] = React.useState("");
    const [text, onChangeText] = React.useState('');
    const [search, onSearchText] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(null)
    const [section, setSection] = useState("-")
    const [districts, setDistricts] = useState([]);

    // Handle state change and update districts
    const handleStateChange = (selectedState, setFieldValue) => {
        const stateObj = districtData.states.find(state => state.state === selectedState);
        if (stateObj) {
            setDistricts(stateObj.districts); // Update districts based on selected state
            setFieldValue('district', ''); // Clear district selection
        } else {
            setDistricts([]);
        }
        setFieldValue('state', selectedState); // Set the selected state in form
    };

    const parts = section.split("-");


    const [error, setError] = useState(false)
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
        const formattedDate = `${day}/${month}/${year}`;

        setSelectedDate(formattedDate)
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    const handelSearchData = async () => {
        console.log("search", search)
        setLoading(true);
        try {
            const result = await getDocumentsById(EnrollmentStudentsCollectionId, "stuUAN", search);
            if (result.length == 0) {
                // console.log("object")
                setError("Student UAN No. Not Found  Please Check UAN No")
            } else {
                console.log(result)
                setStudentData(result[0])
                setSelectedDate(result[0]?.stuDOB || ''); // Set the date if present
                setSection(result[0].stuSession)
                onSearchText(result[0].stuUAN)
            }

        } catch (error) {
            console.error("Error fetching student:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        loading ? <Loader /> :
            <ScrollView style={{ backgroundColor: "#fff", marginBottom: 20 }}>
                <View style={styles.container}>


                    <View style={styles.formContent}>
                        <Text style={styles.slNo}>Sl.No:- {'690'}</Text>
                        <View style={[styles.inputView, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                            <View style={{ width: '80%' }}>
                                <CustomInput
                                    title="Search By Student UAN No."
                                    required={true}
                                    onChangeText={(text) => { onSearchText(text), setError("") }}
                                    // onChangeText={onSearchText}
                                    value={search}

                                    placeholder="Enter Student UAN No."
                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                    keyboardType={'default'}
                                    badgeStyles={styles.badge}
                                />
                                {error && (<Text style={{ color: 'red', fontSize: 10, marginTop: 10 }}>{error}</Text>)}
                            </View>
                            <TouchableOpacity style={styles.SearchButton} onPress={handelSearchData}>
                                <FontAwesome name="search" size={28} color="#fff" style={{ textAlign: 'center' }} />
                            </TouchableOpacity>

                        </View>
                        <Divider style={{ marginTop: 10 }} />
                        <View>
                            <Text style={styles.label}>
                                Session. <Text style={styles.badge}>*</Text>
                            </Text>
                            <View style={styles.sessionView}>
                                <View style={styles.datePikerView} >
                                    <Text style={styles.textDateTimePiker}>{parts[0]}</Text>
                                </View>
                                <Text style={styles.labelTo}>To</Text>
                                <View style={styles.datePikerView}>
                                    <Text style={styles.textDateTimePiker}>{parts[1]}</Text>
                                </View>
                            </View>


                            <Formik
                                initialValues={{
                                    uan: studentData?.stuUAN || '',
                                    candidateName: studentData?.stuName || '',
                                    fatherName: studentData?.stuFatherName || '',
                                    motherName: studentData?.stuMotherName || '',
                                    bloodGroup: '',
                                    stream: '',
                                    semester: '',
                                    majorPaper: '',
                                    gander: studentData?.stuGender || '',
                                    stuAadharNo: '',
                                    fatherAadhar: '',
                                    motherAadhar: '',
                                    identiMark: '',
                                    address: '',
                                    pOffice: '',
                                    psOffice: '',
                                    pinCode: '',
                                    state: '',
                                    district: '',
                                    stuCategory: studentData?.stuCategory || ''

                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    setLoading(true)

                                    try {
                                        const data = {
                                            slNo: "123",
                                            stuUAN: values.uan.trim(),
                                            stuStream: values.stream.trim(),
                                            stuSemester: values.semester.trim(),
                                            stuMajorPaper: values.majorPaper.trim(),
                                            stuBloodGroup: values.bloodGroup.trim(),
                                            stuAadharNo: values.stuAadharNo.trim(),
                                            motherAadharNo: values.motherAadhar.trim(),
                                            fatherAadharNo: values.fatherAadhar.trim(),
                                            stuIdMarks: values.identiMark.trim(),
                                            postOffice: values.pOffice.trim(),
                                            policeStation: values.psOffice.trim(),
                                            pinCode: values.pinCode.trim(),
                                            state: values.state.trim(),
                                            district: values.district.trim(),
                                        }

                                        const res = await addDocument(AdmissionCollectionId, data)
                                        if (res == "Document Added") {
                                            router.back()
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    } finally {
                                        setLoading(false)
                                    }
                                    console.log(data)
                                    // Alert.alert('Form Submitted', JSON.stringify(values));
                                }}
                            >
                                {({
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue,
                                    values,
                                    errors,
                                    touched,
                                    handleBlur
                                }) => (
                                    <View style={{ marginTop: 10 }}>

                                        <CustomInput
                                            title="Student UAN No."
                                            required={true}
                                            onChangeText={handleChange('uan')}
                                            onBlur={handleBlur('uan')}
                                            values={values.uan}
                                            placeholder="Enter UAN No."
                                            labelsStyle={styles.labelsStyle}
                                            inputStyle={styles.inputStyle}
                                            keyboardType="default"
                                            badgeStyles={styles.badge}
                                            editable={false}
                                        />
                                        {touched.uan && errors.uan && (
                                            <Text style={{ color: 'red' }}>{errors.uan}</Text>
                                        )}
                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Student Name"
                                                required={true}
                                                onChangeText={handleChange('candidateName')}
                                                onBlur={handleBlur('candidateName')}
                                                values={values.candidateName}
                                                placeholder="Enter Student Name"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.candidateName && errors.candidateName && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.candidateName}</Text>
                                            )}
                                        </View>

                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Fathers Name"
                                                required={true}
                                                onChangeText={handleChange('fatherName')}
                                                onBlur={handleBlur('fatherName')}
                                                values={values.fatherName}
                                                placeholder="Enter Fathers Name"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.fatherName && errors.fatherName && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.fatherName}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Mothers Name"
                                                required={true}
                                                onChangeText={handleChange('motherName')}
                                                onBlur={handleBlur('motherName')}
                                                values={values.motherName}
                                                placeholder="Enter Mothers Name"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.motherName && errors.motherName && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.motherName}</Text>
                                            )}
                                        </View>



                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Category"
                                                required={true}
                                                onChangeText={handleChange('stuCategory')}
                                                onBlur={handleBlur('stuCategory')}
                                                values={values.stuCategory}
                                                placeholder="Enter Category Name"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.stuCategory && errors.stuCategory && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.stuCategory}</Text>
                                            )}
                                        </View>





                                        <Text style={styles.label}>
                                            Select Stream.<Text style={styles.badge}>*</Text>
                                        </Text>


                                        <View >

                                            <RadioButton.Group onValueChange={(val) => setFieldValue('stream', val)}
                                                value={values.stream}>
                                                <View style={styles.groupData}>


                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton value="ARTS" color='#690405' />
                                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>ARTS</Text>

                                                    </View>


                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton value="SCIENCE" color='#690405' />
                                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>SCIENCE</Text>

                                                    </View>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton value="COMMERCE" color='#690405' />
                                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>COMMERCE</Text>

                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                        {touched.stream && errors.stream && (
                                            <Text style={{ color: 'red' }}>{errors.stream}</Text>
                                        )}


                                        <CategorySelectList
                                            label="Select Semester"
                                            data={data}
                                            selectedValue={values.semester}
                                            onSelect={(val) => setFieldValue('semester', val)}
                                            search={false}
                                            required={true}
                                        />
                                        {touched.semester && errors.semester && (
                                            <Text style={{ color: 'red' }}>{errors.semester}</Text>
                                        )}



                                        <View>


                                            <CustomInput
                                                title="Major (Hons) Paper"
                                                required={true}
                                                onChangeText={handleChange('majorPaper')}
                                                onBlur={handleBlur('majorPaper')}
                                                values={values.majorPaper}
                                                placeholder="Enter Major (Hons) Paper"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={true}
                                            />
                                            {touched.majorPaper && errors.majorPaper && (
                                                <Text style={{ color: 'red' }}>{errors.majorPaper}</Text>
                                            )}
                                        </View>




                                        <View >



                                            <Text style={[styles.label, { marginTop: 10 }]}>
                                                Select DOB.<Text style={styles.badge}>*</Text>
                                            </Text>
                                            <TouchableOpacity style={styles.dateOfBirthPikerView} >
                                                <Text style={styles.textDateTimePiker}>{selectedDate}</Text>
                                            </TouchableOpacity>




                                            <CategorySelectList
                                                label="Select Blood Group"
                                                data={BloodGroupData}
                                                selectedValue={values.bloodGroup}
                                                onSelect={(val) => setFieldValue('bloodGroup', val)}
                                                search={false}
                                                required={true}
                                            />
                                            {touched.bloodGroup && errors.bloodGroup && (
                                                <Text style={{ color: 'red' }}>{errors.bloodGroup}</Text>
                                            )}




                                            <Text style={styles.label}>
                                                Select Gender.<Text style={styles.badge}>*</Text>

                                            </Text>
                                            <RadioButton.Group
                                                // onValueChange={(val) => setFieldValue('gander', val)}
                                                value={values.gander}
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
                                            {touched.gander && errors.gander && (
                                                <Text style={{ color: 'red' }}>{errors.gander}</Text>
                                            )}




                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="Aadhar Number"
                                                    required={true}
                                                    onChangeText={handleChange('stuAadharNo')}
                                                    onBlur={handleBlur('stuAadharNo')}
                                                    values={values.stuAadharNo}
                                                    placeholder="Enter Aadhar Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.stuAadharNo && errors.stuAadharNo && (
                                                    <Text style={{ color: 'red' }}>{errors.stuAadharNo}</Text>
                                                )}





                                            </View>

                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Mothers Aadhar Number"
                                                    required={true}
                                                    onChangeText={handleChange('motherAadhar')}
                                                    onBlur={handleBlur('motherAadhar')}
                                                    values={values.motherAadhar}
                                                    placeholder="Enter Mothers Aadhar Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.motherAadhar && errors.motherAadhar && (
                                                    <Text style={{ color: 'red' }}>{errors.motherAadhar}</Text>
                                                )}

                                            </View>

                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Father Aadhar Number"
                                                    required={true}
                                                    onChangeText={handleChange('fatherAadhar')}
                                                    onBlur={handleBlur('fatherAadhar')}
                                                    values={values.fatherAadhar}
                                                    placeholder="Enter Father Aadhar Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.fatherAadhar && errors.fatherAadhar && (
                                                    <Text style={{ color: 'red' }}>{errors.fatherAadhar}</Text>
                                                )}

                                            </View>


                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Identification Marks"
                                                    required={true}
                                                    onChangeText={handleChange('identiMark')}
                                                    onBlur={handleBlur('identiMark')}
                                                    values={values.identiMark}
                                                    placeholder="Enter Identification Marks"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.identiMark && errors.identiMark && (
                                                    <Text style={{ color: 'red' }}>{errors.identiMark}</Text>
                                                )}

                                            </View>



                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Correspondence Address:At"
                                                    required={true}
                                                    onChangeText={handleChange('address')}
                                                    onBlur={handleBlur('address')}
                                                    values={values.address}
                                                    placeholder="Enter Correspondence Address:At"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.address && errors.address && (
                                                    <Text style={{ color: 'red' }}>{errors.address}</Text>
                                                )}

                                         </View>
                                            <View style={styles.inputView}>
                                                <CustomInput
                                                    title="Post Office"
                                                    required={true}
                                                    onChangeText={handleChange('pOffice')}
                                                    onBlur={handleBlur('pOffice')}
                                                    values={values.pOffice}
                                                    placeholder="EnterPost Office"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.pOffice && errors.pOffice && (
                                                    <Text style={{ color: 'red' }}>{errors.pOffice}</Text>
                                                )}

                                            </View>
                                            <View style={styles.inputView}>
                                                <CustomInput
                                                    title="Police Station "
                                                    required={true}
                                                    onChangeText={handleChange('psOffice')}
                                                    onBlur={handleBlur('psOffice')}
                                                    values={values.psOffice}
                                                    placeholder="Enter Police Station"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.psOffice && errors.psOffice && (
                                                    <Text style={{ color: 'red' }}>{errors.psOffice}</Text>
                                                )}

                                            </View>
                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="Pin Code"
                                                    required={true}
                                                    onChangeText={handleChange('pinCode')}
                                                    onBlur={handleBlur('pinCode')}
                                                    values={values.pinCode}
                                                    placeholder="Enter Pin Code"
                                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.pinCode && errors.pinCode && (
                                                    <Text style={{ color: 'red' }}>{errors.pinCode}</Text>
                                                )}
                                            </View>
                                            <CategorySelectList
                                                label="Select State"
                                                data={districtData.states.map(state => ({ key: state.state, value: state.state }))}
                                                selectedValue={values.state}
                                                onSelect={(val) => handleStateChange(val, setFieldValue)}
                                                required={true}
                                                search={true}
                                            />
                                            {touched.state && errors.state && (
                                                <Text style={{ color: 'red' }}>{errors.state}</Text>
                                            )}
                                            <CategorySelectList
                                                label="Select District"
                                                data={districts.map(district => ({ key: district, value: district }))}
                                                selectedValue={values.district}
                                                onSelect={(val) => setFieldValue('district', val)} // Handle district selection
                                                required={true}
                                                search={true}
                                            />
                                            {touched.district && errors.district && (
                                                <Text style={{ color: 'red' }}>{errors.district}</Text>
                                            )}

                                        </View>
                                        <View>
                                            <CustomButton
                                                buttonStyle={styles.buttonStyle}
                                                buttonStyleText={styles.buttonStyleText}
                                                children="Submit"
                                                onClick={handleSubmit}
                                                required={true}
                                            />

                                        </View>


                                    </View>

                                )}
                            </Formik>


                        </View>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>

            </ScrollView>
    )
}

export default AddAdmission