import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../styles/screens/DCAdmission'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Divider, RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { addDocument, getDocumentsById,addAddmistion } from '../../Function/AppwriteCollection';
import Loader from '../../components/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { districtData, SubjectOfferedData } from '../../../src/data';  // Import from the correct path
import { AdmissionCollectionId, EnrollmentStudentsCollectionId } from '../../../src/appwriteAllid';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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
    corAddress: Yup.string().required('Correspondence Address is required'),
    perAddress: Yup.string().required('Permanent Address is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    stuCategory: Yup.string().required('Category is required'),

    mobNo: Yup.string().required('Student Mobile No is required').matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
    whatsappNo: Yup.string().required('Student WhatsApp No is required').matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
    emailId: Yup.string().required('Student Email Id is required').email(),
    religion: Yup.string().required('Student Religion is required'),
    maritalStatus: Yup.string().required('Student Marital Status is required'),
    fatherMobNo: Yup.string().required('Father`s Mob No is required').matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
    fatherOccupation: Yup.string().required('Father`s Occupation is required'),
    motherOccupation: Yup.string().required('Mother`s Occupation is required'),
    motherMobNo: Yup.string().required('Mother`s Mob No is required').matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
    bankName: Yup.string().required('Bank Name is required'),
    acHolderName: Yup.string().required('Account Holder Name is required'),
    accountNumber: Yup.string().required('Account No is required'),
    ifscNo: Yup.string().required('IFSC No is required'),
    branchName: Yup.string().required('Branch Name is required'),

    matricBoardName: Yup.string().required('Board Name is required'),
    matricPassingYear: Yup.string().required('Passing Year is required'),
    matriRollNo: Yup.string().required('Roll Number is required'),
    matricRollCode: Yup.string().required('Roll Code is required'),
    matricMarks: Yup.string().required('Marks is required'),
    matricPercentage: Yup.string().required('Percentage is required'),
    institutionState: Yup.string().required('Institution State is required'),
    institutionDistrict: Yup.string().required('Institution District is required'),
    matricInstitutionCode: Yup.string().required('Institution Code is required'),

    
    interBoardName: Yup.string().required('Board Name is required'),
    interPassingYear: Yup.string().required('Passing Year is required'),
    interRollNo: Yup.string().required('Roll No is required'),
    interRollCode: Yup.string().required('Roll Name is required'),
    interMarks: Yup.string().required('Marks is required'),
    interPercentage: Yup.string().required('Percentage is required'),
    interInstitutionCode: Yup.string().required('Institution Code is required'),
    interCLCNo: Yup.string().required('CLC No is required'),
    interTCNo: Yup.string().required('TC No is required'),
    interCLCTCIssueDate: Yup.string().required('Issue Date is required'),
    interMigrationNo: Yup.string().required('Migration No is required'),
    interMigrationIssueDate: Yup.string().required('Issue Date is required'),
    interInstitutionState: Yup.string().required('Institution State is required'),
    interInstitutionDistrict: Yup.string().required('Institution District is required'),

    micSubject: Yup.string().required('MIC Subject is required'),
    mdcSubject: Yup.string().required('MDC Subject is required'),
    secSubject: Yup.string().required('SEC Subject is required'),
    vacSubject: Yup.string().required('VAC Subject is required'),
    extraSubject: Yup.string().required('This Felid is required'),
    admissionFee: Yup.string().required('Admission Fee is required'),


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

const ReligionData = [
    { key: '1', value: 'Christianity' },
    { key: '2', value: 'Judaism' },
    { key: '3', value: 'Buddhism' },
    { key: '4', value: 'Shinto' },
    { key: '5', value: 'Islam' },
    { key: '6', value: 'Confucianism' },
    { key: '7', value: 'Jainism' },
    { key: '8', value: 'Hinduism' },
    { key: '9', value: 'Taoism' },
    { key: '10', value: 'Baha`i' },
    { key: '11', value: 'Zoroastrianism' },
]

const MaritalStatusData = [
    { key: '1', value: 'Single' },
    { key: '2', value: 'Married' },
    { key: '3', value: 'Widowed' },
    { key: '4', value: 'Divorced' },
]

const StreamData = [
    { key: '1', value: 'Commerce' },
    { key: '2', value: 'Science' },
    { key: '3', value: 'Arts' },
]

const extraSubjectData1 = [
    { key: '1', value: 'Hindi' },
    { key: '2', value: 'English' },
    { key: '3', value: 'Urdu' },
    { key: '4', value: 'Mathali' },
]

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
    const [institutionDistricts, seInstitutionDistricts] = useState([]);
    const [interInstitutionDistricts, seInterInstitutionDistricts] = useState([]);
    const [subject, setSubject] = useState([]);
    const [mdcSubject, setMdcSubject] = useState([]);

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


    const handleInstitutionStateChange = (selectedState, setFieldValue) => {
        const stateObj = districtData.states.find(state => state.state === selectedState);
        // console.log("stateObj",stateObj)
        if (stateObj) {
            seInstitutionDistricts(stateObj.districts); // Update districts based on selected state
            setFieldValue('institutionDistrict', ''); // Clear district selection
        } else {
            seInstitutionDistricts([]);
        }
        setFieldValue('institutionState', selectedState); // Set the selected state in form
    };



    const handleInterStateChange = (selectedState, setFieldValue) => {
        const stateObj = districtData.states.find(state => state.state === selectedState);
        // console.log("stateObj",stateObj)
        if (stateObj) {
            seInterInstitutionDistricts(stateObj.districts); // Update districts based on selected state
            setFieldValue('interInstitutionDistrict', ''); // Clear district selection
        } else {
            seInterInstitutionDistricts([]);
        }
        setFieldValue('interInstitutionState', selectedState); // Set the selected state in form
    };

    const handleMJCChange = (selectedSubject, setFieldValue) => {
        const subjectObj = SubjectOfferedData.subjects.find(subject => subject.subject === selectedSubject);
        const subjectObjNot = SubjectOfferedData.subjects.filter(data => data.subject !== selectedSubject)

        const allSubjects = subjectObjNot
            .flatMap(item => item.subSubject) // Combine all subSubject arrays
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

        // console.log(allSubjects)
        // console.log("subjectObj",subjectObj)
        // console.log("stateObj",stateObj)
        if (subjectObj) {
            setSubject(subjectObj.subSubject); // Update districts based on selected state
            setFieldValue('majorPaper', ''); // Clear district selection
            setMdcSubject(allSubjects)
        } else {
            setSubject([]);
        }
        setFieldValue('stream', selectedSubject); // Set the selected state in form
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
        // console.log("search", search)
        setLoading(true);
        try {
            const result = await getDocumentsById(EnrollmentStudentsCollectionId, "stuUAN", search);
            if (result.length == 0) {
                // console.log("object")
                setError("Student UAN No. Not Found  Please Check UAN No")
            } else {
                // console.log(result)
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
                                    corAddress: '',
                                    perAddress: '',
                                    state: '',
                                    district: '',
                                    stuCategory: studentData?.stuCategory || '',

                                    mobNo: '',
                                    whatsappNo: '',
                                    emailId: '',
                                    religion: '',
                                    maritalStatus: '',
                                    fatherMobNo: '',
                                    fatherOccupation: '',
                                    motherOccupation: '',
                                    motherMobNo: '',

                                    bankName: '',
                                    acHolderName: '',
                                    accountNumber: '',
                                    ifscNo: '',
                                    branchName: '',

                                    matricBoardName: '',
                                    matricPassingYear: '',
                                    matriRollNo: '',
                                    matricRollCode: '',
                                    matricMarks: '',
                                    matricPercentage: '',
                                    matricInstitutionCode: '',
                                    institutionState: '',
                                    institutionDistrict: '', 

                                    interBoardName: '',
                                    interPassingYear: '',
                                    interRollNo: '',
                                    interRollCode: '',
                                    interMarks: '',
                                    interPercentage: '',
                                    interInstitutionCode: '',
                                    interCLCNo: '',
                                    interTCNo: '',
                                    interCLCTCIssueDate: '',
                                    interMigrationNo: '',
                                    interMigrationIssueDate: '',
                                    interInstitutionState: '',
                                    interInstitutionDistrict: '',
                                    
                                    micSubject: '',
                                    mdcSubject: '',
                                    secSubject: studentData?.stuSEC || '',
                                    vacSubject: studentData?.stuVAC || '',
                                    extraSubject: '',
                                    admissionFee:studentData?.stuGender=="Female"?"0":studentData?.stuCategory=="ST"?"0":studentData?.stuCategory=="SC"?"0": ''

                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    setLoading(true)

                                    try {
                                        const bankDetailsData = [{
                                            bankName: values.bankName,
                                            acHolderName: values.acHolderName,
                                            accountNumber: values.accountNumber,
                                            ifscNo: values.ifscNo,
                                            branchName: values.branchName
                                          }];
                                        
                                          const matricDetailsData = [{
                                            matricBoardName: values.matricBoardName,
                                            matricPassingYear: values.matricPassingYear,
                                            matriRollNo: values.matriRollNo,
                                            matricRollCode: values.matricRollCode,
                                            matricMarks: values.matricMarks,
                                            matricPercentage: values.matricPercentage,
                                            matricInstitutionCode: values.matricInstitutionCode,
                                            institutionState: values.institutionState,
                                            institutionDistrict: values.institutionDistrict
                                          }];
                                        
                                          const interDetailsData = [{
                                            interBoardName: values.interBoardName,
                                            interPassingYear: values.interPassingYear,
                                            interRollNo: values.interRollNo,
                                            interRollCode: values.interRollCode,
                                            interMarks: values.interMarks,
                                            interPercentage: values.interPercentage,
                                            interInstitutionCode: values.interInstitutionCode,
                                            interCLCNo: values.interCLCNo,
                                            interTCNo: values.interTCNo,
                                            interCLCTCIssueDate: values.interCLCTCIssueDate,
                                            interMigrationNo: values.interMigrationNo,
                                            interMigrationIssueDate: values.interMigrationIssueDate,
                                            interInstitutionState: values.interInstitutionState,
                                            interInstitutionDistrict: values.interInstitutionDistrict
                                          }];
                                            // Serialize arrays to strings if the fields are strings in the Appwrite schema
//   const serializedBankDetails = JSON.stringify(bankDetailsData);
//   const serializedMatricDetails = JSON.stringify(matricDetailsData);
//   const serializedInterDetails = JSON.stringify(interDetailsData);

                                        const data = {
                                            slNo:"1",
                                            stuUAN: values.uan.trim(),
                                            stuStream: values.stream.trim(),
                                            stuSemester: values.semester.trim(),
                                            stuMajorPaper: values.majorPaper.trim(),
                                            stuBloodGroup: values.bloodGroup.trim(),
                                            stuAadharNo: values.stuAadharNo.trim(),
                                            motherAadharNo: values.motherAadhar.trim(),
                                            fatherAadharNo: values.fatherAadhar.trim(),
                                            stuIdMarks: values.identiMark.trim(),
                                            state: values.state.trim(),
                                            district: values.district.trim(),
                                            stuMobNo:values.mobNo,
                                            stuWhatsapp:values.whatsappNo,
                                            stuEmail:values.emailId,
                                            religion:values.religion,
                                            maritalStatus:values.maritalStatus,
                                            minorPaper:values.micSubject,
                                            mdCourse:values.mdcSubject,
                                            motherMobNo:values.motherMobNo,
                                            fatherMobNo:values.fatherMobNo,
                                            motherOccupation:values.motherOccupation,
                                            fatherOccupation:values.fatherOccupation,
                                            corressFullAdress:values.corAddress,
                                            perFullAdress:values.perAddress,
                                            bankDetails:serializedBankDetails,
                                            matricDetails:serializedMatricDetails,
                                            interDetails:serializedInterDetails,
                                            admissionFee:values.admissionFee,
                                            addedTo:'Admin',
                                            semSubject:values.extraSubject,
                                        }
                                        // console.log(data)
                                        const res = await addAddmistion(AdmissionCollectionId, data)
                                        console.log(res)
                                        if (res == "Document Added") {
                                            router.back()
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    } finally {
                                        setLoading(false)
                                    }
                                    // console.log(data)
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
                                }) => {
                                    // if(studentData?.stuGender=="Female" || studentData?.stuCategory=="ST" || studentData?.stuCategory=="SC"){
                                    //     setFieldValue("admissionFee","0")
                                    // }else{
                                    //     setFieldValue("admissionFee","")
                                    // }

return(
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
                                                title="Student Mobile Number"
                                                required={true}
                                                onChangeText={handleChange('mobNo')}
                                                onBlur={handleBlur('mobNo')}
                                                values={values.mobNo}
                                                placeholder="Enter Mobile Number"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="phone-pad"
                                                badgeStyles={styles.badge}
                                                editable={true}
                                            />
                                            {touched.mobNo && errors.mobNo && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.mobNo}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Student Whatsapp Number"
                                                required={true}
                                                onChangeText={handleChange('whatsappNo')}
                                                onBlur={handleBlur('whatsappNo')}
                                                values={values.whatsappNo}
                                                placeholder="Enter Whatsapp Mobile Number"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="phone-pad"
                                                badgeStyles={styles.badge}
                                                editable={true}
                                            />
                                            {touched.whatsappNo && errors.whatsappNo && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.whatsappNo}</Text>
                                            )}
                                        </View>

                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Student Email Id"
                                                required={true}
                                                onChangeText={handleChange('emailId')}
                                                onBlur={handleBlur('emailId')}
                                                values={values.emailId}
                                                placeholder="EnterEmail Id"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="email-address"
                                                badgeStyles={styles.badge}
                                                editable={true}
                                            />
                                            {touched.emailId && errors.emailId && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.emailId}</Text>
                                            )}
                                        </View>


                                        <CategorySelectList
                                            label="Select Religion"
                                            data={ReligionData}
                                            selectedValue={values.religion}
                                            onSelect={(val) => setFieldValue('religion', val)}
                                            search={false}
                                            required={true}
                                        />
                                        {touched.religion && errors.religion && (
                                            <Text style={{ color: 'red' }}>{errors.religion}</Text>
                                        )}

                                        <CategorySelectList
                                            label="Select Marital Status"
                                            data={MaritalStatusData}
                                            selectedValue={values.religion}
                                            onSelect={(val) => setFieldValue('maritalStatus', val)}
                                            search={false}
                                            required={true}
                                        />
                                        {touched.maritalStatus && errors.maritalStatus && (
                                            <Text style={{ color: 'red' }}>{errors.maritalStatus}</Text>
                                        )}






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






                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="SKill Enhancement Course (SEC)"
                                                required={true}
                                                onChangeText={handleChange('secSubject')}
                                                onBlur={handleBlur('secSubject')}
                                                values={values.secSubject}
                                                placeholder="Enter SKill Enhancement Course"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.secSubject && errors.secSubject && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.secSubject}</Text>
                                            )}
                                        </View>

                                        <View style={{ marginTop: 10 }}>
                                            <CustomInput
                                                title="Value Added Course (VAC)"
                                                required={true}
                                                onChangeText={handleChange('vacSubject')}
                                                onBlur={handleBlur('vacSubject')}
                                                values={values.vacSubject}
                                                placeholder="Enter Value Added Course"
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType="default"
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                            {touched.vacSubject && errors.vacSubject && (
                                                <Text style={{ color: 'red', marginTop: 5 }}>{errors.vacSubject}</Text>
                                            )}
                                        </View>



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


                                        <CategorySelectList
                                            label="Select Stream."
                                            data={StreamData}
                                            selectedValue={values.stream}
                                            onSelect={(val) => handleMJCChange(val, setFieldValue)}
                                            search={false}
                                            required={true}
                                        />
                                        {touched.stream && errors.stream && (
                                            <Text style={{ color: 'red' }}>{errors.stream}</Text>
                                        )}


                                        {/* <CategorySelectList
                                                label="Select Major Paper. (MJC)"
                                                data={StreamData}
                                                selectedValue={values.bloodGroup}
                                                onSelect={(val) => handleMJCChange(val, setFieldValue)}
                                                search={false}
                                                required={true}
                                            />
                                            {touched.stream && errors.stream && (
                                                <Text style={{ color: 'red' }}>{errors.stream}</Text>
                                            )} */}


                                        <CategorySelectList
                                            label="Select Major Paper. (MJC)"

                                            data={subject.map(data => ({ key: data, value: data }))}
                                            selectedValue={values.majorPaper}


                                            onSelect={(val) => setFieldValue('majorPaper', val)} // Handle district selection

                                            required={true}
                                            search={true}
                                        />
                                        {touched.majorPaper && errors.majorPaper && (
                                            <Text style={{ color: 'red' }}>{errors.majorPaper}</Text>
                                        )}




                                        <CategorySelectList
                                            label="Select Minor Paper. (MIC)"

                                            data={subject.filter(data => data !== values.majorPaper).map(data => ({ key: data, value: data }))}
                                            selectedValue={values.micSubject}


                                            onSelect={(val) => setFieldValue('micSubject', val)} // Handle district selection

                                            required={true}
                                            search={true}
                                        />
                                        {touched.micSubject && errors.micSubject && (
                                            <Text style={{ color: 'red' }}>{errors.micSubject}</Text>
                                        )}


                                        <CategorySelectList
                                            label="Select Multi Disciplinary Course. (MDC)"

                                            data={mdcSubject.map(data => ({ key: data, value: data }))}
                                            selectedValue={values.mdcSubject}


                                            onSelect={(val) => setFieldValue('mdcSubject', val)} // Handle district selection

                                            required={true}
                                            search={true}
                                        />
                                        {touched.mdcSubject && errors.mdcSubject && (
                                            <Text style={{ color: 'red' }}>{errors.mdcSubject}</Text>
                                        )}


                                        

                                        {values.semester === "I" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester I AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}


                                        {values.semester === "II" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester II AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}


                                        {values.semester === "III" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester III AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}


                                        {values.semester === "IV" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester IV AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}

                                        {values.semester === "V" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester V AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}
                                        {values.semester === "VI" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester VI AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}

                                        {values.semester === "VII" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester VII AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}


                                        {values.semester === "VIII" && (
                                            <>
                                                <CategorySelectList
                                                    label="Select Semester VIII AEC Subject"

                                                    data={extraSubjectData1}
                                                    selectedValue={values.extraSubject}


                                                    onSelect={(val) => setFieldValue('extraSubject', val)} // Handle district selection

                                                    required={true}
                                                    search={true}
                                                />
                                                {touched.extraSubject && errors.extraSubject && (
                                                    <Text style={{ color: 'red' }}>{errors.extraSubject}</Text>
                                                )}
                                            </>
                                        )}









                                        {/* 
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
)} */}



                                        {/* <View>


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

 */}



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
                                                    keyboardType="number-pad"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.stuAadharNo && errors.stuAadharNo && (
                                                    <Text style={{ color: 'red' }}>{errors.stuAadharNo}</Text>
                                                )}





                                            </View>

                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Mother`s Aadhar Number"
                                                    required={true}
                                                    onChangeText={handleChange('motherAadhar')}
                                                    onBlur={handleBlur('motherAadhar')}
                                                    values={values.motherAadhar}
                                                    placeholder="Enter Mother`s Aadhar Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                   keyboardType="number-pad"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.motherAadhar && errors.motherAadhar && (
                                                    <Text style={{ color: 'red' }}>{errors.motherAadhar}</Text>
                                                )}

                                            </View>

                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Mother`s Mobile Number"
                                                    required={true}
                                                    onChangeText={handleChange('motherMobNo')}
                                                    onBlur={handleBlur('motherMobNo')}
                                                    values={values.motherMobNo}
                                                    placeholder="Enter Mother`s Mobile Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="phone-pad"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.motherMobNo && errors.motherMobNo && (
                                                    <Text style={{ color: 'red' }}>{errors.motherMobNo}</Text>
                                                )}

                                            </View>



                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Mother`s Occupation"
                                                    required={true}
                                                    onChangeText={handleChange('motherOccupation')}
                                                    onBlur={handleBlur('motherOccupation')}
                                                    values={values.motherOccupation}
                                                    placeholder="Enter Mother`s Occupation"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.motherOccupation && errors.motherOccupation && (
                                                    <Text style={{ color: 'red' }}>{errors.motherOccupation}</Text>
                                                )}

                                            </View>


                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Father`s Aadhar Number"
                                                    required={true}
                                                    onChangeText={handleChange('fatherAadhar')}
                                                    onBlur={handleBlur('fatherAadhar')}
                                                    values={values.fatherAadhar}
                                                    placeholder="Enter Father`s Aadhar Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                   keyboardType="number-pad"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.fatherAadhar && errors.fatherAadhar && (
                                                    <Text style={{ color: 'red' }}>{errors.fatherAadhar}</Text>
                                                )}

                                            </View>

                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Father`s Mobile Number"
                                                    required={true}
                                                    onChangeText={handleChange('fatherMobNo')}
                                                    onBlur={handleBlur('fatherMobNo')}
                                                    values={values.fatherMobNo}
                                                    placeholder="Enter Father`s Mobile Number"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="phone-pad"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.fatherMobNo && errors.fatherMobNo && (
                                                    <Text style={{ color: 'red' }}>{errors.fatherMobNo}</Text>
                                                )}

                                            </View>



                                            <View style={styles.inputView}>



                                                <CustomInput
                                                    title="Father`s Occupation"
                                                    required={true}
                                                    onChangeText={handleChange('fatherOccupation')}
                                                    onBlur={handleBlur('fatherOccupation')}
                                                    values={values.fatherOccupation}
                                                    placeholder="Enter Father`s Occupation"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType="default"
                                                    badgeStyles={styles.badge}
                                                    editable={true}
                                                />
                                                {touched.fatherOccupation && errors.fatherOccupation && (
                                                    <Text style={{ color: 'red' }}>{errors.fatherOccupation}</Text>
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










                                            <Text style={[styles.labelsStyle, { marginTop: 10 }]}>
                                                Correspondence Full Address:At.<Text style={styles.badge}>*</Text>

                                            </Text>

                                            <View style={styles.inputView}>

                                                <TextInput
                                                    style={styles.textarea}
                                                    multiline={true}
                                                    numberOfLines={4}
                                                    placeholder="Enter Correspondence Address:At"
                                                    onChangeText={handleChange('corAddress')}
                                                    onBlur={handleBlur('corAddress')}
                                                    values={values.corAddress}
                                                />
                                                {touched.corAddress && errors.corAddress && (
                                                    <Text style={{ color: 'red' }}>{errors.corAddress}</Text>
                                                )}

                                            </View>




                                            <Text style={[styles.labelsStyle, { marginTop: 10 }]}>
                                                Permanent Full Address:At.<Text style={styles.badge}>*</Text>

                                            </Text>
                                            <View style={styles.inputView}>

                                                <TextInput
                                                    style={styles.textarea}
                                                    multiline={true}
                                                    numberOfLines={4}
                                                    placeholder="Enter Correspondence Address:At"
                                                    onChangeText={handleChange('perAddress')}
                                                    onBlur={handleBlur('perAddress')}
                                                    values={values.perAddress}
                                                />
                                                {touched.perAddress && errors.perAddress && (
                                                    <Text style={{ color: 'red' }}>{errors.perAddress}</Text>
                                                )}

                                            </View>







                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="Bank Name"
                                                    required={true}
                                                    onChangeText={handleChange('bankName')}
                                                    onBlur={handleBlur('bankName')}
                                                    values={values.bankName}
                                                    placeholder="Enter Bank Name"
                                                    labelsStyle={styles.labelsStyle}
                                                    inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.bankName && errors.bankName && (
                                                    <Text style={{ color: 'red' }}>{errors.bankName}</Text>
                                                )}
                                            </View>

                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="A/C Holder Nmae"
                                                    required={true}
                                                    onChangeText={handleChange('acHolderName')}
                                                    onBlur={handleBlur('acHolderName')}
                                                    values={values.acHolderName}

                                                    placeholder="Enter A/C Holder Name"
                                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.acHolderName && errors.acHolderName && (
                                                    <Text style={{ color: 'red' }}>{errors.acHolderName}</Text>
                                                )}
                                            </View>

                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="Account No."
                                                    required={true}
                                                    onChangeText={handleChange('accountNumber')}
                                                    onBlur={handleBlur('accountNumber')}
                                                    values={values.accountNumber}
                                                    placeholder="Enter Account No."
                                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.accountNumber && errors.accountNumber && (
                                                    <Text style={{ color: 'red' }}>{errors.accountNumber}</Text>
                                                )}
                                            </View>

                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="IFSC No"
                                                    required={true}
                                                    onChangeText={handleChange('ifscNo')}
                                                    onBlur={handleBlur('ifscNo')}
                                                    values={values.ifscNo}

                                                    placeholder="Enter IFSC No"
                                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.ifscNo && errors.ifscNo && (
                                                    <Text style={{ color: 'red' }}>{errors.ifscNo}</Text>
                                                )}
                                            </View>

                                            <View style={styles.inputView}>

                                                <CustomInput
                                                    title="Branch Name"
                                                    required={true}
                                                    onChangeText={handleChange('branchName')}
                                                    onBlur={handleBlur('branchName')}
                                                    values={values.branchName}
                                                    placeholder="Enter Branch Name."
                                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                    keyboardType={'default'}
                                                    badgeStyles={styles.badge}
                                                />
                                                {touched.branchName && errors.branchName && (
                                                    <Text style={{ color: 'red' }}>{errors.branchName}</Text>
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



                                        <Divider style={{ marginTop: 10 }} />

                                        <Text style={styles.info}>Details Of Educational Qualification </Text>

                                        <Divider style={{ marginTop: 10 }} />
                                        <Text style={styles.info2}>Matric/10th Details</Text>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Board Name"
                                                required={true}
                                                onChangeText={handleChange('matricBoardName')}
                                                onBlur={handleBlur('matricBoardName')}
                                                values={values.matricBoardName}

                                                placeholder="Enter Board Name."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricBoardName && errors.matricBoardName && (
                                                <Text style={{ color: 'red' }}>{errors.matricBoardName}</Text>
                                            )}
                                        </View>
                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Passing Year"
                                                required={true}
                                                onChangeText={handleChange('matricPassingYear')}
                                                onBlur={handleBlur('matricPassingYear')}
                                                values={values.matricPassingYear}
                                                placeholder="Enter Passing Year."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricPassingYear && errors.matricPassingYear && (
                                                <Text style={{ color: 'red' }}>{errors.matricPassingYear}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Roll No"
                                                required={true}
                                                onChangeText={handleChange('matriRollNo')}
                                                onBlur={handleBlur('matriRollNo')}
                                                values={values.matriRollNo}
                                                placeholder="Enter Roll No."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matriRollNo && errors.matriRollNo && (
                                                <Text style={{ color: 'red' }}>{errors.matriRollNo}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Roll Code"
                                                required={true}
                                                onChangeText={handleChange('matricRollCode')}
                                                onBlur={handleBlur('matricRollCode')}
                                                values={values.matricRollCode}

                                                placeholder="Enter Roll Code."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricRollCode && errors.matricRollCode && (
                                                <Text style={{ color: 'red' }}>{errors.matricRollCode}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Marks"
                                                required={true}
                                                onChangeText={handleChange('matricMarks')}
                                                onBlur={handleBlur('matricMarks')}
                                                values={values.matricMarks}
                                                placeholder="Enter Marks."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricMarks && errors.matricMarks && (
                                                <Text style={{ color: 'red' }}>{errors.matricMarks}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="%AGE"
                                                required={true}
                                                onChangeText={handleChange('matricPercentage')}
                                                onBlur={handleBlur('matricPercentage')}
                                                values={values.matricPercentage}
                                                placeholder="Enter %AGE."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricPercentage && errors.matricPercentage && (
                                                <Text style={{ color: 'red' }}>{errors.matricPercentage}</Text>
                                            )}
                                        </View>



                                        <CategorySelectList
                                            label="Select Institution State"
                                            data={districtData.states.map(state => ({ key: state.state, value: state.state }))}
                                            selectedValue={values.institutionState}
                                            onSelect={(val) => handleInstitutionStateChange(val, setFieldValue)}
                                            required={true}
                                            search={true}
                                        />
                                        {touched.institutionState && errors.institutionState && (
                                            <Text style={{ color: 'red' }}>{errors.institutionState}</Text>
                                        )}

                                        <CategorySelectList
                                            label="Select Institution District"
                                            data={institutionDistricts.map(district => ({ key: district, value: district }))}
                                            selectedValue={values.institutionDistrict}
                                            onSelect={(val) => setFieldValue('institutionDistrict', val)} // Handle district selection
                                            required={true}
                                            search={true}
                                        />
                                        {touched.institutionDistrict && errors.institutionDistrict && (
                                            <Text style={{ color: 'red' }}>{errors.institutionDistrict}</Text>
                                        )}




                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="Institution Code"
                                                required={true}
                                                onChangeText={handleChange('matricInstitutionCode')}
                                                onBlur={handleBlur('matricInstitutionCode')}
                                                values={values.matricInstitutionCode}

                                                placeholder="Enter Institution Code."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.matricInstitutionCode && errors.matricInstitutionCode && (
                                                <Text style={{ color: 'red' }}>{errors.matricInstitutionCode}</Text>
                                            )}
                                        </View>



                                        <Divider style={{ marginTop: 10 }} />
                                        <Text style={styles.info2}>Inter/12th Details</Text>
                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Board Name"
                                                required={true}
                                                onChangeText={handleChange('interBoardName')}
                                                onBlur={handleBlur('interBoardName')}
                                                values={values.interBoardName}

                                                placeholder="Enter Board Name."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interBoardName && errors.interBoardName && (
                                                <Text style={{ color: 'red' }}>{errors.interBoardName}</Text>
                                            )}
                                        </View>
                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Passing Year"
                                                required={true}
                                                onChangeText={handleChange('interPassingYear')}
                                                onBlur={handleBlur('interPassingYear')}
                                                values={values.interPassingYear}
                                                placeholder="Enter Passing Year."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interPassingYear && errors.interPassingYear && (
                                                <Text style={{ color: 'red' }}>{errors.interPassingYear}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Roll No"
                                                required={true}
                                                onChangeText={handleChange('interRollNo')}
                                                onBlur={handleBlur('interRollNo')}
                                                values={values.interRollNo}
                                                placeholder="Enter Roll No."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interRollNo && errors.interRollNo && (
                                                <Text style={{ color: 'red' }}>{errors.interRollNo}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Roll Code"
                                                required={true}
                                                onChangeText={handleChange('interRollCode')}
                                                onBlur={handleBlur('interRollCode')}
                                                values={values.interRollCode}
                                                placeholder="Enter Roll Code."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interRollCode && errors.interRollCode && (
                                                <Text style={{ color: 'red' }}>{errors.interRollCode}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="Marks"
                                                required={true}
                                                onChangeText={handleChange('interMarks')}
                                                onBlur={handleBlur('interMarks')}
                                                values={values.interMarks}
                                                placeholder="Enter Marks."
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interMarks && errors.interMarks && (
                                                <Text style={{ color: 'red' }}>{errors.interMarks}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>

                                            <CustomInput
                                                title="%AGE"
                                                required={true}
                                                onChangeText={handleChange('interPercentage')}
                                                onBlur={handleBlur('interPercentage')}
                                                values={values.interPercentage}
                                                placeholder="Enter %AGE."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interPercentage && errors.interPercentage && (
                                                <Text style={{ color: 'red' }}>{errors.interPercentage}</Text>
                                            )}
                                        </View>





                                        <CategorySelectList
                                            label="Select Institution State"
                                            data={districtData.states.map(state => ({ key: state.state, value: state.state }))}
                                            selectedValue={values.interInstitutionState}
                                            onSelect={(val) => handleInterStateChange(val, setFieldValue)}
                                            required={true}
                                            search={true}
                                        />
                                        {touched.interInstitutionState && errors.interInstitutionState && (
                                            <Text style={{ color: 'red' }}>{errors.interInstitutionState}</Text>
                                        )}

                                        <CategorySelectList
                                            label="Select Institution District"
                                            data={interInstitutionDistricts.map(district => ({ key: district, value: district }))}
                                            selectedValue={values.interInstitutionDistrict}
                                            onSelect={(val) => setFieldValue('interInstitutionDistrict', val)} // Handle district selection
                                            required={true}
                                            search={true}
                                        />
                                        {touched.interInstitutionDistrict && errors.interInstitutionDistrict && (
                                            <Text style={{ color: 'red' }}>{errors.interInstitutionDistrict}</Text>
                                        )}













                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="Institution Code"
                                                required={true}
                                                onChangeText={handleChange('interInstitutionCode')}
                                                onBlur={handleBlur('interInstitutionCode')}
                                                values={values.interInstitutionCode}

                                                placeholder="Enter Institution Code."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interInstitutionCode && errors.interInstitutionCode && (
                                                <Text style={{ color: 'red' }}>{errors.interInstitutionCode}</Text>
                                            )}
                                        </View>


                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="C.L.C No."
                                                required={true}
                                                onChangeText={handleChange('interCLCNo')}
                                                onBlur={handleBlur('interCLCNo')}
                                                values={values.interCLCNo}
                                                placeholder="Enter C.L.C No."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interCLCNo && errors.interCLCNo && (
                                                <Text style={{ color: 'red' }}>{errors.interCLCNo}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="T.C No."
                                                required={true}
                                                onChangeText={handleChange('interTCNo')}
                                                onBlur={handleBlur('interTCNo')}
                                                values={values.interTCNo}
                                                placeholder="Enter C.L.C No."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interTCNo && errors.interTCNo && (
                                                <Text style={{ color: 'red' }}>{errors.interTCNo}</Text>
                                            )}
                                        </View>
                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="C.L.C & T.C Issue Date"
                                                required={true}
                                                onChangeText={handleChange('interCLCTCIssueDate')}
                                                onBlur={handleBlur('interCLCTCIssueDate')}
                                                values={values.interCLCTCIssueDate}
                                                placeholder="Enter C.L.C & T.C Issue Date"
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interCLCTCIssueDate && errors.interCLCTCIssueDate && (
                                                <Text style={{ color: 'red' }}>{errors.interCLCTCIssueDate}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="Migration No."
                                                required={true}
                                                onChangeText={handleChange('interMigrationNo')}
                                                onBlur={handleBlur('interMigrationNo')}
                                                values={values.interMigrationNo}
                                                placeholder="Enter C.L.C & T.C Issue Date"
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interMigrationNo && errors.interMigrationNo && (
                                                <Text style={{ color: 'red' }}>{errors.interMigrationNo}</Text>
                                            )}
                                        </View>

                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="Migration Issue Date"
                                                required={true}
                                                onChangeText={handleChange('interMigrationIssueDate')}
                                                onBlur={handleBlur('interMigrationIssueDate')}
                                                values={values.interMigrationIssueDate}
                                                placeholder="Enter Migration Issue Date."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.interMigrationIssueDate && errors.interMigrationIssueDate && (
                                                <Text style={{ color: 'red' }}>{errors.interMigrationIssueDate}</Text>
                                            )}
                                        </View>



                                        <View style={styles.inputView}>
                                            <CustomInput
                                                title="Admission Fee"
                                                required={true}
                                                onChangeText={handleChange('admissionFee')}
                                                onBlur={handleBlur('admissionFee')}
                                                values={values.admissionFee}
                                                placeholder="Enter Migration Issue Date."
                                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                            />
                                            {touched.admissionFee && errors.admissionFee && (
                                                <Text style={{ color: 'red' }}>{errors.admissionFee}</Text>
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

                                )
                            }
                                
                                }
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