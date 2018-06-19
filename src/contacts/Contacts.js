// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text, TouchableHighlight} from "react-native";
import {H1, H3, Button, Card, List, ListItem,  CardItem, Thumbnail, Icon, Left, Body, Right, Container} from "native-base";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react/native";

import {BaseContainer, Styles, Circle} from "../components";
import variables from "../../native-base-theme/variables/commonColor";

import ContactsStore from './ContactsStore';
const imgMat = require("./rxmat.jpeg");


@inject('store')
@observer
export default class Contacts extends React.Component<*> {
  storeContacts = new ContactsStore();

  @autobind
  go(type: string, params: string) {
    console.log(type, params);
      this.props.navigation.navigate(type, {key: params});
  }

  render(){
    const { store, navigation } = this.props;
    const { contacts, loading } = this.storeContacts;
    console.log(contacts);
    return(
        <BaseContainer title="Contacts" headerbackgroundColor={ variables.brandPrimary } navigation={ navigation } scrollable>
          {
            !loading && <View>
              <View>
                {
                  _.map(
                      contacts,
                      (item, key) => (<Item
                          key={ key }
                          keyItem={ key }
                          presence={ item.defaultTypePresence }
                          nameItem={ item.profile.name }
                          store={ store }
                          imageURL={ item.profile.urlImage }
                          onPress={ (type, keyItem) => this.go(type, keyItem) }
                      />)
                  )
                }
              </View>
            </View>
          }
        </BaseContainer>
    )
  }
}

@observer
class Item extends React.Component<*> {

    props: {
        keyItem: string,
        nameItem: string,
        store:  any,
        imageURL : string,
        onPress: (string, string) => void,
        presence: string
    }

    @observable key: string;

    componentWillMount() {
        const {keyItem, store} = this.props;
        this.key = keyItem;
    }

    @autobind @action
    go(type: string, key:string) {
        const {onPress} = this.props;
        onPress(type, key);
    }

    render(): React$Element<*>  {
        const {nameItem, onPress, keyItem, imageURL, presence} = this.props;
        console.log(imageURL);
        return (<View>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={imgMat} />
              </Left>
              <Body>
                <Text>{nameItem}</Text>
                {
                  presence == 'En ligne' ? (<Text note>{presence} <Circle size={5} navigateTo=""  color="#52c41a"/></Text>) : (presence == 'Absent' ? (<Text note>{presence} <Circle size={5} navigateTo=""  color="#fa8c16"/></Text>) : (<Text note>{presence} <Circle navigateTo=""  size={5} color="#f5222d" /></Text>))
                }
              </Body>
              <Right>
                <TouchableHighlight onPress={ () => this.go("Contact", this.key) }>
                  <Icon name="ios-information-circle-outline" style={{ fontWeight: "bold", fontSize:25, color:"#707070"}} />
                </TouchableHighlight>
              </Right>
            </ListItem>
          </List>
        </View>);
    }
}
