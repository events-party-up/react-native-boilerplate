// @flow
import {StyleSheet, Dimensions} from "react-native";

import variables from "../../native-base-theme/variables/commonColor";

const {width} = Dimensions.get("window");
const Styles = StyleSheet.create({
    imgMask: {
        backgroundColor: "rgba(80, 210, 194, .8)"
    },
    headerMask: {
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    header: {
        width,
        height: width * 440 / 750
    },
    flexGrow: {
        flex: 1
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    textCentered: {
        textAlign: "center"
    },
    bg: {
        backgroundColor: "white"
    },
    row: {
        flexDirection: "row"
    },
    whiteBg: {
        backgroundColor: "white"
    },
    whiteText: {
        color: "white"
    },
    grayText: {
        color: variables.gray
    },
    listItem: {
        flexDirection: "row",
        borderColor: variables.listBorderColor
    }
});

export default Styles;
