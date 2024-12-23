import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({

    label: {
        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        marginTop: 10,
        color: Colors.primary,
        marginBottom:5,
    },
    badge: {

        color: "red",
        fontWeight: "bold",
        marginTop: 5,
    },
 


});
export { styles }