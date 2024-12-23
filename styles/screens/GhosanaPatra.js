import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        // backgroundColor: "#690405",
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom:20,
        // padding:22
    },
    logoView: {
        width: "25%",
        height: 80,
        // backgroundColor:'red'
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    topImageView: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textGhosanaPatra: {
        marginTop: 15,
        justifyContent: 'center',
        width: "40%",
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 5,
    },
    textGhosanaPatraText: {
        color: Colors.White,
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 24,
        textAlign: 'center'
    },
    rootContenear: {
        paddingLeft: 5,
        paddingRight: 5
    },

    subHeader: {
        fontSize: 10,
        // textAlign: 'center',
        marginBottom: 20,
    },
    topTextView: {
        marginTop:10,
        flexDirection: 'row',
        width: '100%'

    },
    textStyle:{
        width:'60%',
    },
    slTextStyle:{
        fontSize:10,
        fontFamily:FontFamiles.PTSerifBold,
        // textAlign:'center',
    },
    rightSide:{
        marginTop:5,
        width:'40%',
        alignItems:'center'
        // justifyContent:'center'
    },

    infoText:{
        fontSize:10,
    },
    highlight:{
        fontSize:12,
        fontFamily:FontFamiles.PTSerifBold
    },
    item: {
        flexDirection: 'row',
         marginBottom: 5,
         paddingRight:5
      },
      number: {
        // fontWeight: 'bold',
        fontSize: 13,
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.primary,
        marginRight:5,
      },
      text: {
        fontSize: 14,
        color:Colors.primary,
        fontFamily:FontFamiles.PTSerifRegular
      },
      secondBottomHeader:{
        marginTop:15,
        backgroundColor:Colors.primary,
        height:25,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20,
      },
      textSecondHeader:{
        textAlign:'center',
        fontSize:14,
        color:Colors.White
      },
      infoTextsench:{
        marginTop:10,
        fontSize:14,
        fontWeight:'bold'
      },
      textUploadView:{
        marginTop:10,
        height:'auto',
        width:"60%",
        backgroundColor:Colors.Secondary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        padding:5,
      },
      UploadText:{
        fontFamily:FontFamiles.PTSerifBold,
        fontSize:14,
        textAlign:'center',
        textDecorationLine:'underline'
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


});
export { styles }