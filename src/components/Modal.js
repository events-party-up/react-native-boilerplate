// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content, Fab} from "native-base";
import Modal from "react-native-modal";

import Container from "./Container"
import type {ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";

type ModalProps = ChildrenProps & {
    header?: string | React.Node,
    headerStyle?: object,
    scrollable?: boolean,
    isVisible: boolean,
    footer?: string | React.Node,
    children: React.Node,
    bottomColor?: string,
    headerbackgroundColor?: string
};

class BaseModal extends Component<ModalProps> {
  render (): React$Element<*> {
    const { isVisible, header, headerStyle, footerStyle, scrollable, footer } = this.props;

    return (
      <Modal
        isVisible={isVisible}
      >
        <View style={styles.modalContent}>
          {
            typeof(header) === "string" ?
            <View style={[styles.header, headerStyle]}>
              <Text>{header}</Text>
            </View> :
            header
          }
          {
            scrollable ?
            <ScrollView>
              {this.props.children}
            </ScrollView> :
            this.props.children
          }
          {
            typeof(footer) === "string" ?
            <View style={[styles.footer, footerStyle]}>
              <Text>{footer}</Text>
            </View> :
            footer
          }
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    padding: 10,
    backgroundColor: "pink",
    borderColor: "red",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  footer: {
    padding: 10,
    backgroundColor: "lightgreen",
    borderColor: "green",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});

export default BaseModal;