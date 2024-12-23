import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18
    // backgroundColor:'#fff'
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