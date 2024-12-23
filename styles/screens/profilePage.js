import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
      alignItems: 'center',
        backgroundColor: '#0A3981',
        padding: 20,
        // justifyContent:'center'
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#ccc',
      },
      uploadText: {
        marginTop: 10,
        color: '#fff',
        textDecorationLine: 'underline',
        
      },
      infoContainer: {
        marginTop: 30,
        width: '100%',
        // alignItems:'center'
      },
      label: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
        fontFamily:FontFamiles.PTSerifRegular
        // textAlign:'center'
      },
      value: {
        fontSize: 22,
        color: '#333',
        marginBottom: 15,
         textAlign:'center',
         fontFamily:FontFamiles.PTSerifBold
      },
      labelsStyle: {

        letterSpacing: 0.69125,

        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        // marginTop: 10,
        color: "#fff"
        // fontFamily: ,
        // paddingBottom: 3,
    },
    inputStyle: {
        width: '100%',
        height: 44,
        marginTop: 5,
        borderColor: "#fff",
        padding: 10,
        borderRadius: 4,
        fontSize: 14,
        fontFamily: FontFamiles.PTSerifRegular,
        // opacity: 0.5,
        borderWidth: 1,
        color: "#fff",
        // color:
    },
    infoView:{
        marginTop:20,
        flexDirection:'row',
        
    },
    infoViewHeader:{
        fontSize:18,
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.White
    },
    infoViewSubHeader:{
        fontSize:18,
        fontFamily:FontFamiles.PTSerifBold,
        marginLeft:15,
    },
    TimeTable:{
        // marginTop:20,
        color:"#fff"
    },
    Click:{
     
        color:"red",
        marginLeft:20,
        textDecorationLine:'underline'
    }
    


});
export { styles }