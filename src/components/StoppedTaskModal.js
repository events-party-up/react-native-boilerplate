// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import {inject, observer} from "mobx-react/native";

import { H1, H3, Button, Icon, Card, CardItem,
  Thumbnail, Left, Body, Spinner, Right, Tab,
  Tabs, TabHeading, Content, Container, Fab } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import CheckBox from 'react-native-check-box';

import { WindowDimensions, Modal, Circle, Field } from "../components";
import { ListContainer, ListItem, ListSelect, ListCheck } from "./";

@inject("store")
@observer
class StoppedTaskModal extends Component<*> {
  state= {
    isCarReason: false,
    isHealthReason: false,
    note: "",
  };

  send = () => {
      const { taskRef } = this.props;
      let { note, isCarReason, isHealthReason } = this.state;
      
      if (isCarReason) {
        note = "Problème de voiture, " + note;
      }
      if (isHealthReason) {
        note = "Problème de santé, " + note;
      }
      var updates = {
        note,
      };

      taskRef.update(updates).then( () => this.props.hideModal() );
  };

  render (): React$Element<*> {
    const { isVisible, header, footer, note } = this.props;
    const { isCarReason, isHealthReason } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        header={header}
        scrollable
        footer={footer}
      >
        <View style={styles.container}>
        <Circle size={42 * WindowDimensions.width / 360} color="#FF5722" style={{marginBottom: 10}}>
            <MaterialIcon
            name="pan-tool"
            style={styles.iconButton}
            />
        </Circle>
        <H3 style={{marginBottom: 10}}>
            Intervention suspendue
        </H3>
        <Text style={{color: "rgba(0, 0, 0, 0.38)"}}>{note}</Text>
        </View>
        <ListContainer icon="event-busy" title="Motif de la suspension" expandable={false}>
            <CheckBox
                style={styles.checkBox}
                checkBoxColor={isCarReason ? "#3F51B5" : "rgba(0,0,0,0.9)"}
                onClick={() => this.setState({isCarReason: !isCarReason})}
                rightText="Panne de voiture"
                isChecked={isCarReason}
                rightTextStyle={{
                    fontSize: 14 * WindowDimensions.width / 360,
                    fontFamily: "Roboto-Medium",
                    paddingLeft: 56 * WindowDimensions.width / 360,
                }}
            />
            <CheckBox
                style={styles.checkBox}
                checkBoxColor={isHealthReason ? "#3F51B5" : "rgba(0,0,0,0.9)"}
                onClick={() => this.setState({isHealthReason: !isHealthReason})}
                rightText="Soucis de santé"
                isChecked={isHealthReason}
                rightTextStyle={{
                    fontSize: 14 * WindowDimensions.width / 360,
                    fontFamily: "Roboto-Medium",
                    paddingLeft: 56 * WindowDimensions.width / 360,
                }}
            />
            <View style={{paddingLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
                <Field
                    label="Nom"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onChange={note => this.setState({note})}
                    style={{borderRadius:4, borderColor: "#707070"}}
                />
            </View>
        </ListContainer>
        <View style={{justifyContent: "center", alignItems: "center", padding: 24}}>
            <Button
                block
                style={{margin: 16 * WindowDimensions.width / 360}}
                onPress={this.send}
            >
                <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                <MaterialIcon name="send" style={styles.iconButtonStyle} />
                <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, paddingRight: 8 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>ENVOYER</Text>
                </View>
            </Button>
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
  iconButtonStyle: {
    color: "#fff",
    fontSize:18,
    marginRight:10,
  },
});

export default StoppedTaskModal;