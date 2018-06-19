// @flow
import * as React from "react";
import {View,TouchableHighlight} from "react-native";

type CircleProps = {
    size: number,
    color: string,
    children?: React.Node,
    style?: number,
    navigateTo: string
};

export default class Circle extends React.Component<CircleProps> {
    render(): React.Node {
        const {size, color, style} = this.props;
        const circleStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center"
        };
        return (
            !this.props.navigateTo ? (
              <View style={[circleStyle, style]}>{this.props.children}</View>
            ) : (<TouchableHighlight onPress={() => this.props.navigation.navigate(this.props.navigateTo)}><View style={[circleStyle, style]}>{this.props.children}</View></TouchableHighlight>)
          );
    }
}
