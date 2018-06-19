// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import {inject, observer} from "mobx-react/native";

import { H1, H3, Button, Icon, Card, CardItem,
  Thumbnail, Left, Body, Spinner, Right, Tab,
  Tabs, TabHeading, Content, Container, Fab } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Modal, Circle, WindowDimensions } from "../components"

@inject("store")
@observer
class NavigationModal extends Component<*> {
  render (): React$Element<*> {
    const { isVisible, header, footer, message, store, warning } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        header={header}
        footer={footer}
      >
        <View style={styles.container}>
          <Circle size={42 * WindowDimensions.width / 360} color={!warning ? "#3F51B5" : "rgba(255, 87, 34, 1)"} style={{marginBottom: 10}}>
            <MaterialIcon
              name="beenhere"
              style={styles.iconButton}
            />
          </Circle>
          <H3 style={{marginBottom: 10}}>
            {message}
          </H3>
          <Text style={{color: "rgba(0, 0, 0, 0.38)"}}>Lorem ipsum ...</Text>
          <View style={{flex: 0, flexDirection: "row"}}>
            <View style={{flex: 1}}>
              <Button success block style={{margin: 10}} onPress={this.props.accept}>
                <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                  <MaterialIcon name="mood" style={[styles.iconButton, {marginRight:10}]} />
                  <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>Oui</Text>
                </View>
              </Button>
            </View>
            <View style={{flex: 1}}>
              <Button warning block style={{margin: 10}} onPress={this.props.decline}>
                <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                  <MaterialIcon name="mood-bad" style={[styles.iconButton, {marginRight:10}]} />
                  <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>Non</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconButton: {
    color: "#fff",
    fontSize: 20,
  },
});

export default NavigationModal;