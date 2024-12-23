import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    imageSlider: {
        height: 200,
        width: '100%',
    },
    mainContent: {
        padding: 20,
        paddingBottom:50
    },
    admissionStyles:{
        width:'100%',
        height:100,
        // backgroundColor:"#62825D",
        elevation:5,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    },
    textAdmission:{
        textAlign:'center',
        fontSize:20,
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.White,
        
        


    },
    infoText:{
        // textAlign:'center',
        marginTop:5,
        color:"#000",
        fontSize:16,
        fontFamily:FontFamiles.PTSerifBold,
        textAlign:'center'
    },
   
});
export { styles }