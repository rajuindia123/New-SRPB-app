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
import { addDocument, loginAdmin } from "../Function/AppwriteCollection";
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage
import Loader from "../components/Loader";

const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    userId: Yup.string().required("Admin ID is required"),
});

const Login = () => {
    const [passwordView, setPasswordView] = useState(false);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    useEffect(() => {
        // Check if the user is already logged in when the component mounts
        const checkLoginStatus = async () => {
            const userSession = await AsyncStorage.getItem("userLoggedIn");
            if (userSession === "true") {
                setIsLoggedIn(true); // User is logged in, skip login form
                router.replace("/screens/Admin/"); // Redirect to admin page
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

                    <Text style={styles.loginTitle}>{"Admin Login"}</Text>

                    <Formik
                        initialValues={{ password: "", userId: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values) => {
                            setLoading(true); // Show loading spinner
                            try {
                                const trimmedValues = {
                                    userId: values.userId.trim(),
                                    password: values.password.trim(),
                                };

                                const user = await loginAdmin(
                                    "6762dfab002ed381a886",
                                    trimmedValues.userId,
                                    trimmedValues.password
                                );
                                // Store session information in AsyncStorage
                                await AsyncStorage.setItem("userLoggedIn", "true");
                                setIsLoggedIn(true); // Set login status to true
                                router.replace("/screens/Admin/"); // Navigate to Admin screen
                                // router.push("/screens/Admin/")
                                // console.log("Login Success:", user);
                                // Add navigation or success handling here
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
                                    title="Admin ID"
                                    required={true}
                                    onChangeText={handleChange("userId")}
                                    onBlur={handleBlur("userId")}
                                    value={values.userId}
                                    placeholder="Enter Admin ID"
                                    labelsStyle={
                                        errors.userId && touched.userId
                                            ? styles.labelsStyleError
                                            : styles.label
                                    }
                                    inputStyle={
                                        errors.userId && touched.userId
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
