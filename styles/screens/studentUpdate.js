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
    buttomContainer:{
        position:'absolute',
        bottom:10,
        backgroundColor:'red',
        height:200
    }
});




export { styles }