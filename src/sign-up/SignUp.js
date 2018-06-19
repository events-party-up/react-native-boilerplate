// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, Image, StyleSheet, Dimensions} from "react-native";
import {Button, Header, Left, Right, Body, Icon, Title, Spinner, Input, Content} from "native-base";
import {observer} from "mobx-react/native";

import SignUpStore from "./SignUpStore";

import {Container, Styles, Field} from "../components";

import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class SignUp extends React.Component<ScreenProps<>> {

    store = new SignUpStore()
    email: Input;
    password: Input;

    @autobind
    setEmailRef(email: Input) {
        this.email = email._root;
    }

    @autobind
    goToEmail() {
        this.email.focus();
    }

    @autobind
    setPasswordRef(password: Input) {
        this.password = password._root;
    }

    @autobind
    goToPassword() {
        this.password.focus();
    }

    @autobind
    back() {
        this.props.navigation.goBack();
    }

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.signIn();
        } catch (e) {
            alert(e.message);
        }
    }

    render(): React.Node {
        return <Container safe={true}>
            <Content style={{backgroundColor: "white"}}>
                    <Header noShadow>
                        <Left>
                            <Button onPress={this.back} transparent>
                                <Icon name='close'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Sign Up</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View>
                        <View style={[StyleSheet.absoluteFill, Styles.imgMask, Styles.center]}>
                            <View style={style.circle}>
                                <Icon name="ios-add-outline" style={{fontSize: 75, color: variables.brandInfo }} />
                            </View>
                        </View>
                    </View>
                    <Field
                        label="Name"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={name => this.store.name = name}
                        onSubmitEditing={this.goToEmail}
                    />
                    <Field
                        label="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={email => this.store.email = email}
                        textInputRef={this.setEmailRef}
                        onSubmitEditing={this.goToPassword}
                    />
                    <Field
                        label="Password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChange={password => this.store.password = password}
                        secureTextEntry
                        textInputRef={this.setPasswordRef}
                        onSubmitEditing={this.signIn}
                    />
                    <Button primary full onPress={this.signIn} style={{height: variables.footerHeight}}>
                        {this.store.loading ? <Spinner color="white"/> : <Icon name="md-checkmark"/>}
                    </Button>
            </Content>
        </Container>
            ;
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    img: {
        height: width * 0.62
    },
    circle: {
        backgroundColor: "white",
        height: 125,
        width: 125,
        borderRadius: 62.5,
        justifyContent: "center",
        alignItems: "center"
    }
});
