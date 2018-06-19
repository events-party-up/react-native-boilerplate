// @flow
import * as React from "react";
import MainStore from "../MainStore";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import type {
    // eslint-disable-next-line no-unused-vars
    NavigationNavigatorProps, NavigationScreenProp, NavigationState
} from "react-navigation/src/TypeDefinition";

export type ScreenProps<O: {} = {}, S: {} = NavigationState> = NavigationNavigatorProps<O, S>;

export type NavigationProps<S: {} = NavigationState> = {
    navigation: NavigationScreenProp<S>
};

export type ScreenParams<P> = ScreenProps<{}, { params: P }>;

export type StoreProps = {
    store: MainStore
};

export type BaseProps = {
    style?: StyleObj
};

export type ChildrenProps = {
    children?: React.ChildrenArray<React.Element<*>> | boolean
};
