// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";
import { H3 } from "native-base";
import Geolocation from "react-native-geolocation-service";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { BaseContainer, Styles, WindowDimensions, NavigationModal, MessageModal,
  ListContainer, ListItem, ListCheck, RecordModal } from "../components";

import { withNavigation } from "../navigation-block";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
class ListsDetail extends React.Component<*> {
    @observable lat:number = 0;
    @observable lng:number = 0;
    @observable error:string = '';

    constructor(props) {
      super(props);
      this.key = this.props.navigation.state.params ? this.props.navigation.state.params.key : "-FzahdiaADAh45";
    }
    

    go(key: string, params:string) {
        this.props.navigation.navigate(key, {key: params });
    }

    render(): React$Element<*> {
      const { store, navigation, task, company, loading, taskRef } = this.props;

      const isNavigating = this.props.store.currentNavigation === key;
      const isWorking = this.props.store.currentTask === this.key;

        const listRef = taskRef.child('lists');

        const key = this.props.navigation.state.params.key;

        return(
          <View style={{flex: 1}}>
            {
            !loading  &&
            <View style={styles.root}>

            <ListContainer title="Lieu d'intervention">
              <ListItem
                text={`${company.name} ${company.city}`}
                note={`${company.address}`}
                note2={`${company.zipcode} ${company.city}`}
                icon="location-on"
              />
              <ListItem
                text="Batimen C, Niveau 2"
                note="Lorem ipsum"
                icon="business"
              />
            </ListContainer>

            <ListContainer title="Contact">
              <ListItem
                text="Maxence Delaunay"
                note="Chef service sécurité"
                icon="account-circle"
              />
              <ListItem
                text={`${company.phoneNumber}`}
                icon="phone"
              />
            </ListContainer>

            <ListContainer title="Action(s) à réaliser" expandable={false}>
              <ListItem
                note={task.title}
              />
              {
                Object.entries(task.lists).map( (entry, i) => {
                  return (
                    <ListCheck
                      name={entry[1].name}
                      doneRef={listRef.child(entry[0]).child("done")}
                      defaultValue={entry[1].done}
                      editable={isWorking}
                      key={i}
                    />
                  )
                })
              }
            </ListContainer>

            </View>
            }
          </View>
        );
    }
}

export default withNavigation(ListsDetail, {
  navBlockPosition: "top",
});

const styles = StyleSheet.create({
    root: {
      flex:1,
    },
    iconStyle: {
      color: "#3F51B5",
      fontSize:18 * WindowDimensions.width / 360,
      marginRight:10 * WindowDimensions.width / 360,
    },
    blueIconStyle: {
      color: "#3F51B5",
      fontSize: 18 * WindowDimensions.width / 360,
      marginRight: 9.5 * WindowDimensions.width / 360,
    },
    navigationButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 16 * WindowDimensions.width / 360,
      padding: 12 * WindowDimensions.width / 360,
      backgroundColor: "rgba(252,228,236,1)",
      opacity: 1,
      borderWidth: 1,
      borderColor: "rgba(244,143,177,1)",
      borderRadius: 4 * WindowDimensions.width / 360,
      shadowColor: "rgba(173,20,87,1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 2
    },
    navigationButtonText: {
      fontSize: 14 * WindowDimensions.width / 360,
      fontFamily: "Roboto-Medium",
      color: "rgba(173,20,87,1)"
    },
    navIconStyle: {
      color: "rgba(173,20,87,1)",
      fontSize: 18 * WindowDimensions.width / 360,
      marginRight: 9.5 * WindowDimensions.width / 360,
    },
    rect1: {
      height: 170,
      backgroundColor: "rgba(255,255,255,1)",
      opacity: 1,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 2,
      shadowOpacity: 1
    },
    text1: {
      top: 16,
      left: 16,
      height: 28,
      position: "absolute",
      backgroundColor: "transparent",
      fontSize: 20,
      fontFamily: "Roboto-Medium"
    },
    text2: {
      top: 46,
      left: 16,
      position: "absolute",
      backgroundColor: "transparent",
      fontFamily: "Roboto-Medium",
      color: "rgba(57,73,171,1)"
    },
    text3: {
      top: 69,
      left: 42,
      height: 16,
      position: "absolute",
      backgroundColor: "transparent",
      opacity: 1,
      fontFamily: "Roboto-Medium",
      color: "rgba(0,0,0,0.54)",
      fontSize: 14
    },
    icon1: {
      top: 69,
      left: 16,
      position: "absolute",
      backgroundColor: "transparent",
      color: "#707070",
      fontSize: 18
    },
    icon2: {
      top: 69,
      left: 99,
      position: "absolute",
      backgroundColor: "transparent",
      color: "#707070",
      fontSize: 18
    },
    text4: {
      top: 69,
      left: 125,
      position: "absolute",
      backgroundColor: "transparent",
      fontFamily: "Roboto-Medium",
      fontSize: 14,
      color: "rgba(0,0,0,0.54)",
      opacity: 1
    },
    icon3: {
      top: 16,
      left: 293.87,
      position: "absolute",
      backgroundColor: "transparent",
      color: "rgba(57,73,171,1)",
      fontSize: 18
    },
    text5: {
      top: 16,
      left: 312.23,
      height: 19,
      position: "absolute",
      backgroundColor: "transparent",
      fontSize: 14,
      fontFamily: "Roboto-Medium",
      color: "rgba(57,73,171,1)"
    },
    text6: {
      top: 11,
      left: 109,
      position: "absolute",
      backgroundColor: "transparent",
      fontSize: 14,
      fontFamily: "Roboto-Medium",
      color: "rgba(173,20,87,1)"
    },
    icon4: {
      top: 11,
      left: 87.24,
      position: "absolute",
      backgroundColor: "transparent",
      color: "rgba(173,20,87,1)",
      fontSize: 18
    },
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    },
    headerSection: {

    },
    headerSectionText:{
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      marginLeft: 5
    }
});
