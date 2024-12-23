import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    useColorScheme,
    Alert,
    ScrollView,
} from "react-native";
import Animated, {
    useAnimatedKeyboard,
    useAnimatedStyle,
    FadeInLeft,
} from "react-native-reanimated";

import { styles } from "../../styles/screens/login";
import CustomInput from "../components/CustomInput";
const Login = () => {

    return (
        <ScrollView style={{ backgroundColor: "#690405" }} >
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

                <Text style={styles.label}>
                    UAN No. <Text style={styles.badge}>*</Text>
                </Text>

                <TextInput
                    placeholder="Enter UAN Number"
                    placeholderTextColor="#ccc"
                    style={styles.input}

                />


                <Text style={styles.label}>
                    Password <Text style={styles.badge}>*</Text>
                </Text>

                <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/screens/DCDagaruaHome/")}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

            </View>


        </ScrollView>
    );
};

export default Login;

