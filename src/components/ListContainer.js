// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Collapsible from "react-native-collapsible";
import { WindowDimensions } from "../components";

const styles = StyleSheet.create({
    listHeader: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: "rgba(0,0,0,0.16)",
    },
    listHeaderTextContainer: {
      padding: 16 * WindowDimensions.width / 360,
      flex: 1,
      justifyContent: "center",
    },
    listHeaderText: {
      fontSize: 14 * WindowDimensions.width / 360,
      color: "#000",
    },
    listHeaderIconContainer: {
      paddingRight: 16 * WindowDimensions.width / 360,
      paddingTop: 12 * WindowDimensions.width / 360,
      paddingBottom: 12 * WindowDimensions.width / 360,
      flex: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    leftHeaderIconContainer: {
        paddingLeft: 16 * WindowDimensions.width / 360,
        paddingTop: 12 * WindowDimensions.width / 360,
        paddingBottom: 12 * WindowDimensions.width / 360,
        alignItems: "center",
        justifyContent: "center",
    },
    listHeaderIcon: {
      fontSize: 25 * WindowDimensions.width / 360,
      color: "#000",
    },
    itemContainer: {
      backgroundColor: "rgba(250, 250, 250, 1)",
      paddingBottom: 20 * WindowDimensions.width / 360,
    },
});

class ListContainer extends React.Component {
    state = {
        isCollapsed: false,
    };

    static defaultProps = {
        expandable: true,
    }

    toggle = () => this.setState({isCollapsed: !this.state.isCollapsed});

    render() {
        const { isCollapsed } = this.state;
        const { title, children, expandable, icon, white } = this.props;

        return (
            <View>
                <TouchableHighlight onPress={expandable ? this.toggle : null} underlayColor="rgba(0,0,0,0.1)">
                    <View style={styles.listHeader}>
                    {
                        icon &&
                        <View style={styles.leftHeaderIconContainer}>
                            <MaterialIcon name={icon} style={[styles.listHeaderIcon]}/>
                        </View>
                    }
                    <View style={styles.listHeaderTextContainer}>
                        <Text style={styles.listHeaderText}>{title}</Text>
                    </View>
                    {   
                        expandable &&
                        <View style={styles.listHeaderIconContainer}>
                            <MaterialIcon name={isCollapsed ? "expand-less" : "expand-more"} style={styles.listHeaderIcon}/>
                        </View>
                    }
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={isCollapsed}>
                    <View style={[styles.itemContainer, white ? {backgroundColor: "white"} : null]}>
                    {
                        children
                    }
                    </View>
                </Collapsible>
            </View>
        );
    }
}

export default ListContainer;