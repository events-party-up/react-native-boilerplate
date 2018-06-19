import React from "react";

import {withNavigation} from "../navigation-block";

import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
    }
});

class Test extends React.Component {
    render() {
        const { lat, lng } = this.props;
        
        return (
            <View style={styles.container}>
                <Text>{`lat: ${lat}, lng: ${lng}`}</Text>
            </View>
        );
    }
}

export default withNavigation(Test, {
    navBlockPosition: "bottom",
});