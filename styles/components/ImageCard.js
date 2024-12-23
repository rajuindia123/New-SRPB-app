import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Colors, FontFamiles } from "../base";

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
        marginTop:10,
        // margin: 10,
      },
      image: {
        width: 110,
        height: 110,
        borderRadius: 10,
      },
      textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
      },
      title: {
        fontSize: 18,
        fontFamily:FontFamiles.PTSerifBold,
        marginBottom:5
        
        // fontWeight: "bold",
      },
      subtitle: {
        fontSize: 14,
        color: "#666",
        marginVertical: 4,
        fontFamily:FontFamiles.PTSerifRegular
      },
      description: {
        fontSize: 12,
        color: "#333",
        fontFamily:FontFamiles.PTSerifRegular
      },
});
export { styles }