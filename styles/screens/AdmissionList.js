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
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    headerCell: {
        padding: 10,
        //   fontWeight: "bold",
        width: 250,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#e6e6e6",
        fontFamily: FontFamiles.PTSerifBold,
        fontSize: 16
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        padding: 10,
        width: 250,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        fontFamily: FontFamiles.PTSerifRegular,
        fontSize: 12,
    },
    evenRow: {
        backgroundColor: "#f9f9f9",
    },
    oddRow: {
        backgroundColor: "#fff",
    },
    actionButton: {
        backgroundColor: "#007BFF",
        padding: 8,
        borderRadius: 5,
        alignSelf: "center",
        width: 100,
        marginLeft: 10
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    pagination: {
        position:'absolute',
        bottom:5,
        // marginVertical: 10,
    },
    bottomButton:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    pageButton: {
        marginLeft:'8%',
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    pageButtonText: {
        // marginLeft:'10%',
        color: "#fff",
        fontWeight: "bold",
    },
    pageText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft:'10%',
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
      },
      filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent:'space-between'
      },
      filterLabel: {
        // textAlign:'center',
        fontSize: 16,
        fontFamily:FontFamiles.PTSerifBold,
        
        // marginRight: 10,
      },
      filterDropdown: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
      },
      labelsStyle: {

        letterSpacing: 0.69125,

        fontSize: 16,
        fontFamily: FontFamiles.PTSerifRegular,
        color: "#000"
        // fontFamily: ,
        // paddingBottom: 3,
    },
    inputStyle: {
        width: '100%',
        height: 44,
        marginTop: 5,
        borderColor: Colors.primary,
        padding: 10,
        borderRadius: 4,
        fontSize: 14,
        fontFamily: FontFamiles.PTSerifRegular,
        // opacity: 0.5,
        borderWidth: 1,
        color: "#000",
        backgroundColor:"#fff",
        marginBottom: 15,

        // color:
    },
    exportButton:{
        width:120,
      justifyContent:'flex-end',


    },
    exportButtonText:{
        color:'red',
        fontFamily:FontFamiles.PTSerifBold,
        textDecorationLine:"underline"
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