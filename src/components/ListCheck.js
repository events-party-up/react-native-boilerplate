// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import CheckBox from 'react-native-check-box';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { WindowDimensions } from "../components";

const styles = StyleSheet.create({
    checkBox: {
      flex: 1,
      paddingLeft: 16 * WindowDimensions.width / 360,
      paddingBottom: 24 * WindowDimensions.width / 360,
      paddingRight: 16 * WindowDimensions.width / 360,
    },
});

class ListCheck extends React.Component {
    state = {
        isDone: this.props.defaultValue,
    }

    onClickOption = () => {
        const { doneRef } = this.props;
        const { isDone } = this.state;
        // TODO set value done
        doneRef.set(!isDone)
               .then(() => this.setState({isDone: !isDone}));
    };

    render() {
        const { isDone } = this.state;
        const { name, editable } = this.props;

        return (
            <View>
                <CheckBox
                    style={styles.checkBox}
                    checkBoxColor={isDone ? "#3F51B5" : "rgba(0,0,0,0.9)"}
                    onClick={editable ? this.onClickOption : () => {}}
                    rightText={name}
                    isChecked={isDone}
                    rightTextStyle={{
                        fontSize: 14 * WindowDimensions.width / 360,
                        fontFamily: "Roboto-Medium",
                    }}
                />
            </View>
        );
    }
}

export default ListCheck;