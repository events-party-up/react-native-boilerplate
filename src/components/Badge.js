// @flow
import * as React from "react";
import {View,TouchableHighlight} from "react-native";

type BadgeProps = {
    size: number,
    color: string,
    children?: React.Node,
    style?: number,
    navigateTo: string
};

export default class Badge extends React.Component<BadgeProps> {

    render(): React.Node {
        const {size, color, style} = this.props;
        const badgeStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center"
        };
        return <View style={[badgeStyle, style]}>{this.props.children}</View>
    }
}
