import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../styles/screens/DCAdmission'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

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

const CastData = [
    { key: '1', value: 'GEN', },
    { key: '2', value: 'EBC' },
    { key: '3', value: 'BC' },
    { key: '4', value: 'SC' },
    { key: '5', value: 'ST' }
];

const FinalExamForm = () => {
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
    console.log("selected", selected)
    return (
        <ScrollView style={{ backgroundColor: "#fff", marginBottom: 20 }}>
            <View style={styles.container}>
            <View style={styles.containerTop}>
                    <View style={styles.logoView}>
                        <View style={styles.logoImage}>
                            <Image
                                source={require("../../../assets/images/cropped_image.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.header2}>
                        <View style={styles.headerView}>
                            <Text style={styles.headerText}>SRPB DEGREE COLLEGE OF EDUCTION</Text>
                        </View>
                        <Text style={[styles.subHeaderText,{marginBottom:0}]}>SUNRISE PUNAM BIRENDRA DEGREE COLLEGE OF EDUCATION</Text>
                        {/* <View style={styles.headerView2}>
                            <Text style={styles.headerText2}>Run Under : GM Educational Trust</Text>
                        </View> */}
                        <Text style={styles.subHeaderAddressText}>Geeta Bhubneshwar Nagar, Vishwaspur, Mahthour, Dagarua-854326, Purnea</Text>

                        <Text style={styles.subHeaderAddressText2}>PURNEA UNIVERSITY, PURNEA</Text>

                    </View>




                </View>
                <View style={{ paddingRight: 10 }}>
                    <View style={styles.regAppliForm}>
                        <Text style={[styles.regText,{fontSize:12}]}>UNDER GRADUATE EXAM APPLICATION FORM</Text>
                    </View>
                </View>


                <View style={styles.formContent}>
                    <Text style={styles.slNo}>Sl.No:- {'690'}</Text>
                    <View>
                        <View>
                            <CustomInput
                                title="UAN No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter UAN No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View>


                        <Text style={styles.label}>
                            Session. <Text style={styles.badge}>*</Text>
                        </Text>
                        <View style={styles.sessionView}>
                            <View style={styles.datePikerView} >
                                <Text style={styles.textDateTimePiker}>{"2024"}</Text>
                            </View>
                            <Text style={styles.labelTo}>To</Text>
                            <View style={styles.datePikerView}>
                                <Text style={styles.textDateTimePiker}>{"2028"}</Text>
                            </View>
                        </View>

                        <Text style={styles.label}>
                            SEM. <Text style={styles.badge}>*</Text>
                        </Text>
                        <View style={styles.sessionView}>
                            <View style={styles.datePikerView} >
                                <Text style={styles.textDateTimePiker}>{"II"}</Text>
                            </View>
                          
                        </View>





                        <View style={{ marginTop: 10 }}>
                            <CustomInput
                                title="Reg. No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Reg No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View>





                        {/* <View>
                            <CustomInput
                                title="C. No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter C. No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View> */}

                        <Text style={styles.label}>
                            Faculty/Course.<Text style={styles.badge}>*</Text>

                        </Text>


                        <View style={{ marginRight: 10 }}>

                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.groupData}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>B.A</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>B.SC</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="third" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>B.Com.</Text>

                                    </View>

                                    {/*                                   
                                    <RadioButton value="second" color='#690405' />
                                    <Text style={styles.labelRedio}>B.SC</Text> */}

                                    {/* <RadioButton value="third" color='#690405' />
                                    <Text style={styles.labelRedio}>B.Com.</Text> */}

                                </View>
                            </RadioButton.Group>
                        </View>

                        <View>
                            <CustomInput
                                title="College Roll No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter College Roll No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />
                        </View>

                    </View>

                    <View style={{ marginTop: 1, paddingRight: 10 }}>
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
                                title="Father`s Name / Husband`s Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Father`s / Husband`s Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Mother`s Name / Husband`s Name"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Mother`s / Husband`s Name"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>
                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select DOB.<Text style={styles.badge}>*</Text>
                        </Text>
                        <TouchableOpacity style={styles.dateOfBirthPikerView} onPress={showDatePicker} >
                            <Text style={styles.textDateTimePiker}>{selectedDate}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select Gender.<Text style={styles.badge}>*</Text>

                        </Text>


                        <View >
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.groupData}>
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

                                    {/*                                   
                                    <RadioButton value="second" color='#690405' />
                                    <Text style={styles.labelRedio}>B.SC</Text> */}

                                    {/* <RadioButton value="third" color='#690405' />
                                    <Text style={styles.labelRedio}>B.Com.</Text> */}
                                </View>
                            </RadioButton.Group>


                        </View>


                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select Disability.<Text style={styles.badge}>*</Text>

                        </Text>

                        <View >
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={[styles.groupData,{justifyContent:'flex-start'}]}>



                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Yes</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row',marginLeft:20 }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>No</Text>

                                    </View>

                                   

                                    {/*                                   
                                    <RadioButton value="second" color='#690405' />
                                    <Text style={styles.labelRedio}>B.SC</Text> */}

                                    {/* <RadioButton value="third" color='#690405' />
                                    <Text style={styles.labelRedio}>B.Com.</Text> */}
                                </View>
                            </RadioButton.Group>


                        </View>




                        <View style={styles.inputView}>

                            <CustomInput
                                title="Religion"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Religion"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Nationality"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Nationality"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>


                        <CategorySelectList
                            label="Select Cast Category"
                            data={CastData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                            required={true}
                        />


                        <View style={styles.inputView}>

                            <CustomInput
                                title="Email ID"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Email Id"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>



                        <View style={styles.inputView}>

                            <CustomInput
                                title="Contact No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Contact No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

                            <CustomInput
                                title="Whatsapp No."
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Contact No."
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

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
                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Select Medium.<Text style={styles.badge}>*</Text>

                        </Text>

                        
                        <View >
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={[styles.groupData,{justifyContent:'flex-start'}]}>



                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="first" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>English</Text>

                                    </View>


                                    <View style={{ flexDirection: 'row',marginLeft:20 }}>
                                        <RadioButton value="second" color='#690405' />
                                        <Text style={[styles.labelRedio, { marginTop: 8 }]}>Hindi</Text>

                                    </View>

                                   

                                    {/*                                   
                                    <RadioButton value="second" color='#690405' />
                                    <Text style={styles.labelRedio}>B.SC</Text> */}

                                    {/* <RadioButton value="third" color='#690405' />
                                    <Text style={styles.labelRedio}>B.Com.</Text> */}
                                </View>
                            </RadioButton.Group>


                        </View>



                        <CategorySelectList
                            label="Select Examination/ Stream"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                            required={true}
                        />
                            <CategorySelectList
                            label="Select Board/ University"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={false}
                            required={true}
                        />
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
    title="Roll Code."
    required={true}
    onChangeText={onChangeText}
    value={text}

    placeholder="Enter Code No."
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
    title="Marks Obtained"
    required={true}
    onChangeText={onChangeText}
    value={text}

    placeholder="Enter Marks Obtained."
    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
    keyboardType={'default'}
    badgeStyles={styles.badge}
/>
</View>

<View style={styles.inputView}>

<CustomInput
    title="Marks (%) Percent"
    required={true}
    onChangeText={onChangeText}
    value={text}

    placeholder="Enter Marks (%) Percent."
    labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
    keyboardType={'default'}
    badgeStyles={styles.badge}
/>
</View>


                        {/* <View style={styles.inputView}>

                            <CustomInput
                                title="Permanent Address:At"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}
                                // maxLength={4}
                                placeholder="Enter Correspondence Address:At"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View> */}

                        {/* <View style={styles.inputView}>

                            <CustomInput
                                title="Post Office"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Post Office"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View> */}

                        {/* <View style={styles.inputView}>

                            <CustomInput
                                title="Police Office"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Police Office"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View> */}





                        {/* <View style={styles.inputView}>

                            <CustomInput
                                title="Pin Code"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Pin Code"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View> */}

{/* 
                        <CategorySelectList
                            label="Select State"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        /> */}


                        {/* <CategorySelectList
                            label="Select District"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        /> */}

                        {/* <CategorySelectList
                            label="Select District"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        /> */}

                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Subject Details:.<Text style={styles.badge}>*</Text>

                        </Text>



                        <CategorySelectList
                            label="Select MJC (Major) Course"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />
                        <CategorySelectList
                            label="Select MIC (Minor) Course"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />

                        <CategorySelectList
                            label="Select MDC (Multi Disciplinary) Course"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />
                        <CategorySelectList
                            label="Select AEC (MIL) Language"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />
                        <CategorySelectList
                            label="Select SEC (Skill Enhancement) Course"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />
                        <CategorySelectList
                            label="Select VAC (Value Added) Course"
                            data={BloodGroupData}
                            selectedValue={selected}
                            onSelect={(val) => setSelected(val)} // Handle selection update
                            search={true}
                            required={true}
                        />
                    </View>
                    <View>
                        <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={() => console.log("Submit & Next")} />
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

export default FinalExamForm