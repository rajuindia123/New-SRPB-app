import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    imageSlider: {
        height: 200,
        width: '100%',
        // backgroundColor:Colors.Sun,
        // borderRadius:10
    },
    mainContent: {
        padding: 16,
        paddingBottom:50
    }
});
export { styles }