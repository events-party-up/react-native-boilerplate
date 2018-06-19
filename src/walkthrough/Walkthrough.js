// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, Text, SafeAreaView} from "react-native";
import {Header, Body, Left, Right, Title, Button} from "native-base";
import CarouselCard from "react-native-card-carousel";

import IntroCard from "./IntroCard";

import {Styles, NavigationHelpers} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

import type {ScreenProps} from "../components/Types";

type Card = { color: string, label: string};
type Cards = Card[];

export default class Walkthrough extends React.Component<ScreenProps<>> {
    cards: Cards = [
        {
            color: variables.brandPrimary,
            label: "Share with coworkers, friends, and family"
        },
        {
            color: variables.brandSecondary,
            label: "Manage your tasks efficiently and quickly"
        },
        {
            color: variables.brandInfo,
            label: "Group by topics that matter to you"
        }
    ];

    @autobind
    home() {
        NavigationHelpers.reset(this.props.navigation, "Main");
    }

    render(): React.Node {
        return <SafeAreaView style={Styles.flexGrow}>
            <Header noShadow>
                <Left />
                <Body>
                    <Title>Walkthrough</Title>
                </Body>
                <Right />
            </Header>
            <View style={[Styles.bg, Styles.center, Styles.flexGrow]}>
                <CarouselCard
                    data={this.cards}
                    onPress={() => true}
                    contentRender = {(card: Card) => <IntroCard color={card.color} label={card.label} />}
                />
                <View style={[{marginTop: variables.contentPadding}, Styles.center]}>
                    <Button onPress={this.home} light>
                        <Text>Passer</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>;
    }
}
