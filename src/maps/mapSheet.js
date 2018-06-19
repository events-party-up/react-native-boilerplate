// @flow
import { StyleSheet } from "react-native";
import { WindowDimensions } from "../components";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loading: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    infoContainer: {
      paddingTop: 50,
      width: "100%",
    },
    moreInfo: {
      right: 20,
      position: "absolute",
      alignItems: "center",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.54)",
    },
    iconStyle: {
      color: "#3F51B5",
      fontSize:18,
      marginRight:10,
    },
    blueIconStyle: {
      color: "#3F51B5",
      fontSize:14,
      marginRight: 10,
      fontFamily: "Roboto-Medium"
    },
    iconButtonStyle: {
      color: "#fff",
      fontSize:18,
      marginRight:10,
    },
    navigationButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 16 * WindowDimensions.width / 360,
      padding: 12 * WindowDimensions.width / 360,
      backgroundColor: "rgba(252,228,236,1)",
      opacity: 1,
      borderWidth: 1,
      borderColor: "rgba(244,143,177,1)",
      borderRadius: 4 * WindowDimensions.width / 360,
      shadowColor: "rgba(173,20,87,1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 2
    },
    navigationButtonText: {
      fontSize: 14 * WindowDimensions.width / 360,
      fontFamily: "Roboto-Medium",
      color: "rgba(173,20,87,1)"
    },
    navIconStyle: {
      color: "rgba(173,20,87,1)",
      fontSize: 18 * WindowDimensions.width / 360,
      marginRight: 9.5 * WindowDimensions.width / 360,
    },
  });

export default styles;