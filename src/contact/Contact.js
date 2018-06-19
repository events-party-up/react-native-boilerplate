// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text, TouchableHighlight} from "react-native";
import {H1, H3, Button, Card, List, ListItem, CardItem, Thumbnail, Icon, Left, Body, Right, Container} from "native-base";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react/native";
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {BaseContainer, Styles, Circle} from "../components";
import variables from "../../native-base-theme/variables/commonColor";

import ContactStore from './ContactStore';
const imgMat = require("./rxmat.jpeg");


@inject('store')
@observer
export default class Contact extends React.Component<*> {

    contactStore = {};

    componentWillMount(){
      const {navigation} = this.props;
      const NavigationState = navigation.state
        this.contactStore = new ContactStore(NavigationState.params.key);
    }

    render() {
      const { navigation, store } =  this.props;
      const { loading, contact, getLastGeo } = this.contactStore;
      if(!loading){
        getLastGeo();
      }
      return(
          <BaseContainer title="Contacts" headerbackgroundColor={ variables.brandPrimary } navigation={ navigation } scrollable>
            {
            !loading && <View>
              <List>
                <ListItem>
                  <Body style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Thumbnail style={{marginBottom:10}} large source={imgMat}/>
                    <H1>{contact.profile.name}</H1>
                    <Text note>{contact.role}</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <Left>
                    <Body>
                      <H3>{contact.profile.phoneNumber}</H3>
                      <Text note>Mobile</Text>
                    </Body>
                  </Left>
                  <Right>
                    <TouchableHighlight>
                      <Icon style={{color:"#65ba69"}} name="md-call" />
                    </TouchableHighlight>
                    <TouchableHighlight>
                      <Icon style={{color:"#9c27b0"}} name="md-videocam" />
                    </TouchableHighlight>
                    <TouchableHighlight>
                      <Icon style={{color:"#faad14"}} name="ios-chatbubbles" />
                    </TouchableHighlight>
                  </Right>
                </ListItem>
                <ListItem itemHeader>
                  <Text> Position actuelle </Text>
                </ListItem>
                <ListItem>
                  {/* <Mapbox.MapView
                      styleURL={Mapbox.StyleURL.Street}
                      zoomLevel={15}
                      centerCoordinate={[,]}>
                  </Mapbox.MapView> */}
                </ListItem>
              </List>
            </View>
            }
          </BaseContainer>
      )
    }
}
