import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        // paddingTop: 40,
        // padding:24,
        backgroundColor: '#fff'
    },
    logoView: {
        width: "15%",
        height: 50,
        backgroundColor: "#fff"
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        justifyContent:'space-between',
        // backgroundColor:'red'
       
        // backgroundColor: "#000"
    },
    topSection:{
        marginTop:10,
        borderColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        
    },
    headerText: {
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 10,
        color: Colors.White,
        textAlign: 'center'
    },
    headerText2: {
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 11,
        color: Colors.White,
        textAlign: 'center'
    },
    headerView: {

        backgroundColor: Colors.primary,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center'
    },
    header1: {
        marginTop:10,
        // paddingLeft: 3,
        width: '67%',
        // marginRight:5,
    },
    subHeaderText: {
        textAlign: "center",
        marginTop: 0,
        marginBottom: 5,
        color: Colors.primary,
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 8,
    },
    headerView2: {
width:160,
        backgroundColor: Colors.primary,
        height: 20,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    subHeaderAddressText: {
        textAlign: "center",
        marginTop: 5,
        marginBottom: 5,
        color: Colors.primary,
        fontFamily: FontFamiles.PTSerifRegular,
        fontSize: 10,
    },
    subHeaderAddressText2: {
        textAlign: "center",
        marginTop: 0,
        marginBottom: 5,
        color: Colors.primary,
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 10,
    },
    formContent: {
        padding: 10,
    },
    slNo: {
        fontSize: 20,
        fontFamily: FontFamiles.PTSerifBold,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        marginTop: 10,
        color: Colors.primary
    },
    badge: {

        color: "red",
        fontWeight: "bold",
        marginTop: 5,
    },
    sessionView: {
        flexDirection: 'row',
        width: '100%'
    },
    datePikerView: {

        width: '40%',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: "#fff",
        // elevation: 10,
        // height: 40,
        marginTop: 5
    },
    textDateTimePiker: {
        textAlign: 'left',
        fontFamily: FontFamiles.PTSerifRegular,
        fontSize: 14,
        paddingLeft:10
    },
    labelTo: {
        height: 40,
        width: '15%',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 16,
        alignItems: 'center',
        paddingTop: 10,

    },

    labelRedio: {
        fontSize: 15,
        fontFamily: FontFamiles.PTSerifRegular,
         marginTop: 6,
        color: Colors.primary
    },
    groupData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight:10,
        //  justifyContent:'center' 
    },
    groupDataGender: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        //  justifyContent:'center' 
    },
    labelsStyle: {

        letterSpacing: 0.69125,

        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        // marginTop: 10,
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
        // color:
    },
    admalloView: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        width: '100%',
        paddingTop: 5,
        // padding:10,
        borderRadius: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        // paddingRight:10
        // marginRight:10,
    },
    adminText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: FontFamiles.PTSerifBold,
        marginBottom: 10,
        color: Colors.primary,
        textDecorationLine: 'underline',
    },
    inputView: {
        marginTop: 10,
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
        // marginBottom:10,
    },
    buttonStyle: {
      padding:10,
        alignItems: "center",
        backgroundColor: Colors.primary,
        justifyContent: "center",
        height: 'auto',
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
    buttonStyleBack: {
        alignItems: "center",
        padding:10,
        // backgroundColor: Colors.primary,
        justifyContent: "center",
  height: 'auto',
        borderColor: Colors.primary,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 20,
        borderWidth:2,
        // margin:30
    },
    buttonStyleTextBack: {
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifBold,
        // fontWeight:'600',
        // // textTransform: 'uppercase',
        color: Colors.primary,
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 },
        // textShadowRadius: 4,
    },
    regAppliForm:{

        width:'100%',
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        padding:10,
        borderRadius:3,
        // marginRight:30,
        
    },
    regText:{
        textAlign:'center',
        color:Colors.White,
        fontFamily:FontFamiles.PTSerifBold,
        fontSize:14

    },
    SearchButton:{
        marginTop:25,
        width:'19%',
        height:45,
        backgroundColor:'green',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:10,
    },

    textarea: {
        height: 100,
        width: "100%",
        borderWidth: 1,
        padding: 10,
        textAlignVertical: "top", // Ensures the text starts at the top
        borderColor: Colors.primary,
        borderRadius: 4,
        fontSize: 14,
        fontFamily: FontFamiles.PTSerifRegular,
        color: "#000",
        marginTop:8
      },
      info:{
        marginTop:10,
        fontSize:14,
        fontFamily:FontFamiles.PTSerifBold,
        textAlign:'center',
      },
      info2:{
        marginTop:10,
        fontSize:16,
        fontFamily:FontFamiles.PTSerifBold,
        textAlign:'justify',
      },

      stepNavigation: {
        alignItems: 'center',
        marginBottom: 20,
      },
      stepLabel: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      progressBar: {
        flexDirection: 'row',
        marginTop: 10,
      },
      progressStep: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeStep: {
        backgroundColor: 'green',
      },
      inactiveStep: {
        backgroundColor: 'gray',
      },
      currentStepText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      header: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginBottom: 10,
        textAlign:'center',
        fontFamily:FontFamiles.PTSerifBold
      },
      headerMatric:{
        marginTop:10,
fontSize:14,
fontFamily:FontFamiles.PTSerifBold
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
      },
      error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
      },
      buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      TextAliment: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: FontFamiles.PTSerifBold,
        textDecorationLine: 'underline',
        color: Colors.Red,
        // marginTop:10,
      },
      fileUploadView: {
        padding: 10,
        // marginTop:20,
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        // borderColor:Colors.primary,
        // borderWidth:1,
      },
      ImageSection: {
    
        width: "30%",
        height: 30,
        borderWidth: 1,
        borderColor: 'green',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        // backgroundColor:'red'
      },
      logo: {
        width: '100%',
        height: '100%'
      },
      textStyles: {
        padding: 5,
        height: '100%',
        textAlign: 'center',
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 11,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '70%',
        // paddingTop:20,
        color: 'blue'
      },
      closeIcon:{
        justifyContent:'flex-end',
        alignItems:"flex-end",
        width:'100%',
        marginBottom:10,

      }


});
export { styles }