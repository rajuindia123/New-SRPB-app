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

    buttonStyle: {
        alignItems: "center",
        backgroundColor: "#000",
        justifyContent: "center",
        height: 50,
        borderColor: Colors.primary,
        borderRadius: 5,
        marginBottom:20,
        // marginRight: 10,
        // marginTop: 20
        // margin:30
    },
    buttonStyleText: {
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifBold,
        // fontWeight:'600',
        // // textTransform: 'uppercase',
        color: Colors.White,
        textAlign:'center'
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 },
        // textShadowRadius: 4,
    },
});




export { styles }