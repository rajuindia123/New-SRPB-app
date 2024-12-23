import { View, Text, ScrollView, Image, TouchableOpacity,Alert  } from 'react-native'
import React ,{useState} from 'react'
import { styles } from '../../../styles/screens/UploadFile'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const UploadImagePage = () => {
    const [image, setImage] = useState(null);

    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: '*/*', // You can specify the MIME type (e.g., 'application/pdf', 'image/*', etc.)
            copyToCacheDirectory: true, // Whether to cache the file for easy access
          });
    
          if (result.type === 'success') {
            console.log('File picked:', result);
            alert(`File Name: ${result.name}\nFile Size: ${result.size} bytes`);
          } else {
            console.log('Document picking canceled');
          }
        } catch (error) {
          console.error('Error picking document:', error);
        }
      };

      const pickImage = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert("Permission Denied", "You need to enable media library permissions.");
          return;
        }
    
        // Open the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow images only
          allowsEditing: false, // Allow the user to crop the image
          aspect: [4, 3], // Aspect ratio for cropping
          quality: 1, // Image quality (1 is the highest)
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
      const takePhoto = async () => {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert("Permission Denied", "You need to enable camera permissions.");
          return;
        }
    
        // Open the camera
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.fileUploadView} onPress={pickDocument}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Matric Marksheet  Pdf </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fileUploadView} onPress={pickImage}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Admission Slip Pdf</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fileUploadView} onPress={takePhoto}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Inter Result Certificate Pdf </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Inter Admit Card  Pdf</Text>
                </TouchableOpacity>

              

                <TouchableOpacity style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Registration Card Pdf</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Payment Slip Pdf</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Student Aadhar Card Pdf</Text>
                </TouchableOpacity>
                <View style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Father`s Aadhar Card Pdf</Text>
                </View>

                <View style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Mother`s Aadhar Card Pdf</Text>
                </View>
                <View style={styles.fileUploadView}>
                    <View style={styles.ImageSection}>
                        <Image
                            source={require("../../../assets/images/Add-files-cuate.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.textStyles}>Click & Upload Rank Card</Text>
                </View>
                <View style={{ width: '100%' }}>
                    <CustomButton
                        buttonStyle={styles.buttonStyle}
                        buttonStyleText={styles.buttonStyleText}
                        children={'Submit & Payment'}
                        onClick={() => console.log("object")}
                    />
                </View>

            </View>
        </ScrollView>
    )
}

export default UploadImagePage