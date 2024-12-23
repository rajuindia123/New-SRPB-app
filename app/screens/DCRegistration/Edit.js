import { styles } from '../../../styles/screens/EditForm'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import CategorySelectList from '../../components/CategorySelectList';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

const Edit = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Date Of Birth");
  const [value, setValue] = React.useState('first');
  const [selected, setSelected] = React.useState("");
  const [text, onChangeText] = React.useState('Useless Text');

  const [isEditable, setIsEditable] = useState(false);
  const handleEditClick = () => {
    setIsEditable(true); // Toggle editable state
  };

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
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
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
                        <Text style={styles.subHeaderText}>SUNRISE PUNAM BIRENDRA DEGREE COLLEGE OF EDUCATION</Text>
                        {/* <View style={styles.headerView2}>
                            <Text style={styles.headerText2}>Run Under : GM Educational Trust</Text>
                        </View> */}
                        <Text style={styles.subHeaderAddressText}>Geeta Bhubneshwar Nagar, Vishwaspur, Mahthour, Dagarua-854326, Purnea</Text>

                        <Text style={styles.subHeaderAddressText2}>Affiliated by Higher Education Department, Govt. of Bihar & a Unit of Purnea University, Purnea</Text>

                    </View>




                </View>



        <View style={styles.formContent}>
          <Text style={styles.slNo}>Sl.No:- {'690'}</Text>



          <View style={{ paddingRight: 10 }}>
          {/* <CategorySelectList
              label="Select Semester"
              data={data}
              selectedValue={selected}
              onSelect={(val) => setSelected(val)} // Handle selection update
              search={false}
            /> */}


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

                        <View style={{marginTop:10}}>
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
                        </View>

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


          <View style={styles.editView}>
              <View>
                <CustomInput
                  title="College Roll No."
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="College Roll No."
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Name Of The Candidate"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Name Of The Candidate"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>




            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Father`s Name"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Father`s Name"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Mother`s Name"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Mother`s Name"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>



            <Text style={[styles.label]}>
              Select DOB.<Text style={styles.badge}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateOfBirthPikerView} onPress={showDatePicker} >
              <Text style={styles.textDateTimePiker}>{selectedDate}</Text>
            </TouchableOpacity>


            {/* <CategorySelectList
              label="Select Blood Group"
              data={BloodGroupData}
              selectedValue={selected}
              onSelect={(val) => setSelected(val)} // Handle selection update
              search={false}
              required={false}
            /> */}

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


            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Aadhar Number"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Aadhar Number"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>



            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Father`s Aadhar Number"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Father`s Aadhar Number"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>

            


            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Mother`s Aadhar Number"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Mother`s Aadhar Number"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>



            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Identification Marks"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Identification Marks"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>



          
            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Correspondence Address:At"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Correspondence Address:At"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>






            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Post Office"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Post Office"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>


       


            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Police Office"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Police Office"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>



            <View style={[styles.editView]}>
              <View>
                <CustomInput
                  title="Pin Code"
                  required={true}
                  onChangeText={onChangeText}
                  value={text}

                  placeholder="Enter Pin Code"
                  labelsStyle={styles.labelsStyle} inputStyle={[styles.inputStyle, isEditable ? { opacity: 1 } : { opacity: 0.5 }]}
                  keyboardType={'default'}
                  badgeStyles={styles.badge}
                  editable={isEditable}
                />
              </View>

              <TouchableOpacity style={[styles.icon, isEditable ? { opacity: 0.2 } : {}]} onPress={handleEditClick}>
                <Ionicons
                  name={'create-outline'}
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
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
            <CustomButton buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} children={'Submit & Next'} onClick={() => router.push("/screens/DCRegistration/GhosanaPatra")} />
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

export default Edit