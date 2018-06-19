// @flow
import * as React from "react";
import {Text} from "react-native";
import variables from "../../native-base-theme/variables/commonColor";

import type {BaseProps} from "./Types";

export default class Small extends React.Component<BaseProps & { children: string }> {
    render(): React.Node {
        return <Text style={[{ fontSize: 12, color: variables.gray }, this.props.style]}>{this.props.children}</Text>;
    }
}
