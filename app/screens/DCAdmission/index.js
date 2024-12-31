import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../../styles/screens/DCAdmission'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Divider, RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
const ACAdmission = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Select Date Of Birth");
    const [value, setValue] = React.useState('');
    const [selected, setSelected] = React.useState("");
    const [text, onChangeText] = React.useState('');

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

    // useEffect(() => {
    //     // Function to handle the back button press
    //     const backAction = () => {
    //       // Navigate to the home page using expo-router
    //       router.push("/"); // Ensure "/" is the correct route to navigate home
    //       return true; // Prevent the default back action
    //     };

    //     // Add event listener for back button press
    //     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    //     // Cleanup: Remove event listener when the component is unmounted
    //     return () => {
    //       backHandler.remove(); // Use remove() to clean up the event listener
    //     };
    //   }, [router]);
    console.log("selected", selected)
    return (
        <ScrollView style={{ backgroundColor: "#fff", marginBottom: 20 }}>
            <View style={styles.container}>

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
                                <Text style={styles.headerText}>SRPB DEGREE COLLEGE OF EDUCTION</Text>
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

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <View >

                            <Text style={styles.subHeaderText}>SUNRISE PUNAM BIRENDRA DEGREE COLLEGE OF EDUCATION</Text>
                            <View style={styles.headerView2}>
                                <Text style={styles.headerText2}>Run Under : GM Educational Trust</Text>
                            </View>
                            <Text style={styles.subHeaderAddressText}>Geeta Bhubneshwar Nagar, Vishwaspur, Mahthour, Dagarua-854326, Purnea</Text>

                            <Text style={styles.subHeaderAddressText2}>Affiliated by Higher Education Department, Govt. of Bihar & a Unit of Purnea University, Purnea</Text>

                        </View>
                    </View>

                </View>






                <View style={styles.formContent}>
                    <Text style={styles.slNo}>Sl.No:- {'690'}</Text>

                    <View style={[styles.inputView, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                        <View style={{ width: '100%' }}>
                            <CustomInput
                                title="UAN No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Student UAN No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View>


                    </View>


                    <View>
                        <Text style={styles.label}>
                            Session. <Text style={styles.badge}>*</Text>
                        </Text>
                        <View style={styles.sessionView}>
                            <View style={styles.datePikerView} >
                                <Text style={styles.textDateTimePiker}>{"2024"}</Text>
                            </View>
                            <Text style={styles.labelTo}>To</Text>
                            <View style={styles.datePikerView}>
                                <Text style={styles.textDateTimePiker}>{"2027"}</Text>
                            </View>
                        </View>
                        <Text style={styles.label}>
                            Select Stream.<Text style={styles.badge}>*</Text>

                        </Text>


                        <View >

                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.groupData}>


                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>ARTS</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>SCIENCE</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="third" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>COMMERCE</Text>

                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <CategorySelectList
                            label="Select Semester"
                            data={data}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                        />

                        <View>
                            <CustomInput
                                title="Major (Hons) Paper"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Major (Hons) Paper"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View>


                    </View>


                    <View style={{ marginTop: 15, paddingRight: 10 }}>
                        <View style={styles.inputView}>

                            <CustomInput
                                title="Name Of The Candidate"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Name Of The Candidate"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>
                        <View style={styles.inputView}>

                            <CustomInput
                                title="Father`s Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Father`s Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mother`s Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mother`s Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>
                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mobile No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mobile No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'phone-pad'}
                                badgeStyles={styles.badge}
                            />

                        </View>


                        <View style={styles.inputView}>

                            <CustomInput
                                title="WhatsApp No"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Enter WhatsApp No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'phone-pad'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Email Id"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Enter Email Id"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'email-address'}
                                badgeStyles={styles.badge}
                            />

                        </View>
                        <CategorySelectList
                            label="Select Religion"
                            data={ReligionData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                            required={false}
                        />



                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select DOB.<Text style={styles.badge}>*</Text>
                        </Text>
                        <TouchableOpacity style={styles.dateOfBirthPikerView} onPress={showDatePicker} >
                            <Text style={styles.textDateTimePiker}>{selectedDate}</Text>
                        </TouchableOpacity>


                        <CategorySelectList
                            label="Select Blood Group"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                            required={false}
                        />

                        <Text style={[styles.label, { marginTop: 0 }]}>
                            Select Gender.<Text style={styles.badge}>*</Text>

                        </Text>


                        <View >

                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.groupDataGender}>



                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Male</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Female</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="third" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Others</Text>

                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>


                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select Marital Status.<Text style={styles.badge}>*</Text>

                        </Text>


                        <View >

                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.groupDataGender}>



                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Single</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Married</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="third" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Widowed</Text>

                                    </View>

                                </View>
                                <View style={styles.groupDataGender}>





                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="third" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Divorced</Text>

                                    </View>

                                </View>
                            </RadioButton.Group>
                        </View>


                        <View style={styles.inputView}>

                            <CustomInput
                                title="Aadhar Number"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Aadhar Number"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Father`s Aadhar Number"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Father`s Aadhar Number"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mother`s Aadhar Number"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mother`s Aadhar Number"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mother`s Occupation"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mother`s Occupation"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mother`s Mobile No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mother`s Mobile Number"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Father`s Occupation"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Father`s Occupation."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>


                        <View style={styles.inputView}>

                            <CustomInput
                                title="Father`s Mobile No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Father`s Mobile Number"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>




                        <View style={styles.inputView}>

                            <CustomInput
                                title="Caste"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Caste"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Identification Marks"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Identification Marks"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

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
                                value={text}
                                onChangeText={onChangeText}
                            />


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
                                value={text}
                                onChangeText={onChangeText}
                            />


                        </View>



                        <View style={styles.inputView}>

                            <CustomInput
                                title="Bank Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Bank Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="A/C Holder"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Bank Holder Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Account No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Account No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="IFSC No"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter IFSC No"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Branch Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Branch Name."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>



                        <CategorySelectList
                            label="Select State"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />


                        <CategorySelectList
                            label="Select District"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />

                    </View>


                    <Divider style={{ marginTop: 10 }} />

                    <Text style={styles.info}>Details Of Educational Qualification </Text>

                    <Divider style={{ marginTop: 10 }} />
                    <Text style={styles.info2}>Matric/10th Details</Text>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Board Name"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Board Name."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>
                    <View style={styles.inputView}>

                        <CustomInput
                            title="Passing Year"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Passing Year."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Roll No"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Roll No."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Roll Code"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Roll Code."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Marks"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Marks."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="%AGE"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter %AGE."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>
                    <CategorySelectList
                        label="Select Institution State"
                        data={BloodGroupData}
                        selectedValue={selected}
                        onSelect={(val) => setSelected(val)} // Handle selection update
                        search={true}
                        required={true}
                    />


                    <CategorySelectList
                        label="Select Institution District"
                        data={BloodGroupData}
                        selectedValue={selected}
                        onSelect={(val) => setSelected(val)} // Handle selection update
                        search={true}
                        required={true}
                    />
                    <View style={styles.inputView}>
                        <CustomInput
                            title="Institution Code"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Institution Code."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>


                    <Divider style={{ marginTop: 10 }} />
                    <Text style={styles.info2}>Inter/12th Details</Text>
                    <View style={styles.inputView}>

                        <CustomInput
                            title="Board Name"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Board Name."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>
                    <View style={styles.inputView}>

                        <CustomInput
                            title="Passing Year"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Passing Year."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Roll No"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Roll No."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Roll Code"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Roll Code."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="Marks"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Marks."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>

                        <CustomInput
                            title="%AGE"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter %AGE."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>
                    <CategorySelectList
                        label="Select Institution State"
                        data={BloodGroupData}
                        selectedValue={selected}
                        onSelect={(val) => setSelected(val)} // Handle selection update
                        search={true}
                        required={true}
                    />


                    <CategorySelectList
                        label="Select Institution District"
                        data={BloodGroupData}
                        selectedValue={selected}
                        onSelect={(val) => setSelected(val)} // Handle selection update
                        search={true}
                        required={true}
                    />
                    <View style={styles.inputView}>
                        <CustomInput
                            title="Institution Code"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter Institution Code."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>


                    <View style={styles.inputView}>
                        <CustomInput
                            title="C.L.C No."
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter C.L.C No."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>
                        <CustomInput
                            title="T.C No."
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter C.L.C No."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>
                    <View style={styles.inputView}>
                        <CustomInput
                            title="C.L.C & T.C Issue Date"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter C.L.C & T.C Issue Date"
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>
                        <CustomInput
                            title="Migration No."
                            required={true}
                            onChangeText={onChangeText}
                            value={text}

                            placeholder="Enter C.L.C & T.C Issue Date"
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>

                    <View style={styles.inputView}>
                        <CustomInput
                            title="Migration Issue Date"
                            required={true}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Enter Migration Issue Date."
                            labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                            keyboardType={'default'}
                            badgeStyles={styles.badge}
                        />

                    </View>


                    <View>
                        <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={() => router.push("/screens/DCAdmission/Edit")} />
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

export default ACAdmission