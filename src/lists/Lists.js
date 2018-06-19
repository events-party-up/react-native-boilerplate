// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text, TouchableHighlight} from "react-native";
import {H1, H3, Button, Card, CardItem, Thumbnail, Icon, Left, Body, Right,Container} from "native-base";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";

import ListsStore from "./ListsStore";

import {BaseContainer, Styles} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class Lists extends React.Component<*> {

    storeList = new ListsStore();
    lat = 0;
    lng = 0;
    error = '';

    go(type: string, params: string) {
      console.log(type, params);
        this.props.navigation.navigate(type, {key: params});
    }


    componentWillMount(){
      navigator.geolocation.getCurrentPosition(
        (position) => {
            this.lat = position.coords.latitude;
            this.lng =  position.coords.longitude;
            this.error =  '';
        },
        (error) => this.error = error.message,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

    render(): React$Element<*> {
        const {navigation, store} = this.props;
        const {tasks, loading} = this.storeList;
        return (<BaseContainer title="Aujourd'hui" headerbackgroundColor={ variables.brandPrimary } navigation={ navigation } scrollable>
        {
            !loading  && <View>
                <Text note style={{marginTop:20,marginLeft:20, fontSize:16,color:'#707070'}}>Intervention(s) à venir { store.overdueTaskCount }</Text>
                {
                    !tasks && <View>
                        <Text>You don't have any secret missions yet =).</Text>
                    </View>
                }
                <View>
                  {
                    _.map(
                        tasks,
                        (item, key) => (<Item
                            key={ key }
                            keyItem={ key }
                            nameItem={ item.title }
                            time={ item.time }
                            done={ item.done }
                            store={ store }
                            imageURL={ item.company.imageURL }
                            distance={ [this.lat, this.lng] }
                            company={ item.company }
                            onPress={ (type, keyItem) => this.go(type, keyItem) }
                        />)
                    )
                  }
              </View>
            </View>
        }
      </BaseContainer>);
    }
}

@observer
class Item extends React.Component<*> {

    props: {
        keyItem: string,
        nameItem: string,
        done?: boolean,
        time: string,
        store:  any,
        distance : Array<number>,
        imageURL : string,
        company: any,
        onPress: (string, string) => void,
    }

    @observable done: boolean;
    @observable key: string;
    @observable distance: number;
    @observable company: any;

    componentWillMount() {
        const {keyItem, distance, store, company} = this.props;
        this.key = keyItem;
        this.distance = store.getDistance(distance, [parseFloat(company.geoloc.lat), parseFloat(company.geoloc.lng)]);
    }

    @autobind @action
    go(type: string, key:string) {
      if(type == 'Maps'){

      } else {
        const {onPress} = this.props;
        onPress(type, key);
      }
    }

    render(): React$Element<*>  {
        const {nameItem, distance, time, onPress, company, keyItem} = this.props;
        const btnStyle ={ backgroundColor: this.done ? variables.brandInfo : variables.lightGray };
        return (<View style={ Styles.listItem }>
            <Card style={{ borderRadius:5, marginLeft:15, marginRight:15, marginTop:15 }}>
              <CardItem>
                  <Thumbnail square style={{width:72, height:72, borderRadius:3, marginRight:12}} source={{ uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg" }} />
                  <Body>
                    <Text style={{ fontSize:18 }}>{ `${nameItem}` }</Text>
                    <Text style={{ color: "#3F51B5", fontSize: 16, fontWeight: "bold" }} note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:18, marginRight:10 }} />  { moment(time).format("LT") } </Text>
                    <Text style={{ width: 180, color: "#3F51B5", fontSize: 16, fontWeight: "bold" }} note> <Icon name="md-pin"  style={{ color: "#3F51B5", fontSize:18 ,marginRight:10 }} />  { company.name } { company.city } ({Math.round(this.distance)} km) </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={ () => this.go("ListsDetail", this.key) }>
                      <Icon name="ios-information-circle-outline" style={{ fontWeight: "bold", fontSize:25, color:"#707070", marginTop:-40 }} />
                    </Button>
                  </Right>
              </CardItem>
              <CardItem style={{ borderTopColor: "#E0E0E0", borderTopWidth: 1 }}>
                <Left style={{ marginLeft: 10 }}>
                  <Button transparent iconLeft onPress= {() => this.go("Map",this.key) }>
                    <Icon style={{ color: "#d81b60", fontSize:22 }} name="md-navigate" />
                    <Text style={{ color: "#d81b60", fontSize:18 }}>  ALLER</Text>
                  </Button>
                </Left>
                <Right style={{ marginRight:10 }}>
                  <Button transparent iconLeft onPress= {() => this.go("Call", company.phoneNumber)}>
                    <Icon style={{ color: "#43a047", fontSize:18 }} name="md-call" />
                    <Text style={{ color: "#43a047", fontSize:18 }}> APPELER</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
        </View>);
    }
}

const style = StyleSheet.create({
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    }
});
