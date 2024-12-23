import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:24,
        backgroundColor: '#fff',
        paddingTop:10,
        marginBottom:90,
    },
    bottomButton:{
        backgroundColor:'#F2F9FF',
        height:80,
        width:'100%',
        paddingLeft:24,
        paddingRight:24,
        // padding:24,
        position:'absolute',
        bottom:0,
        elevation:10
        // left:1
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
    item: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      number: {
        // fontWeight: 'bold',
        fontSize: 18,
        fontFamily:FontFamiles.PTSerifBold,
        color:Colors.primary
      },
      text: {
        fontSize: 18,
        color:Colors.primary,
        fontFamily:FontFamiles.PTSerifRegular
      },
      redStyle:{
        textAlign:'center',
        fontSize:18,
        fontFamily:FontFamiles.PTSerifBold,
        marginBottom:20,
        textDecorationLine:'underline',
        color:Colors.Red


      }
   
});
export { styles }