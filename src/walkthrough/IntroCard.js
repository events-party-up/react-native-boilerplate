// @flow
import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Icon, Card} from "native-base";

import {Styles} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

class Row extends React.Component<{}> {

    render(): React.Node {
        return <View style={styles.row}>
            <Icon name="ios-checkmark-circle-outline" style={{ color: "white" }} />
            <View style={styles.rowContainer}>
                <View style={styles.rowTopLine} />
                <View style={styles.rowBottomLine} />
            </View>
        </View>;
    }
}

type IntroCardProps = {
    color: string,
    label: string
};

export default class IntroCard extends React.Component<IntroCardProps> {
    render(): React.Node {
        const {color, label} = this.props;
        return <Card style={{ flex: 1 }}>
            <View style={[{ backgroundColor: color, flex: 0.75}, Styles.center]}>
                <View>
                {
                    [1, 2, 3].map(key => <Row key={key} />)
                }
                </View>
            </View>
            <View style={[{ flex: 0.25 }, Styles.center]}>
                <Text style={Styles.textCentered}>{label}</Text>
            </View>
        </Card>;
    }
}

const styles = StyleSheet.create(
    {
        row: {
            flexDirection: "row",
            marginBottom: variables.contentPadding
        },
        rowContainer: {
            marginLeft: variables.contentPadding
        },
        rowTopLine: {
            borderTopWidth: 1,
            borderColor: "white",
            marginBottom: 10,
            marginTop: 10,
            width: 150
        },
        rowBottomLine: {
            borderTopWidth: 1,
            borderColor: "white",
            width: 100
        }
    }
);
