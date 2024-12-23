import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    
  backgroundColor:'#C2FFC7'
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
topSection:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
},
imageView:{
    width:100,
    height:100,
    
    // backgroundColor:'red'
},
logo:{
    width:'100%',
    height:'100%'
},
sectionSess:{
    top:'30%',
    left:'30%',
    position:'absolute',
},
tikCir:{
    
    width:150,
    height:150,
    borderRadius:75,
    borderWidth:1,
    borderColor:Colors.primary,
    justifyContent:'center'

},
buttonSection:{
    left:20,
    position:'absolute',
    bottom:'30%',
},
imageSucc:{
    justifyContent:'center',
    width:300,
    height:300
},
infoText:{
    textAlign:'center',
    color:Colors.primary,
    fontSize:16,
    fontFamily:FontFamiles.PTSerifBold,

},
infoView:{
    backgroundColor:"#FFB200",
    padding:10,
    borderRadius:10,
//    opacity:0.8
}


});
export { styles }