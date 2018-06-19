// @flow

import React from "react";
import { StyleSheet } from "react-native";

import { WindowDimensions } from "../components";
import variables from "../../native-base-theme/variables/commonColor";

const styles = StyleSheet.create({
    iconStyle: {
      color: "#3F51B5",
      fontSize:18 * WindowDimensions.width / 360,
      marginRight:10 * WindowDimensions.width / 360,
    },
    blueIconStyle: {
      color: "#3F51B5",
      fontSize: 18 * WindowDimensions.width / 360,
      marginRight: 9.5 * WindowDimensions.width / 360,
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
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    },
    headerSection: {

    },
    headerSectionText:{
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      marginLeft: 5
    }
});

export default styles;
