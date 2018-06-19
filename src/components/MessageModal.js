// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import {inject, observer} from "mobx-react/native";

import { H1, H3, Button, Icon, Card, CardItem,
  Thumbnail, Left, Body, Spinner, Right, Tab,
  Tabs, TabHeading, Content, Container, Fab } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { WindowDimensions, Modal, Circle } from "../components";

@inject("store")
@observer
class MessageModal extends Component<*> {
  render (): React$Element<*> {
    const { isVisible, header, footer, icon, message, note } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        header={header}
        footer={footer}
      >
        <TouchableHighlight onPress={this.props.hideModal} underlayColor="rgba(0,0,0, 0.2)">
          <View style={styles.container}>
            <Circle size={42 * WindowDimensions.width / 360} color="#4CAF50" style={{marginBottom: 10}}>
              <MaterialIcon
                name={icon}
                style={styles.iconButton}
              />
            </Circle>
            <H3 style={{marginBottom: 10}}>
              {message}
            </H3>
            <Text style={{color: "rgba(0, 0, 0, 0.38)"}}>{note}</Text>
          </View>
        </TouchableHighlight>
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

export default MessageModal;