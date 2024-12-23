import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width,height  } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },

    background: {
      flex:1,
      width: width, // Full screen width
      height: height, // Full screen height
      },
      overlay: {
        ...StyleSheet.absoluteFillObject, // Fills the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding:18,
      },
      text: {
        color: 'white',
        fontSize: 20,
      },
      box1:{
        justifyContent:'center',
width:'100%',
height:100,
backgroundColor:'#E07B39',
borderRadius:10,
marginTop:50,
      },
      studentText:{
        textAlign:'center',
        fontSize:24,
        color:Colors.White,
        fontFamily:FontFamiles.PTSerifBold
      }
});
export { styles }