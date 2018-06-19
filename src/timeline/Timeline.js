// @flow
import * as _ from "lodash";
import {observer, inject} from "mobx-react/native";
import * as React from "react";
import {StyleSheet, Image, View} from "react-native";
import {Text} from "native-base";

import {BaseContainer, Styles, Task} from "../components";

import type {ScreenProps, StoreProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class Timeline extends React.Component<ScreenProps<> & StoreProps> {

    render(): React.Node {
        const {store} = this.props;
        return <BaseContainer title="Timeline" navigation={this.props.navigation} scrollable>
        {
            store.user && <View>
                <View style={[Styles.center, Styles.header]}>
                    <View style={[StyleSheet.absoluteFill, style.mask]} />
                    <Text style={Styles.whiteText}>{store.taskCount} TASKS</Text>
                </View>
                {
                    _.map(store.user.tasks, (task, key) => <Task {...{key, task}} timeline />)
                }
            </View>
        }
        </BaseContainer>;
    }
}

const style = StyleSheet.create({
    mask: {
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    heading: {
        marginTop: variables.contentPadding * 2,
        color: "white"
    }
});
