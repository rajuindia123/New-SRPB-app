import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../styles/screens/DCAdmission'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
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

const AddAdmission = () => {
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
    // console.log("selected", selected)
    return (
        <ScrollView style={{ backgroundColor: "#fff", marginBottom: 20 }}>
            <View style={styles.container}>
                

                <View style={styles.formContent}>
                    <Text style={styles.slNo}>Sl.No:- {'690'}</Text>
                    <View style={[styles.inputView,{justifyContent:'space-between',flexDirection:'row'}]}>
<View style={{width:'80%'}}>
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
<View style={styles.SearchButton}>
<FontAwesome name="search" size={28} color="#fff" style={{textAlign:'center'}} />
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



                        <View style={styles.inputView}>

                            <CustomInput
                                title="Correspondence Address:At"
                                required={true}
                                onChangeText={onChangeText}
                                value={text}

                                placeholder="Enter Correspondence Address:At"
                                labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
                                keyboardType={'default'}
                                badgeStyles={styles.badge}
                            />

                        </View>

                        <View style={styles.inputView}>

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

                        </View>

                        <View style={styles.inputView}>

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

                        </View>





                        <View style={styles.inputView}>

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
                    <View>
                        <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={() => console.log("object")} />
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