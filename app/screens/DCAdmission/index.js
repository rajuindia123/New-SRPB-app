import { View, Text, ScrollView, Image, Modal, TouchableOpacity, BackHandler, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { styles } from '../../../styles/screens/DCAdmission';
import { Divider, RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CategorySelectListUpdate from '../../components/CategorySelectListUpdate';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Entypo from '@expo/vector-icons/Entypo';// Validation schemas for each step
// import RadioButton from 'react-native-paper';
import { districtData, SubjectOfferedData } from '../../../src/data';
import { getDocumentsById } from '../../Function/AppwriteCollection';
import { EnrollmentStudentsCollectionId } from '../../../src/appwriteAllid';
import Loader from '../../components/Loader';
import { updateFormData, resetFormData } from '../../redux/features/userInfoSlice';
import { updateInterData, updateMatricData, resetAcademicData } from '../../redux/features/educationalDetailsSlice';
import { saveBankDetails, resetBankDetails } from '../../redux/features/bankDetailsSlice';
import { savesubjectDetails, resetsubjectDetails } from '../../redux/features/subjectDetailsSlice';
import { saveFeeStructure, resetFeeStructure } from '../../redux/features/feeStructureSlice';
import { saveDocumentUpload, resetDocumentUpload } from '../../redux/features/documentUploadSlice';
import { useDispatch, } from 'react-redux';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AntDesign from '@expo/vector-icons/AntDesign';
const step1ValidationSchema = Yup.object().shape({
    candidateName: Yup.string().required('Full Name is required'),
    uan: Yup.string().required('UAN No. is required'),
    motherName: Yup.string().required('Mother`s Name is required'),
    fatherName: Yup.string().required('Father`s Name is required'),
    gander: Yup.string().required('Studenty Gander is required'),
    stuCategory: Yup.string().required('Category is required'),
    emailId: Yup.string().required('Student Email Id is required'),
    whatsappNo: Yup.string().required('WhatsApp No. is required'),
    mobNo: Yup.string().required('Mobile No. is required'),

    fatherOccupation: Yup.string().required('Father`s Occupation No. is required'),
    fatherMobNo: Yup.string().required('Father MobNo No. is required'),
    fatherAadhar: Yup.string().required('Father Aadhar No. is required'),
    motherOccupation: Yup.string().required('Mother`s  Occupation No. is required'),
    motherMobNo: Yup.string().required('Mother`s  Mobile No. is required'),
    motherAadhar: Yup.string().required('Mother`s  Aadhar No. is required'),
    stuAadharNo: Yup.string().required('Student Aadhar No. is required'),
    religion: Yup.string().required('Religion is required'),
    identiMark: Yup.string().required('Identification Mark is required'),
    bloodGroup: Yup.string().required('Student  Blood Group is required'),
    corAddress: Yup.string().required('Correspondence Address is required'),
    perAddress: Yup.string().required('Permanent Address is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    maritalStatus: Yup.string().required('Marital Status is required'),

});

const step2ValidationSchema = Yup.object().shape({
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

});

const step3ValidationSchema = Yup.object().shape({
    semester: Yup.string().required('Semester is required'),
    stream: Yup.string().required('Stream is required'),
    majorPaper: Yup.string().required('Major Paper is required'),
    mdcSubject: Yup.string().required('Multi Disciplinay Course is required'),
    micSubject: Yup.string().required('Minor Course is required'),
    extraSubject: Yup.string().required('Semster Course is required'),


});

const step4ValidationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank Name is required'),
    acHolderName: Yup.string().required('Account Holder Name is required'),
    accountNumber: Yup.string().required('Account No is required'),
    ifscNo: Yup.string().required('IFSC No is required'),
    branchName: Yup.string().required('Branch Name is required'),


});

const validationSchemaUpload = Yup.object().shape({
    matricResult: Yup.string().required('Matric Result Certificate is required'),
    matricProvisional: Yup.string().required('Matric Provisional Certificate is required'),
    interResult: Yup.string().required('Inter Result Certificate is required'),
    interProvisional: Yup.string().required('Inter Provisional Certificate is required'),
    interAdmitCard: Yup.string().required('Inter Admit Card is required'),
    interRegistrationCard: Yup.string().required('Inter Registration Card is required'),
    aadharCard: Yup.string().required('Student Aadhar Card is required'),
    fatherAadharCard: Yup.string().required('Father\'s Aadhar Card is required'),
    motherAadharCard: Yup.string().required('Mother\'s Aadhar Card is required'),
    casteCard: Yup.string().required('Caste Certificate is required'),
    incomeCard: Yup.string().required('Income Certificate is required'),
    residenceCard: Yup.string().required('Residence Certificate is required'),

    CLC: Yup.string().required('Original CLC is required'),
    TC: Yup.string().required('Original T.C. is required'),
    migration: Yup.string().required('Original Migration is required'),
    univCard: Yup.string().required('University Apply Card is required'),
    univRankCard: Yup.string().required('University Rank Card is required'),
    photo: Yup.string().required('Passport Size Photo is required'),
    signature: Yup.string().required('signature Photo is required'),

});


const feeStructure = {
    I: { admissionFee: 350, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 100, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 50, practical: 600, total: 2855 },
    II: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 600, total: 2605 },
    III: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 0, total: 2005 },
    IV: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 0, total: 2005 },
    V: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 0, total: 2005 },
    VI: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 0, total: 2005 },
    VII: { admissionFee: 250, tuitionFee: 600, culturalTarang: 25, library: 200, electricityFee: 200, identityCard: 0, nssFee: 50, buildingMaintainsFund: 100, medicalFee: 100, athleticsFund: 100, commonRoomFund: 50, coCurricularFee: 50, environmentalProtectionFee: 50, studentWelfareFee: 30, studentUnionFee: 100, societySubscription: 50, magazineFund: 50, handbook: 0, practical: 0, total: 2005 },
};

const data = [
    { key: '1', value: 'I' },
    { key: '2', value: 'II' },
    { key: '3', value: 'III' },
    { key: '4', value: 'IV' },
    { key: '5', value: 'V' },
    { key: '6', value: 'VI' },
    { key: '7', value: 'VII' },
    { key: '8', value: 'VIII' },
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

const ACAdmission = () => {
    const scrollViewRef = useRef(null);
    const dispatch = useDispatch();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Select Date Of Birth");
    const [value, setValue] = React.useState('');
    const [selected, setSelected] = React.useState("");
    const [text, onChangeText] = React.useState('');
    const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility state
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutionDistricts, seInstitutionDistricts] = useState([]);
    const [interInstitutionDistricts, seInterInstitutionDistricts] = useState([]);
    const [subject, setSubject] = useState([]);
    const [mdcSubject, setMdcSubject] = useState([]);
    const totalSteps = 8;
    const [section, setSection] = useState("-")
    const [studentData, setStudentData] = useState(null)
    const [search, onSearchText] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    // const[studentUAN,setStudentUAN]=useState()
    const parts = section.split("-");


    const [error, setError] = useState(false)
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



    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCompletedSteps((prev) => [...prev, currentStep]); // Mark current step as completed
            setCurrentStep(currentStep + 1); // Move to the next step
            // Scroll to the top
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    };

    const handlePreviousStep = () => {
        // console.log("currentStep",currentStep)
        if (currentStep > 1) {
            setCompletedSteps((prev) => prev.filter((step) => step !== currentStep - 1)); // Remove the previous step from completed
            setCurrentStep(currentStep - 1); // Move to the previous step
            // Scroll to the top
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    };



    const handleCloseModal = async () => {

        // console.log("selected",selected)
        setLoading(true);
        try {
            const result = await getDocumentsById(EnrollmentStudentsCollectionId, "stuUAN", search.trim());
            if (result.length == 0) {
                // console.log("object")
                setError("Student UAN No. Not Found  Please Check UAN No")
            } else {
                console.log(result)
                setStudentData(result[0])
                setSelectedDate(result[0]?.stuDOB || ''); // Set the date if present
                setSection(result[0].stuSession)
                onSearchText(result[0].stuUAN)
                setIsModalVisible(false);
                dispatch(resetFormData());
                dispatch(resetsubjectDetails());
                dispatch(resetBankDetails());
                dispatch(resetAcademicData());
                dispatch(resetFeeStructure());
                dispatch(resetDocumentUpload());
            }

        } catch (error) {
            console.error("Error fetching student:", error);
        } finally {
            setLoading(false);
            // Close the modal
        }








    };

    useEffect(() => {
        const checkLoginStatus = async () => {

            const stuUAN = await AsyncStorage.getItem("studentUAN");
            if (stuUAN) {
                onSearchText(stuUAN)
            }
        };
        checkLoginStatus();
        // Optional: Add logic if needed when the modal is shown/closed
    }, []);
    const stateStudentData = useSelector((state) => state.userInfo.studentData);
    const stateEducationDetailsMatic = useSelector((state) => state.educationalDetails.matric);
    const stateEducationDetailsInter = useSelector((state) => state.educationalDetails.inter);
    const stateSubjectData = useSelector((state) => state.subjectDetails);
    const stateBankData = useSelector((state) => state.bankDetails);
    const stateFeeData = useSelector((state) => state.feeStructure);
    const stateDocumenyUploadData = useSelector((state) => state.documentUpload);



    // const stateStudentData = useSelector((state) => state.userInfo.studentData);
    const isFemale = stateStudentData?.gander === "Female";
    // console.log("isFemale",stateStudentData?.gander)
    const isMaleSCorST = stateStudentData?.gander === "Male" &&
        (stateStudentData?.stuCategory === "SC" || stateStudentData?.stuCategory === "ST");

    const initialValues = {
        admissionFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.admissionFee || 0,
        tuitionFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.tuitionFee || 0,
        culturalTarang: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.culturalTarang || 0,
        library: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.library || 0,
        electricityFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.electricityFee || 0,
        identityCard: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.identityCard || 0,
        nssFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.nssFee || 0,
        buildingMaintainsFund: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.buildingMaintainsFund || 0,
        medicalFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.medicalFee || 0,
        athleticsFund: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.athleticsFund || 0,
        commonRoomFund: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.commonRoomFund || 0,
        coCurricularFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.coCurricularFee || 0,
        environmentalProtectionFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.environmentalProtectionFee || 0,
        studentWelfareFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.studentWelfareFee || 0,
        studentUnionFee: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.studentUnionFee || 0,
        societySubscription: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.societySubscription || 0,
        magazineFund: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.magazineFund || 0,
        handbook: isFemale || isMaleSCorST ? 0 : feeStructure[stateSubjectData?.semester]?.handbook || 0,
        practical: isFemale || isMaleSCorST ? 0 : (
            stateSubjectData?.stream === "Science" ||
            (stateSubjectData?.stream === "Arts" &&
                ["Philosophy", "Home Science", "Geography"].includes(stateSubjectData?.majorPaper))
        ) ? 600 : 0,
    };

    // Calculate total fee
    initialValues.total = Object.values(initialValues).reduce((sum, value) => sum + (typeof value === 'number' ? value : 0), 0);

    // console.log("admissionFee123",studentData)
    // console.log(search)



    const pickDocument = async (setFieldValue, fieldName) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Restrict to PDF files
                copyToCacheDirectory: true,
            });

            if (result.canceled === false) {
                // console.log('File picked:', result);

                // Set file size limit to 200 KB
                const sizeLimit = 200 * 1024; // 200 KB in bytes
                if (result.assets[0].size > sizeLimit) {
                    Alert.alert(
                        "File Too Large",
                        `The selected file is too large. Please select a file smaller than ${sizeLimit / 1024} KB.`
                    );
                    return; // Stop further processing
                }

                const newItem = { id: items.length + 1, name: result.assets[0].name, fieldName: fieldName };
                setFieldValue(fieldName, result.assets[0].uri);
                setItems((prevItems) => {
                    // Remove any existing item with the same fieldName
                    const filteredItems = prevItems.filter(item => item.fieldName !== fieldName);
                    // Add the new item
                    return [...filteredItems, newItem];
                });
            } else {
                console.log('Document picking canceled');
            }
        } catch (error) {
            console.error('Error picking document:', error);
            Alert.alert("Error", "An error occurred while picking the document.");
        }
    };

    const pickImage = async (setFieldValue, fieldName) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                const uri = result.assets[0].uri;

                // Get file info to check the size
                const fileInfo = await FileSystem.getInfoAsync(uri);
                const fileSize = fileInfo.size;

                // Set size limits (20 KB to 50 KB)
                const minSizeLimit = 20 * 1024; // 20 KB in bytes
                const maxSizeLimit = 50 * 1024; // 50 KB in bytes

                if (fileSize < minSizeLimit || fileSize > maxSizeLimit) {
                    Alert.alert(
                        "Invalid File Size",
                        `Please select an image between ${minSizeLimit / 1024} KB and ${maxSizeLimit / 1024} KB.`
                    );
                    return; // Stop further processing
                }

                const newItem = {
                    id: items.length + 1,
                    name: uri.split('/').pop(), // Extract file name from URI
                    fieldName: fieldName
                };

                setImage(uri);
                setFieldValue(fieldName, uri);
                setItems((prevItems) => {
                    // Remove any existing item with the same fieldName
                    const filteredItems = prevItems.filter(item => item.fieldName !== fieldName);
                    // Add the new item
                    return [...filteredItems, newItem];
                });
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert("Error", "An error occurred while picking the image.");
        }
    };
    // console.log("stateDocumenyUploadData", stateDocumenyUploadData)
    return (
        loading ? <Loader /> :
            <View style={styles.container}>
                {/* Modal */}
                <Modal
                    transparent={true}
                    visible={isModalVisible}
                    animationType="fade"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}>
                        <View style={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 20,
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.closeIcon}><AntDesign name="closecircleo" size={28} color="black" /></TouchableOpacity>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                                Welcome To The SRPB Admission Form
                            </Text>
                            <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20, textAlign: "center" }}>
                                Please confirm to proceed to the admission form.
                            </Text>

                            <View style={{ width: '100%' }}>
                                <CustomInput
                                    title="UAN No."
                                    required={true}
                                    onChangeText={(text) => { onSearchText(text), setError("") }}
                                    // onChangeText={onSearchText}
                                    values={search}
                                    editable={false}
                                    placeholder="Enter Student UAN No."
                                    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                    keyboardType={'default'}
                                    badgeStyles={styles.badge}
                                />
                                {error && (<Text style={{ color: 'red', fontSize: 10, marginTop: 10 }}>{error}</Text>)}
                            </View>
                            {/* <View style={{ width: '100%' }}>
                            <CategorySelectList
                                label="Select Semester"
                                data={data}
                                selectedValue={selected}
                                onSelect={(val) => setSelected(val)} // Handle selection update
                                search={false}
                            />
                        </View> */}

                            <View style={{ width: '100%' }}>
                                <CustomButton
                                    buttonStyle={styles.buttonStyle}
                                    buttonStyleText={styles.buttonStyleText}
                                    children={'Proceed'}
                                    onClick={handleCloseModal}
                                />
                            </View>

                        </View>
                    </View>
                </Modal>

                <View style={styles.topSection}>
                    <View style={styles.containerTop}>
                        <View style={styles.logoView}>
                            <Image
                                source={require("../../../assets/images/cropped_image.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.header1}>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>SRPB DEGREE COLLEGE OF EDUCATION</Text>
                            </View>
                        </View>
                        <View style={styles.logoView}>
                            <Image
                                source={require("../../../assets/images/purneaLogo.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.headerView2}>
                            <Text style={styles.headerText2}>SRPB Admission Form</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.stepNavigation}>
                    <Text style={styles.stepLabel}>Step {currentStep} of {totalSteps-1}</Text>
                    <View style={styles.progressBar}>
                        {[...Array(totalSteps-1)].map((_, index) => {
                            const stepNumber = index + 1;
                            return (
                                <View
                                    key={stepNumber}
                                    style={[
                                        styles.progressStep,
                                        stepNumber <= currentStep ? styles.activeStep : styles.inactiveStep,
                                    ]}
                                >
                                    {completedSteps.includes(stepNumber) ? (
                                        <Entypo name="check" size={15} color="#fff" />
                                    ) : (
                                        <Text style={styles.currentStepText}>
                                            {stepNumber === currentStep ? stepNumber : ''}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>




                <ScrollView style={styles.container} ref={scrollViewRef}>
                    {/* Step Navigation */}

                    {/* {console.log("studentData",studentData)} */}
                    {/* Formik Form */}
                    {currentStep === 1 && (
                        <Formik
                            initialValues={{
                                candidateName: studentData?.stuName || '',
                                uan: studentData?.stuUAN || '',
                                motherName: studentData?.stuMotherName || '',
                                fatherName: studentData?.stuFatherName || '',
                                gander: studentData?.stuGender || '',
                                emailId: stateStudentData.emailId || '',
                                whatsappNo: stateStudentData.whatsappNo || '',
                                mobNo: stateStudentData.mobNo || '',
                                stuAadharNo: stateStudentData.stuAadharNo || '',
                                motherAadhar: stateStudentData.motherAadhar || '',
                                motherOccupation: stateStudentData.motherOccupation || '',
                                fatherAadhar: stateStudentData.fatherAadhar || '',
                                fatherMobNo: stateStudentData.fatherMobNo || '',
                                fatherOccupation: stateStudentData.fatherOccupation || '',
                                motherMobNo: stateStudentData.motherMobNo || '',
                                religion: stateStudentData.religion || '',
                                identiMark: stateStudentData.identiMark || '',
                                bloodGroup: stateStudentData.bloodGroup || '',
                                corAddress: stateStudentData.corAddress || '',
                                perAddress: stateStudentData.perAddress || '',
                                state: stateStudentData.state || '',
                                district: stateStudentData.district || '',
                                maritalStatus: stateStudentData.maritalStatus || '',
                                stuCategory: studentData?.stuCategory || ''


                            }}
                            validationSchema={step1ValidationSchema}
                            onSubmit={(values) => {
                                const data = {
                                    candidateName: values.candidateName,
                                    uan: values.uan,
                                    motherName: values.motherName,
                                    fatherName: values.fatherName,
                                    gander: values.gander,
                                    emailId: values.emailId,
                                    whatsappNo: values.whatsappNo,
                                    mobNo: values.mobNo,
                                    stuAadharNo: values.stuAadharNo,
                                    motherAadhar: values.motherAadhar,
                                    motherOccupation: values.motherOccupation,
                                    fatherAadhar: values.fatherAadhar,
                                    fatherMobNo: values.fatherMobNo,
                                    fatherOccupation: values.fatherOccupation,
                                    motherMobNo: values.motherMobNo,
                                    religion: values.religion,
                                    identiMark: values.identiMark,
                                    bloodGroup: values.bloodGroup,
                                    corAddress: values.corAddress,
                                    perAddress: values.perAddress,
                                    state: values.state,
                                    district: values.district,
                                    maritalStatus: values.maritalStatus,
                                    stuCategory: values.stuCategory,
                                }


                                dispatch(updateFormData(data));



                                console.log('Step 1 Values:', values);
                                handleNextStep();
                            }}
                        >
                            {({


                                setFieldValue,

                                handleChange, handleBlur, handleSubmit, values, errors, touched
                            }) => (
                                <View>
                                    <Text style={styles.header}> Basic Information</Text>
                                    <Text style={styles.slNo}>Sl.No:- {'690'}</Text>
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
                                    </View>

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


                                    <Text style={styles.label}>
                                        Student Gender.<Text style={styles.badge}>*</Text>

                                    </Text>
                                    {/* {console.log("values.gander",values.gander)} */}
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
                                    <Text style={[styles.label, { marginTop: 10 }]}>
                                        Select DOB.<Text style={styles.badge}>*</Text>
                                    </Text>
                                    <TouchableOpacity style={styles.dateOfBirthPikerView} >
                                        <Text style={styles.textDateTimePiker}>{selectedDate}</Text>
                                    </TouchableOpacity>


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



                                    <CategorySelectListUpdate
                                        label="Select Religion"
                                        data={ReligionData}
                                        selectedValue={values.religion}
                                        onSelect={(val) => setFieldValue('religion', val)}
                                        search={false}
                                        required={true}
                                    />







                                    {/* <CategorySelectList
                                        label="Select Religion"
                                        data={ReligionData}
                                        selectedValue={values.religion}
                                        onSelect={(val) => setFieldValue('religion', val)}
                                        search={false}
                                        required={true}
                                    />
                                    {touched.religion && errors.religion && (
                                        <Text style={{ color: 'red' }}>{errors.religion}</Text>
                                    )} */}





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
                                    <CategorySelectListUpdate
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



                                    <CategorySelectListUpdate
                                        label="Select Marital Status"
                                        data={MaritalStatusData}
                                        selectedValue={values.maritalStatus}
                                        onSelect={(val) => setFieldValue('maritalStatus', val)}
                                        search={false}
                                        required={true}
                                    />
                                    {touched.maritalStatus && errors.maritalStatus && (
                                        <Text style={{ color: 'red' }}>{errors.maritalStatus}</Text>
                                    )}


                                    {/* <Text style={[styles.labelsStyle, { marginTop: 10 }]}>
                                        Correspondence Full Address:At.<Text style={styles.badge}>*</Text>

                                    </Text> */}

                                    <View style={styles.inputView}>
                                        <CustomInput
                                            title="Correspondence Address:At"
                                            required={true}
                                            onChangeText={handleChange('corAddress')}
                                            onBlur={handleBlur('corAddress')}
                                            values={values.corAddress}
                                            placeholder="Enter Correspondence Address:At"
                                            labelsStyle={styles.labelsStyle}
                                            inputStyle={styles.textarea}
                                            keyboardType="default"
                                            badgeStyles={styles.badge}
                                            editable={true}
                                            numberOfLines={4}
                                        />


                                        {touched.corAddress && errors.corAddress && (
                                            <Text style={{ color: 'red' }}>{errors.corAddress}</Text>
                                        )}

                                    </View>





                                    <View style={styles.inputView}>

                                        <CustomInput
                                            title="Permanent Address:At"
                                            required={true}
                                            onChangeText={handleChange('perAddress')}
                                            onBlur={handleBlur('perAddress')}
                                            values={values.perAddress}
                                            placeholder="Enter Permanent Address:At"
                                            labelsStyle={styles.labelsStyle}
                                            inputStyle={styles.textarea}
                                            keyboardType="default"
                                            badgeStyles={styles.badge}
                                            editable={true}
                                            numberOfLines={4}
                                        />






                                        {/* <TextInput
                                            style={styles.textarea}
                                            multiline={true}
                                            numberOfLines={4}
                                            
                                            onChangeText={handleChange('perAddress')}
                                            onBlur={handleBlur('perAddress')}
                                            values={values.perAddress}
                                        /> */}
                                        {touched.perAddress && errors.perAddress && (
                                            <Text style={{ color: 'red' }}>{errors.perAddress}</Text>
                                        )}

                                    </View>








                                    <CategorySelectListUpdate
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





                                    <CategorySelectListUpdate
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



                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20 }}>

                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>

                                    </View>

                                </View>
                            )}
                        </Formik>
                    )}

                    {currentStep === 2 && (
                        <Formik
                            initialValues={{
                                matricBoardName: stateEducationDetailsMatic.matricBoardName || '',
                                matricPassingYear: stateEducationDetailsMatic.matricPassingYear || '',
                                matriRollNo: stateEducationDetailsMatic.matriRollNo || '',
                                matricRollCode: stateEducationDetailsMatic.matricRollCode || '',
                                matricMarks: stateEducationDetailsMatic.matricMarks || '',
                                matricPercentage: stateEducationDetailsMatic.matricPercentage || '',
                                matricInstitutionCode: stateEducationDetailsMatic.matricInstitutionCode || '',
                                institutionState: stateEducationDetailsMatic.institutionState || '',
                                institutionDistrict: stateEducationDetailsMatic.institutionDistrict || '',

                                interBoardName: stateEducationDetailsInter.interBoardName || '',
                                interPassingYear: stateEducationDetailsInter.interPassingYear || '',
                                interRollNo: stateEducationDetailsInter.interRollNo || '',
                                interRollCode: stateEducationDetailsInter.interRollCode || '',
                                interMarks: stateEducationDetailsInter.interMarks || '',
                                interPercentage: stateEducationDetailsInter.interPercentage || '',
                                interInstitutionCode: stateEducationDetailsInter.interInstitutionCode || '',
                                interCLCNo: stateEducationDetailsInter.interCLCNo || '',
                                interTCNo: stateEducationDetailsInter.interTCNo || '',
                                interCLCTCIssueDate: stateEducationDetailsInter.interCLCTCIssueDate || '',
                                interMigrationNo: stateEducationDetailsInter.interMigrationNo || '',
                                interMigrationIssueDate: stateEducationDetailsInter.interMigrationIssueDate || '',
                                interInstitutionState: stateEducationDetailsInter.interInstitutionState || '',
                                interInstitutionDistrict: stateEducationDetailsInter.interInstitutionDistrict || '',
                            }}
                            validationSchema={step2ValidationSchema}
                            onSubmit={(values) => {
                                console.log('Step 2 Values:', values);
                                const dataMatic = {
                                    matricBoardName: values.matricBoardName,
                                    matricPassingYear: values.matricPassingYear,
                                    matriRollNo: values.matriRollNo,
                                    matricRollCode: values.matricRollCode,
                                    matricMarks: values.matricMarks,
                                    matricPercentage: values.matricPercentage,
                                    matricInstitutionCode: values.matricInstitutionCode,
                                    institutionState: values.institutionState,
                                    institutionDistrict: values.institutionDistrict,

                                }
                                const dataInter = {
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
                                    interInstitutionDistrict: values.interInstitutionDistrict,
                                }
                                dispatch(updateMatricData(dataMatic));
                                dispatch(updateInterData(dataInter));
                                handleNextStep();
                            }}
                        >
                            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <Text style={styles.header}>Details Of Educational Qualification </Text>


                                    <Text style={styles.headerMatric}>Matric/10th Details</Text>

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





                                    <CategorySelectListUpdate
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

                                    <CategorySelectListUpdate
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


                                    <Text style={styles.headerMatric}>Inter/12th Details</Text>

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





                                    <CategorySelectListUpdate
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

                                    <CategorySelectListUpdate
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


                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>

                                    </View>
                                </View>
                            )}
                        </Formik>
                    )}

                    {currentStep === 3 && (
                        <Formik
                            initialValues={{
                                semester: stateSubjectData.semester || '',
                                stream: stateSubjectData.stream || '',
                                majorPaper: stateSubjectData.majorPaper || '',
                                mdcSubject: stateSubjectData.mdcSubject || '',
                                micSubject: stateSubjectData.micSubject || '',
                                extraSubject: stateSubjectData.extraSubject || '',
                                vacSubject: studentData?.stuVAC || '',
                                secSubject: studentData?.stuSEC || ''

                            }}
                            validationSchema={step3ValidationSchema}
                            onSubmit={(values) => {



                                dispatch(savesubjectDetails(values));

                                console.log('Step 3 Values:', values);

                                handleNextStep();
                            }}
                        >
                            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <Text style={styles.header}>Subject Details</Text>

                                    <CategorySelectListUpdate
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

                                    <CategorySelectListUpdate
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

                                    <CategorySelectListUpdate
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






                                    <CategorySelectListUpdate
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


                                    <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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
                                            <CategorySelectListUpdate
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






                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>

                                    </View>

                                </View>
                            )}
                        </Formik>
                    )}

                    {currentStep === 4 && (
                        <Formik
                            initialValues={{

                                bankName: stateBankData.bankName,
                                acHolderName: stateBankData.acHolderName,
                                accountNumber: stateBankData.accountNumber,
                                ifscNo: stateBankData.ifscNo,
                                branchName: stateBankData.branchName,


                            }}
                            validationSchema={step4ValidationSchema}
                            onSubmit={(values) => {
                                dispatch(saveBankDetails(values));
                                console.log('Step 4 Values:', values);
                                handleNextStep();
                                // alert('Form submitted!');
                            }}
                        >
                            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <Text style={styles.header}>Bank Details</Text>

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





                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>

                                    </View>



                                    {/* <Button title="Submit" onPress={handleSubmit} /> */}
                                </View>
                            )}
                        </Formik>
                    )}


                    {currentStep === 5 && (


                        <Formik
                            initialValues={initialValues}


                            onSubmit={(values) => {
                                dispatch(saveFeeStructure(values));
                                console.log('Step 4 Values:', values);
                                handleNextStep();
                                // alert('Form submitted!');
                            }}
                        >
                            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <Text style={styles.header}>Fee Structure</Text>
                                    {/* <CustomInput
                                            title="Branch Name"
                                            required={true}
                                            onChangeText={handleChange('branchName')}
                                            onBlur={handleBlur('branchName')}
                                            values={initialValues.admissionFee.toString()}
                                            placeholder="Enter Branch Name."
                                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                            keyboardType={'default'}
                                            badgeStyles={styles.badge}
                                        /> */}



                                    {Object.keys(initialValues).map((key) => (
                                        <View style={styles.inputView} key={key}>
                                            {/* {console.log(key,values[key])} */}
                                            <CustomInput
                                                title={key.replace(/([A-Z])/g, ' $1') // Split camelCase or PascalCase
                                                    .trim() // Remove any leading/trailing spaces
                                                    .replace(/\b\w/g, char => char.toUpperCase())}
                                                required={true}
                                                onChangeText={handleChange(key)}
                                                onBlur={handleBlur(key)}
                                                values={String(values[key])} // Correct prop name for the current value
                                                placeholder={`Enter ${key}`}
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                        </View>
                                    ))}

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>

                                    </View>



                                    {/* <Button title="Submit" onPress={handleSubmit} /> */}
                                </View>
                            )}
                        </Formik>


                    )}

                    {currentStep === 6 && (
                        <Formik
                            initialValues={{
                                matricResult: stateDocumenyUploadData.matricResult || '',
                                matricProvisional: stateDocumenyUploadData.matricProvisional || '',
                                interResult: stateDocumenyUploadData.interResult || '',
                                interProvisional:stateDocumenyUploadData.interProvisional || '',
                                interAdmitCard: stateDocumenyUploadData.interAdmitCard || '',
                                interRegistrationCard: stateDocumenyUploadData.interRegistrationCard ||'',
                                aadharCard: stateDocumenyUploadData.aadharCard || '',
                                fatherAadharCard: stateDocumenyUploadData.fatherAadharCard || '',
                                motherAadharCard: stateDocumenyUploadData.motherAadharCard || '',
                                casteCard: stateDocumenyUploadData.casteCard || '',
                                incomeCard: stateDocumenyUploadData.incomeCard,
                                residenceCard: stateDocumenyUploadData.residenceCard,
                                photo: stateDocumenyUploadData.photo || '',
                                CLC: stateDocumenyUploadData.CLC || '',
                                TC: stateDocumenyUploadData.TC || '',
                                migration: stateDocumenyUploadData.migration || '',
                                univCard: stateDocumenyUploadData.univCard || '',
                                univRankCard: stateDocumenyUploadData.univRankCard || '',
                                signature: stateDocumenyUploadData.signature || ''
                            }}
                            validationSchema={validationSchemaUpload}
                            onSubmit={(values) => {
                                console.log('Form values: 6', values);
                                dispatch(saveDocumentUpload(values));
                                handleNextStep();
                                // Navigate to Success Payment Page
                                // router.push('/screens/SuccessPaymentPage/');
                            }}
                        >
                            {({ handleSubmit, setFieldValue, errors, touched, values }) => (
                                <View style={{ paddingLeft: 4, paddingRight: 4, paddingTop: 30 }} >
                                    <Text style={styles.header}>Upload Documants</Text>
                                    <Text style={[styles.error, { textAlign: 'center' }]}>All PDF files are uploaed max size limit 200KB</Text>
                                    <Text style={[styles.error, { textAlign: 'center' }]}>All Image files are uploaed between 20KB to 50KB</Text>

                                    {/* Form Fields */}
                                    {Object.keys(validationSchemaUpload.fields).map((fieldName, index) => {
                                        const matchedItem = items?.find(item => item?.fieldName === fieldName);

                                        return (
                                            <View key={index}>
                                                <Text style={[styles.label, { marginBottom: 5 }]}>
                                                    {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} {fieldName == "photo" || fieldName == "signature" ? "Image" : "Pdf "}<Text style={styles.badge}>*</Text>

                                                </Text>
                                                {/* {console.log("fieldName",fieldName)} */}
                                                <TouchableOpacity style={styles.fileUploadView} onPress={fieldName == "photo" || fieldName == "signature" ? () => pickImage(setFieldValue, fieldName) : () => pickDocument(setFieldValue, fieldName)}>
                                                    <View style={styles.ImageSection}>
                                                        <Image
                                                            source={require("../../../assets/images/Add-files-cuate.png")}
                                                            style={styles.logo}
                                                            resizeMode="contain"
                                                        />
                                                    </View>
                                                    <Text style={[styles.textStyles,
                                                    matchedItem && matchedItem.name && { color: '#000' }]}>
                                                        {matchedItem && matchedItem.name && matchedItem.name}
                                                        {!matchedItem && "Click & Upload"}
                                                    </Text>
                                                </TouchableOpacity>
                                                {touched[fieldName] && errors[fieldName] && <Text style={styles.error}>{errors[fieldName]}</Text>}


                                                {fieldName == "photo" && values[fieldName] && (


                                                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            source={{ uri: values[fieldName] }}
                                                            resizeMode='stretch'
                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                    </View>
                                                )}

                                                {fieldName == "signature" && values[fieldName] && (


                                                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            source={{ uri: values[fieldName] }}
                                                            resizeMode='stretch'
                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                    </View>
                                                )}

                                                {/* {matchedItem && matchedItem.name && <Text>{matchedItem.name}</Text>} */}
                                            </View>
                                        )
                                    }
                                    )}

                                    {/* Buttons */}
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={handleSubmit} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    )}

                    {currentStep === 7 && (
                      
                        <Formik
                            initialValues={initialValues}


                            onSubmit={(values) => {
                                const totalFee=values.total
                                console.log("totalFee",totalFee)
                                console.log("stateStudentData",stateStudentData)
                            console.log("stateEducationDetailsMatic",stateEducationDetailsMatic)
                            console.log("stateEducationDetailsInter",stateEducationDetailsInter)
                            console.log("stateSubjectData",stateSubjectData)
                            console.log("stateBankData",stateBankData)
                            console.log("stateFeeData",stateFeeData)
                            console.log("stateDocumenyUploadData",stateDocumenyUploadData)

                                // dispatch(saveFeeStructure(values));
                                // console.log('Step 4 Values:', values);
                                // handleNextStep();
                                // alert('Form submitted!');
                            }}
                        >
                            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                       

                               <Text style={[styles.header,{color:'red'}]}>Please Check All The previous Fields Before You Submit</Text>

                
                                    <Text style={styles.header}>Fee Structure</Text>
                                   



                                    {Object.keys(initialValues).map((key) => (
                                        <View style={styles.inputView} key={key}>
                                            {/* {console.log(key,values[key])} */}
                                            <CustomInput
                                                title={key.replace(/([A-Z])/g, ' $1') // Split camelCase or PascalCase
                                                    .trim() // Remove any leading/trailing spaces
                                                    .replace(/\b\w/g, char => char.toUpperCase())}
                                                required={true}
                                                onChangeText={handleChange(key)}
                                                onBlur={handleBlur(key)}
                                                values={String(values[key])} // Correct prop name for the current value
                                                placeholder={`Enter ${key}`}
                                                labelsStyle={styles.labelsStyle}
                                                inputStyle={styles.inputStyle}
                                                keyboardType={'default'}
                                                badgeStyles={styles.badge}
                                                editable={false}
                                            />
                                        </View>
                                    ))}

{stateFeeData.total == 0 &&(<Text style={[styles.header,{marginTop:10,marginBottom:5}]}>You Are Eligible For Free Admission.</Text>)}

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyleBack} buttonStyleText={styles.buttonStyleTextBack} children={'Back'} onClick={handlePreviousStep} />
                                        </View>
                                        <View style={{ width: '48%' }}>
                                            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={stateFeeData.total == 0 ? 'Submit' : `₹${stateFeeData.total} Pay`} onClick={handleSubmit} />
                                        </View>

                                    </View>



                                    {/* <Button title="Submit" onPress={handleSubmit} /> */}
                                </View>
                            )}
                        </Formik>






                    )}

                    {/* Step Navigation Buttons */}
                    {/* <View style={styles.buttonContainer}>
                    {currentStep > 1 && <Button title="Back" onPress={handlePreviousStep} />}
                </View> */}
                </ScrollView>



            </View>
    );
};

export default ACAdmission;
