import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        //  paddingTop:5,
        elevation: 10,
        backgroundColor: '#fff',
        paddingTop: 5,
        //padding:10,
        paddingBottom: 20
    },
    image: {
        width,
        height: '100%',
        resizeMode: "stretch",
        // borderRadius:10,
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#690405",
        marginHorizontal: 5,
    },
});
export { styles }