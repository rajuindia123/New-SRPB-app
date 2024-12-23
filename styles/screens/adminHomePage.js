import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
      padding:18,
        // padding:24,
        backgroundColor: '#E1D5C9'
    },
    containerAddStudent:{
        flex: 1,
        padding:18,
          // padding:24,
          backgroundColor: '#FBFBFB'
    },
    headerText:{
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.White,
        paddingTop:10,
        textAlign:'center',
        fontSize:15,

      },
      headerText2:{
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.White,
        paddingTop:10,
        textAlign:'center',
        fontSize:18,

      },
      cardStyle:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
      },
      cardStyle1:{
        width:'47%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.Shark,
        borderRadius:10,
        marginBottom:30,
        padding:5,
         
        
      },
      cardStyleFull:{
        width:'100%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.Shark,
        borderRadius:10,
        marginBottom:30,
        padding:20,
         
      },
      quickAccess:{
        fontFamily:FontFamiles.PTSerifBold,
        fontSize:22,
        marginBottom:15,
        marginTop:10,

      },
      labelsStyle: {

        letterSpacing: 0.69125,
marginTop:15,
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        color: Colors.primary
        // fontFamily: ,
        // paddingBottom: 3,
    },
    inputStyle: {
        width: '100%',
        height: 44,
        marginTop: 5,
        borderColor: Colors.primary,
        padding: 10,
        borderRadius: 4,
        fontSize: 14,
        fontFamily: FontFamiles.PTSerifRegular,
        // opacity: 0.5,
        borderWidth: 1,
        color: "#000",
        backgroundColor:"#fff",
       // marginBottom: 15,

        // color:
    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: Colors.primary,
        justifyContent: "center",
        height: 50,
        borderColor: Colors.primary,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 20
        // margin:30
    },
    buttonStyleText: {
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifBold,
        // fontWeight:'600',
        // // textTransform: 'uppercase',
        color: Colors.White,
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 },
        // textShadowRadius: 4,
    },
    badge: {

        color: "red",
        fontWeight: "bold",
        marginTop: 5,
    },
    label: {
      // marginTop:20,
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        marginTop: 10,
        color: Colors.primary,
        marginBottom:10,
    },
    labelRedio: {
        fontSize: 15,
        fontFamily: FontFamiles.PTSerifRegular,
        marginTop: 10,
        color: "#000"
    },
    groupData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight:10,
        //  justifyContent:'center' 
    },
    dateOfBirthPikerView: {

        width: '100%',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: "#fff",
        // elevation: 10,
        height: 40,
        marginTop: 5,
         marginBottom:5,
    },
    textDateTimePiker:{
        marginLeft:15,
        fontFamily:FontFamiles.PTSerifRegular
    },
    headerContainer: {
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 15,
      height: 60,
      backgroundColor: Colors.primary, // Custom header background color
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    title: {
      fontSize: 19,
     fontWeight: "bold",
      color: "#fff",
      textAlign:'center',
      marginLeft:'18%'
    },
    iconContainer: {
      justifyContent:"flex-end",
      alignItems: "flex-end",
    },
});
export { styles }