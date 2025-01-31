import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    ActivityIndicator,

} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { styles } from "../../styles/screens/login";
import { addDocument, loginStudent } from "../Function/AppwriteCollection";
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage
import Loader from "../components/Loader";
import { EnrollmentStudentsCollectionId } from "../../src/appwriteAllid";
import ToastMessage from "../components/ToastMessage";
const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    stuUAN: Yup.string().required("Student UAN ID is required"),
});

const Login = () => {
    const [passwordView, setPasswordView] = useState(false);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [toastConfig, setToastConfig] = useState({
        visible: false,
        message: "",
        type: "success", // default type (success, error, warning)
      });
    useEffect(() => {
        // Check if the user is already logged in when the component mounts
        const checkLoginStatus = async () => {
        
            const userSession = await AsyncStorage.getItem("userLoggedIn");
            if (userSession) {
                const parsedSession = JSON.parse(userSession);
                console.log(parsedSession)
                if (parsedSession.role=="student") {
                    setIsLoggedIn(true);
                    router.replace("/screens/DCDagaruaHome/");
                    // router.replace("/screens/Admin/");
                }
            }
        };
        checkLoginStatus();
    }, []);
    if (isLoggedIn) {
        return null; // If already logged in, don't show the login form
    }

    // const handleLogin = async () => {
    //              const data = {
    //          "userId": "Admin",
    //          "password": "Admin@123"
    //      }
    // }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "690405" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1, backgroundColor: "#690405" }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
            >
                       {loading?<Loader />:(
              
                <View style={styles.container}>
             
                    <View style={styles.logoView}>
                        <View style={styles.logoImage}>
                            <Image
                                source={require("../../assets/images/cropped_image.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <Text style={styles.loginTitle}>{"Student Login"}</Text>

                    <Formik
                        initialValues={{ password: "", stuUAN: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values) => {
                            setLoading(true); // Show loading spinner
                            try {
                                const trimmedValues = {
                                    stuUAN: values.stuUAN.trim(),
                                    password: values.password.trim(),
                                };

                                const user = await loginStudent(
                                   EnrollmentStudentsCollectionId,
                                    trimmedValues.stuUAN,
                                    trimmedValues.password
                                );
                                if(user=="Login Successful"){
                                    const userLoggedIn = JSON.stringify({
                                        loggedIn: true,
                                        role: 'student',
                                    });
    
                                    await AsyncStorage.setItem("userLoggedIn", userLoggedIn);
                                    await AsyncStorage.setItem("studentUAN", trimmedValues.stuUAN);
                                    // await AsyncStorage.setItem("stuLoggedIn", "true");
                                    setToastConfig({
                                        visible: true,
                                        message: "Login Successful!",
                                        type: "success",
                                      });
                                      setTimeout(() => {
                                        router.replace("/screens/DCDagaruaHome/");
                                      }, 1000); // Redirect after showing toast

                                    
                                    // router.replace("/screens/DCDagaruaHome/");
                                }else{
                                    setToastConfig({
                                        visible: true,
                                        message: user,
                                        type: "error",
                                      });
                                    // console.log("user",user)
                                }
                            } catch (error) {
                                console.log("Login Error:", error);
                                // Show error to user here if necessary
                            } finally {
                                setLoading(false); // Hide loading spinner
                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <>
                                {/* Admin ID Input */}
                                <CustomInput
                                    title="Student UAN No."
                                    required={true}
                                    onChangeText={handleChange("stuUAN")}
                                    onBlur={handleBlur("stuUAN")}
                                    value={values.stuUAN}
                                    placeholder="Enter Student UAN No."
                                    labelsStyle={
                                        errors.stuUAN && touched.stuUAN
                                            ? styles.labelsStyleError
                                            : styles.label
                                    }
                                    inputStyle={
                                        errors.stuUAN && touched.stuUAN
                                            ? styles.inputStyleError
                                            : styles.input
                                    }
                                    keyboardType="default"
                                    badgeStyles={styles.badge}
                                />

                                {/* Password Input */}
                                <View style={{ position: "relative" }}>
                                    <CustomInput
                                        title="Password"
                                        required={true}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        placeholder="Enter Password"
                                        labelsStyle={
                                            errors.password && touched.password
                                                ? styles.labelsStyleError
                                                : styles.label
                                        }
                                        inputStyle={
                                            errors.password && touched.password
                                                ? styles.inputStyleError
                                                : styles.input
                                        }
                                        secureTextEntry={!passwordView}
                                        keyboardType="default"
                                        badgeStyles={styles.badge}
                                    />

                                    {/* Toggle Password View Icon */}
                                    <TouchableOpacity
                                        onPress={() => setPasswordView(!passwordView)}
                                        style={{
                                            position: "absolute",
                                            top: "44%",
                                            right: 10,
                                        }}
                                    >
                                        {passwordView ? (
                                            <AntDesign name="eye" size={28} color="#000" />
                                        ) : (
                                            <Ionicons name="eye-off" size={28} color="#000" />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                {/* Login Button */}
                                <View >
                                 
                                        <CustomButton
                                            buttonStyle={styles.loginButton}
                                            buttonStyleText={styles.loginButtonText}
                                            children={"Log In"}
                                            onClick={handleSubmit}
                                        />
                                  
                                </View>
                            </>
                        )}
                    </Formik>
                    
                  
                </View>
                  )}
                  {/* ToastMessage */}
    <ToastMessage
      message={toastConfig.message}
      visible={toastConfig.visible}
      type={toastConfig.type}
      onHide={() => setToastConfig({ ...toastConfig, visible: false })}
    />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
