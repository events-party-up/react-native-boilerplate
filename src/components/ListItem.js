// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { WindowDimensions } from "../components";

const styles = StyleSheet.create({
    itemLineContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20 * WindowDimensions.width / 360,
    },
    itemIcon: {
      paddingLeft: 16 * WindowDimensions.width / 360,
      fontSize: 25 * WindowDimensions.width / 360,
    },
    itemTitle: {
      fontSize: 14 * WindowDimensions.width / 360,
      paddingLeft: 16 * WindowDimensions.width / 360,
      color: "#000",
    },
    itemDetail: {
      paddingTop: 8 * WindowDimensions.width / 360,
      paddingLeft: 56 * WindowDimensions.width / 360,
      fontSize: 12 * WindowDimensions.width / 360,
      color: "rgba(0, 0, 0, 0.54)",
    },
    itemDetailSpecial: {
      padding: 16 * WindowDimensions.width / 360,
      fontSize: 12 * WindowDimensions.width / 360,
      color: "rgba(0, 0, 0, 0.54)",
    },
});

const ListItem = ({ text, note, note2, icon }) => {
    if (!text) {
        return (
            <View>
                <Text style={styles.itemDetailSpecial}>{note}{note2 && `\n${note2}`}</Text>
            </View>
        );
    }
    return (
        <View>
            <View style={styles.itemLineContainer}>
                <MaterialIcon name={icon} style={styles.itemIcon}/>
                <Text style={styles.itemTitle}>{text}</Text>
            </View>
            {
                note &&
                <Text style={styles.itemDetail}>{note}{note2 && `\n${note2}`}</Text>
            }
        </View>
    );
}

export default ListItem;