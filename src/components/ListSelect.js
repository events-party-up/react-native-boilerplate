// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import CheckBox from 'react-native-check-box';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { WindowDimensions } from "../components";

const styles = StyleSheet.create({
    checkBox: {
      flex: 1,
    },
});

class ListSelect extends React.Component {

    render() {
        const { name, value } = this.props;

        return (
            <View style={{justifyContent: "center"}}>
                <CheckBox
                    style={styles.checkBox}
                    checkBoxColor={value ? "#3F51B5" : "rgba(0,0,0,0.9)"}
                    onClick={this.props.onClick}
                    leftText={name}
                    checkedImage={<MaterialIcon name="radio-button-checked" style={{fontSize: 20, color: "#3F51B5"}}/>}
                    unCheckedImage={<MaterialIcon name="radio-button-unchecked" style={{fontSize: 20}}/>}
                    isChecked={value}
                    leftTextStyle={{
                        // paddingLeft: 40 * WindowDimensions.width / 360,
                        paddingTop: 16 * WindowDimensions.width / 360,
                        fontSize: 14 * WindowDimensions.width / 360,
                        fontFamily: "Roboto-Medium",
                    }}
                />
            </View>
        );
    }
}

export default ListSelect;