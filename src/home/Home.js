// @flow
import moment from "moment";
import * as React from "react";
import {Text, Image, StyleSheet, View, WebView, SafeAreaView} from "react-native";
import {H1, Thumbnail, Button, Content, Container} from "native-base";
import {observer, inject} from 'mobx-react/native';

import {BaseContainer, Circle, Badge, Styles, WindowDimensions} from "../components";
import type {ScreenProps, StoreProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";
const imgMat = require("./rxmat.jpeg");

@inject("store")
@observer
export default class Home extends React.Component<ScreenProps<> & StoreProps> {

    render(): React.Node {
        const {navigation, store} = this.props;
        return (
            <Container>
              {
                store.user &&
                 <View style={[Styles.center, Styles.flexGrow]}>
                  <SafeAreaView style={StyleSheet.absoluteFill}>
                  <Content style={{backgroundColor:'#F5F5F5'}}>
                  <View style={style.logo}>
                    <Circle size={240} style={style.circle1} >
                      <Circle size={208} style={style.circle2} >
                        <Circle size={176} style={style.circle3} >
                          <Circle size={144} style={style.circle4} >
                            <Circle size={112} style={style.circle5} >
                              <Circle size={80} style={style.circle6} >
                                <Thumbnail large circle source={imgMat}/>
                              </Circle>
                            </Circle>
                          </Circle>
                        </Circle>
                      </Circle>
                     </Circle>
                    </View>
                    <View style={[style.logo, {marginTop: 15}]}>
                      <H1 style={{fontSize: 24}}>Bienvenue {store.user.profile.firstName}</H1>
                    </View>
                    <View style={{marginTop:100}}>
                      <Button full transparent style={style.buttonInverse} ><Text style={{color:variables.brandPrimary}}>MODIFIER MA PHOTO</Text></Button>
                    </View>
                    <View>
                      <Button full onPress={() => navigation.navigate("Lists")} primary style={style.buttonPrimary}><Text style={{color:"#fff"}}>DÉMARRER</Text></Button>
                    </View>
                  </Content>
                 </SafeAreaView>
                </View>
              }
            </Container>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    logo: {
        alignSelf: "center",
        alignItems: "center",
        marginBottom: variables.contentPadding * 2
    },
    buttonInverse: {
      width:90+'%',
      borderColor:variables.brandPrimary,
      borderWidth:1,
      borderRadius:4,
      alignSelf:"center",
      alignItems:"center",
      marginBottom: variables.contentPadding
    },
    buttonPrimary: {
      width:90+'%',
      borderColor: variables.brandPrimary,
      borderWidth:1,
      borderRadius:4,
      alignSelf:"center",
      alignItems:"center",
      marginBottom: variables.contentPadding
    },
    circle1: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "transparent",
        borderColor: "#E8EAF6",
        borderWidth: 1
    },
    circle2: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "transparent",
        borderColor: "#E8EAF6",
        borderWidth: 1
    },
    circle3: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "#E8EAF6",
        borderColor: "#C5CAE9",
        borderWidth: 1
    },
    circle4: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "#C5CAE9",
        borderColor: "#9FA8DA",
        borderWidth: 1
    },
    circle5: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "#9FA8DA",
        borderColor: "#7986CB",
        borderWidth: 1
    },
    circle6: {
        marginVertical: variables.contentPadding * 4,
        backgroundColor : "transparent",
        borderColor: "#7986CB",
        borderWidth: 1
    },
    badge: {
        position: "absolute",
        right: 10,
        top: 10
    },
    text: {
        fontFamily: variables.titleFontfamily,
        color: "white"
    }
});
