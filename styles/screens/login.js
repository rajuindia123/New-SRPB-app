import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
 
      container: {
        backgroundColor: "#690405",
        flex: 1,
        padding:22
      },
      logoView: {
        marginTop:20,
        // width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        
      },
      logoImage: {
        marginTop: "8%",
        width: 200,
        height: 150,
        borderRadius:20,
      },
      loginButton: {
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
        marginVertical: 30,
      },
      loginButtonText: {
        color: "#000",
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifBold,
      },
      logo: {
        width: "100%",
        height: "100%",
        // borderWidth:1,
        // borderRadius:100
      },
      label: {
        marginLeft: 5,
        marginBottom: 10,
        fontSize: 16,
        color: "#fff",
        fontFamily: FontFamiles.PTSerifBold,
      },
      badge: {
        color: "red",
        fontWeight: "bold",
      },
      formContainer: {
        marginTop:40,
        backgroundColor: "#690405",
        paddingLeft:14,
        paddingRight:14,
        // padding: 14,
        // height: 420,
      },
      loginTitle: {
        marginTop:30,
        marginBottom:30,
        // position: "absolute",
        // transform: [{ translateX: -90 }, { translateY: 100 }],
        color: "#FFFFFF",
        fontSize: 27,
        fontFamily: FontFamiles.PTSerifBold,
        textAlign: "center",
      },
      input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        padding: 15,
        marginBottom: 15,
        fontFamily:FontFamiles.PTSerifBold
      },
    
      otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
      },
      input2: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#2c3e50",
        color: "white",
        textAlign: "center",
        fontSize: 18,
        // marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    
      buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
      },
      resendButton: {
        justifyContent: "flex-end",
        width: 120,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#2c3e50", // Disabled button
        alignItems: "center",
      },
      resendButtonEnabled: {
        backgroundColor: "#4caf50", // Green when enabled
      },
      resendButtonText: {
        color: "#ffffff",
        fontSize: 14,
      },
    
      timerText: {
        color: "white",
        textAlign: "center",
        marginBottom: 10,
      },

      labelsStyleError: {
        //  marginTop: 20,
            fontSize: 14,
            fontFamily: FontFamiles.PTSerifRegular,
            color: '#FF004D',
            letterSpacing: 0.69125,
            marginBottom:10,
            // fontFamily: ,
            // paddingBottom: 3,

        },
        inputStyleError: {
            // width: '100%',
            // height: 44,
            // marginTop: 5,
             borderColor: '#FF004D',
            // padding: 10,
            // borderRadius: 4,
            // fontSize: 14,
             fontFamily: FontFamiles.PTSerifRegular,
            // // opacity: 0.5,
             borderWidth: 2,
            // color: '#000',
            // backgroundColor:'#fff',

            
            backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        padding: 15,
        marginBottom: 15,
            // color:
        },
});
export { styles }