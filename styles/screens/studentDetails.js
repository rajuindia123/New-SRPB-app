import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    topButtonSection:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    firstButton:{
        // marginHorizontal: 10,
        padding: 10,
        // width:80,
        // height:50,
        borderRadius:10,
        backgroundColor:'#88C273',
        justifyContent:'center',
        alignItems:'center'

    },
    textStyles:{
        textAlign:'center',
        fontFamily:FontFamiles.PTSerifBold,
        color:'#fff',
        fontSize:16,
    },
    topdeleteButon:{
        padding: 10,
        borderRadius:10,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily:FontFamiles.PTSerifRegular
      },
      buttonContainer: {
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily:FontFamiles.PTSerifRegular
      },
      buttonYes: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
      },
      mainContainer:{
        marginTop:20
      },
      boxStyles:{
        padding:12,
        borderColor:Colors.primary,
        borderWidth:1,
        borderRadius:8,
    marginTop:5,
    marginBottom:10
      },
      lebal:{
        fontSize:14,
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.primary,
        paddingLeft:10,
      },
      textdataStyles:{
        fontSize:16,
        fontFamily:FontFamiles.PTSerifRegular,

      }

    
});




export { styles }