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

import ListsDetailStore from './ListsDetailStore'

import { BaseContainer, Styles, WindowDimensions } from "../components";
import NavigationModal from "./NavigationModal";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class ListsDetail extends React.Component<*> {
    @observable lat:number = 0;
    @observable lng:number = 0;
    @observable error:string = '';

    listsDetailStore = new ListsDetailStore(this.props.navigation.state.params.key);

    go(key: string, params:string) {
        this.props.navigation.navigate(key, {key: params });
    }

    // showAlert(){
    //   this.setState({
    //     showAlert: true
    //   });
    // };

    componentWillMount(){
      Geolocation.getCurrentPosition(
        (position) => {
            this.listsDetailStore.lat = position.coords.latitude;
            this.listsDetailStore.lng =  position.coords.longitude;
            this.listsDetailStore.error =  "";
        },
        (error) => this.listsDetailStore.error = error.message,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
      );

    }

    hideAlert(idTask : string){
      this.go("Maps",idTask)
      // this.setState({
      //   showAlert: false
      // });
    };

    alertAndGo(){

    }

    _renderContent(section){
      return(
        <View>
          <Text>{section.content}</Text>
        </View>
      )
    }
    _renderHeader(section){
      return (
        <View style={styles.headerSection}>
          <Text style={styles.headerSectionText}>{section.title}</Text>
        </View>
      )
    }

    _renderSectionTitle(section) {
      return (
        <View>
          <Text>{section.content}</Text>
        </View>
      );
    }

    render(): React$Element<*> {
        const {store, navigation} = this.props;
        const NavigationState = navigation.state
        //const {showAlert, listsDetailStore, keyTask} = this.state;
        const {task, loading, company, matrixDirection} = this.listsDetailStore;
        const textAlert = "C'est parti "+ store.user.profile.name;
        //const textGo = this.state.button ? "Arrêter" : "Commencer";
        const SECTIONS = [{
          title: 'Lieu d\'intervention',
          content: ''
        }, {
          title:'Contacts',
          content: ''
        }];

        return(
            <View>
                <View style={{flexDirection: "row", paddingTop: 16}}>

                    <View TITLE style={{flex: 1, paddingLeft: 16}}>
                        <H3 style={{ fontFamily: "Roboto-Medium" }}>{task.title}</H3>
                    </View>

                    <View INFOS style={{flex: 0}}>
                        <TouchableHighlight onPress={() => this.go("ListsDetail", navigation.state.params.key)} underlayColor="rgba(0,0,0,0.1)">
                        <View style={{flexDirection:"row", right: 20, justifyContent: "center", alignItems: "center", paddingLeft: 20}}>
                            <MaterialIcon style={{color:variables.gray, marginRight: 9.5, fontSize:((WindowDimensions.width*18)/360)}} name="error-outline" />
                            <Text style={{fontSize:((WindowDimensions.width*18)/360), color:variables.gray }}>INFOS</Text>
                        </View>
                        </TouchableHighlight>
                    </View>

                    </View>
                    
                    <View HOURDISTANCE style={{flexDirection:"row", paddingTop: 11, alignItems: "center", paddingLeft: 16}}>
                    <MaterialIcon name="access-time" style={styles.blueIconStyle} />
                    <Text style={styles.blueIconStyle}>{moment(task.time).format("H[h]m")}</Text>
                    <MaterialIcon name="directions" style={styles.blueIconStyle} />
                    <Text style={styles.blueIconStyle}>0,1km</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Maps", { key: NavigationState.params.key, navigate: true })}>
                    <View style={styles.navigationButton}>
                        <MaterialIcon name="navigation" style={styles.navIconStyle} />
                        <Text style={styles.navigationButtonText}>ALLER ( {Math.round(matrixDirection / 60)} min )</Text>
                    </View>
                    </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: {
      flex:1,
    },
    iconStyle: {
      color: "#3F51B5",
      fontSize:18,
      marginRight:10,
    },
    blueIconStyle: {
      color: "#3F51B5",
      fontSize: ((WindowDimensions.width * 18)/360),
      marginRight: 9.5,
    },
    navigationButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 16,
      padding: 12,
      backgroundColor: "rgba(252,228,236,1)",
      opacity: 1,
      borderWidth: 1,
      borderColor: "rgba(244,143,177,1)",
      borderRadius: 4,
      shadowColor: "rgba(173,20,87,1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 2
    },
    navigationButtonText: {
      fontSize: 14,
      fontFamily: "Roboto-Medium",
      color: "rgba(173,20,87,1)"
    },
    navIconStyle: {
      color: "rgba(173,20,87,1)",
      fontSize: ((WindowDimensions.width * 18)/360),
      marginRight: 9.5,
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
