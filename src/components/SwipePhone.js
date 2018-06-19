// @flow
import * as React from "react";
import autobind from 'autobind-decorator';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Button, Icon, SwipeRow, Footer} from "native-base";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Container from "./Container"
import type {NavigationProps, ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";




export default class SwipePhone extends React.Component<NavigationProps> {


    @autobind
    onSwipeRight(state){
      this.props.navigation.navigate('Call', {key: 'arround'});
    }

    render(): React.Node {
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      }
      return (<Footer>
            <View style={styles.rect1}>
              <Text style={styles.text1}>Glissez pour appeler</Text>
            </View>
            <GestureRecognizer onSwipeRight={(state) => this.onSwipeRight(state)}>
              <Image
                source={require("./images/sos.png")}
                style={styles.image1}
              />
              <Icon name="ios-arrow-forward-outline" size={40} style={styles.icon1} />
           </GestureRecognizer>
        </Footer>);
    }
}

const styles = StyleSheet.create({
  rect1: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 60,
    width: 375.49,
    top: 607.27,
    left: 0.18,
    position: "absolute",
    opacity: 0.8,
    borderWidth: 1,
    borderColor: "rgba(112,112,112,1)"
  },
  image1: {
    position: "absolute",
    width: 129.52,
    height: 137.72,
    top: 571.91,
    left: -34.54
  },
  text1: {
    top: 21.46,
    left: 120.56,
    position: "absolute",
    backgroundColor: "transparent",
    opacity: 0.38
  },
  icon1: {
    backgroundColor: "transparent",
    top: 626.16,
    left: 288.92,
    position: "absolute",
    color: "grey",
    fontSize: 24
  }
});
