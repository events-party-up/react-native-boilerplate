// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observer} from "mobx-react/native";
import {View, Image, StyleSheet, SafeAreaView,StatusBar} from "react-native";
import {H3, Button, Text, Spinner, Input, Content} from "native-base";

import LoginStore from "./LoginStore";
import Mark from "./Mark";

import {Small, Styles, Images, Field, WindowDimensions} from "../components";
import {AnimatedView} from "../components/Animations";

import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

const imgGSF = require('./gsf.png')
@observer
export default class Login extends React.Component<ScreenProps<>> {

    store = new LoginStore();
    password: Input;

    @autobind
    setPasswordRef(password: Input) {
        this.password = password._root;
    }

    @autobind
    goToPassword() {
        this.password.focus();
    }

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.login();
        } catch(e) {
            alert(e.message);
        }
    }

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    forgotPassword() {
        this.props.navigation.navigate("ForgotPassword");
    }

    render(): React.Node {
        return (
            <View style={Styles.flexGrow}>
                <View style={[StyleSheet.absoluteFill]} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={style.content}>
                        <AnimatedView
                            style={{ height: height - StatusBar.currentHeight, justifyContent: "center" }}
                        >
                        <View style={style.logo}>
                            <View >
                                <Image source={imgGSF} style={style.logo}/>
                                <H3 style={style.title}>Veuillez vous connecter pour accéder à toutes les fonctionnalités de l'application</H3>
                            </View>
                        </View>
                        <View style={style.blur}>
                            <Field
                                label="Adresse email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChange={email => this.store.email = email}
                                onSubmitEditing={this.goToPassword}
                                style={{borderRadius:4, borderColor: "#707070"}}
                            />
                            <Field
                                label="Mot de passe"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="go"
                                onChange={password => this.store.password = password}
                                textInputRef={this.setPasswordRef}
                                onSubmitEditing={this.signIn}
                                last
                                style={{borderRadius:4, borderColor:"#707070"}}
                            />
                            <View>
                                <View>
                                    <Button primary full onPress={this.signIn}>
                                     {this.store.loading ? <Spinner color="white" /> : <Text>Se Connecter</Text>}
                                    </Button>
                                </View>
                                {/* <View>
                                    <Button transparent full onPress={this.signUp}>
                                        <Small style={{color: "white"}}>{"Don't have an account? Sign Up"}</Small>
                                    </Button>
                                </View> */}
                                    {/* <View>
                                        <Button transparent full onPress={this.forgotPassword}>
                                            <Small style={{color: "#707070"}}>Forgot password?</Small>
                                        </Button>
                                    </View> */}
                                </View>
                            </View>
                        </AnimatedView>
                    </Content>
                </SafeAreaView>
            </View>
        );
    }
}

const {height, width} = WindowDimensions;
const style = StyleSheet.create({
    img: {
        resizeMode: "cover",
        height,
        width
    },
    content: {
        flex: 1
    },
    logo: {
        alignSelf: "center",
        alignItems: "center",
        marginBottom: variables.contentPadding * 2
    },
    title: {
        marginTop: variables.contentPadding * 2,
        color: "#707070",
        textAlign: "center",
        fontSize:14
    },
    blur: {
        backgroundColor: "rgba(255, 255, 255, .2)"
    }
});
