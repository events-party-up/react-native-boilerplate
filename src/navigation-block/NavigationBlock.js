// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";
import { H3, Button, Content } from "native-base";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import distance from "@turf/distance";
const turfPoint = require("turf-point");

import { BaseContainer, Styles, WindowDimensions, NavigationModal, MessageModal, 
    RecordModal, StoppedTaskModal, MapboxClient } from "../components";

import variables from "../../native-base-theme/variables/commonColor";

import styles from "./NavigationBlockStyle";

const HIDE_MODAL_DELAY = 1000;

export default class NavigationBlock extends React.Component<*> {
    constructor(props) {
      super(props);
      this.key = props.navigation.state.params.key;
      this.props.navigationBlockStore = props.navigationBlockStore;
    }

    go(key: string, params:string) {
        this.props.navigation.navigate(key, {key: params });
    }

    ///////
    ////// NAVIGATION METHODS
    /////

    startNavigation = () => {
      const { store, navigation } = this.props;

      this.props.navigationBlockStore.modalTitle = `C'est parti ${store.user.profile.firstName}`;
      this.props.navigationBlockStore.isMessageModalVisible = true;

      setTimeout(() => {
        if (store.currentNavigation !== this.key) {
          this.props.navigationBlockStore.startNavigatingTime();
        }
        store.setCurrentNavigation(this.key);
        this.props.navigationBlockStore.isMessageModalVisible = false;

        // If not already
        if (navigation.state.key !== "Maps") {
          this.go("Maps", this.key);
        }
      }, HIDE_MODAL_DELAY);
    };

    showEndNavigation = () => {
      const { store } = this.props;

      this.props.navigationBlockStore.modalTitle = `${store.user.profile.firstName}, êtes vous arrivé ?`;
      this.props.navigationBlockStore.isEndModalVisible = true;
    };

    acceptEndNavigation = () => {
      const { navigation } = this.props;
      
      this.props.navigationBlockStore.isEndModalVisible = false;
      this.props.navigationBlockStore.endNavigatingTime();
      this.props.store.setCurrentNavigation(null);

      // If not already
      if (navigation.state.key !== "ListsDetail") {
        this.go("ListsDetail", this.key);
      }
    }

    declineEndNavigation = () => {
      this.props.navigationBlockStore.isEndModalVisible = false;
    }

    ///////
    ////// TASK METHODS
    /////

    startTask = () => {
      const { store, navigation } = this.props;

      this.props.navigationBlockStore.modalTitle = `C'est parti ${store.user.profile.firstName}, travaillez-bien !`;
      this.props.navigationBlockStore.isMessageModalVisible = true;

      setTimeout(() => {
        if (store.currentTask !== this.key) {
          this.props.navigationBlockStore.startWorkingTime();
        }
        store.setCurrentTask(this.key);
        this.props.navigationBlockStore.isMessageModalVisible = false;

        // If not already
        if (navigation.state.key !== "ListsDetail") {
          this.go("ListsDetail", this.key);
        }
      }, HIDE_MODAL_DELAY);
      this.props.updateIsWorking && this.props.updateIsWorking(true);
    };

    showEndTask = () => {
      const { store } = this.props;

      this.props.navigationBlockStore.modalTitle = `${store.user.profile.firstName}, voulez-vous suspendre votre intervention ?`;
      this.props.navigationBlockStore.isEndModalVisible = true;
    };

    acceptEndTask = () => {
      const { store } = this.props;

      this.props.navigationBlockStore.isEndModalVisible = false;
      this.props.navigationBlockStore.endWorkingTime();
      this.props.store.setCurrentTask(null);

      if (Object.entries(store.task.lists).some(entry => !entry[1].done)) {
        this.props.navigationBlockStore.isStoppedTaskModalVisible = true;
      }
      this.taskRef.child("done").set(true);
      this.props.navigationBlockStore.isRecordModalVisible = true;
    }

    declineEndTask = () => {
      this.props.navigationBlockStore.isEndModalVisible = false;
    }

    onPressINFOS = () => {
      const { navigation } = this.props;

      console.log({navKey: navigation.state.key});
      if (navigation.state.key === "ListsDetail") {
        this.go("Maps", this.key);
      } else {
        this.go("ListsDetail", this.key);
      }
    }

    renderButton = () => {
      const { route, isFarAway, task } = this.props;
      const { currentNavigation, currentTask } = this.props.store;
      
      const isNavigating = currentNavigation === this.key;
      const isWorking = currentTask === this.key;

      const roundedDuration = route && Math.round(duration / 60);

      if (task && task.done) {
        return (
          <Button
            block
            warning
            disabled
            lightgray
            style={{margin: 16 * WindowDimensions.width / 360}}
            onPress={this.showEndTask}
          >
            <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
              <MaterialIcon name="navigation" style={styles.iconButtonStyle} />
              <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>TÂCHE COMPLÉTÉE</Text>
            </View>
          </Button>
        );
      }

      // End task
      if (isWorking) {
        return (
          <Button
            block
            warning
            style={{margin: 16 * WindowDimensions.width / 360}}
            onPress={this.showEndTask}
          >
            <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
              <MaterialIcon name="navigation" style={styles.iconButtonStyle} />
              <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>  ARRÊTER LA TÂCHE</Text>
            </View>
          </Button>
        );
      }

      // Stop navigation
      if (isFarAway && isNavigating) {
        return (
          <Button
            block
            warning
            style={{margin: 16 * WindowDimensions.width / 360}}
            onPress={this.showEndNavigation}
          >
            <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
              <MaterialIcon name="navigation" style={styles.iconButtonStyle} />
              <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>  QUITTER LA NAVIGATION</Text>
            </View>
          </Button>
        );
      }

      // Start navigation
      if (isFarAway && !isNavigating) {
        return (
          <TouchableOpacity onPress={this.startNavigation}>
            <View style={styles.navigationButton}>
              <MaterialIcon name="navigation" style={styles.navIconStyle} />
              <Text style={styles.navigationButtonText}>ALLER ( {roundedDuration} min )</Text>
            </View>
          </TouchableOpacity>
        );
      }

      // Start task
      if (!isFarAway && !isNavigating) {
        return (
          <TouchableOpacity onPress={this.startNavigation}>
            <View style={styles.navigationButton}>
              <MaterialIcon name="navigation" style={styles.navIconStyle} />
              <Text style={styles.navigationButtonText}>COMMENCER LA TÂCHE</Text>
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <Button
          block
          warning
          style={{margin: 16 * WindowDimensions.width / 360}}
          onPress={() => this.navigationBlockStore.isEndModalVisible = true}
        >
          <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <MaterialIcon name="navigation" style={styles.iconButtonStyle} />
            <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>  ARRÊTER</Text>
          </View>
        </Button>
      );
    };

    render(): React$Element<*> {
        const {store, navigationBlockStore } = this.props;

        const { task, loading, route,
          isMessageModalVisible, taskRef, isRecordModalVisible, modalTitle,
          isEndModalVisible, isStoppedTaskModalVisible, isFarAway, distance } = navigationBlockStore;

        const isNavigating = store.currentNavigation === this.key;

        const roundedDistance = route && Math.round(distance / 1000);

        console.log({loading})

        if (loading) {
          return <View style={{height: 150}} />;
        }

        return(
            <View>
              <View style={{flexDirection: "row", paddingTop: 16}}>

                <View TITLE style={{flex: 1, paddingLeft: 16}}>
                  <H3 style={{ fontFamily: "Roboto-Medium" }}>{task.title}</H3>
                </View>

                <View INFOS style={{flex: 0}}>
                  <TouchableHighlight onPress={this.onPressINFOS} underlayColor="rgba(0,0,0,0.1)">
                    <View style={{flexDirection:"row", right: 20 * WindowDimensions.width /360, justifyContent: "center", alignItems: "center", paddingLeft: 20 * WindowDimensions.width /360}}>
                      <MaterialIcon style={{color:variables.gray, marginRight: 9.5 * WindowDimensions.width /360, fontSize: 25 * WindowDimensions.width /360}} name="error-outline" />
                      <Text style={{fontSize:((WindowDimensions.width*14)/360), color: "rgba(0, 0, 0, 0.54)", fontFamily: "Roboto-Medium"}}>INFOS</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              
              <View HOURDISTANCE style={{flexDirection:"row", paddingTop: 11, alignItems: "center", paddingLeft: 16}}>
                <MaterialIcon name="access-time" style={styles.blueIconStyle} />
                <Text style={styles.blueIconStyle}>{moment(task.time).format("H[h]m")}</Text>
                <MaterialIcon name="directions" style={styles.blueIconStyle} />
                <Text style={styles.blueIconStyle}>{roundedDistance}km</Text>
              </View>
              {
                this.renderButton()
              }
              {/* <NavigationModal
                isVisible={isStartNavigationModalVisible}
                accept={this.alertAndGo}
                decline={this.declineEnd}
                icon="navigation"
                message={store.user && `C'est parti ${store.user.profile.firstName} !`}
                note="Ipsum lorem ..."
              /> */}

              <MessageModal
                isVisible={isMessageModalVisible}
                hideModal={() => this.navigationBlockStore.isMessageModalVisible = false}
                icon="navigation"
                message={modalTitle}
                note="Ipsum lorem ..."
              />

              <RecordModal
                taskRef={taskRef}
                isVisible={isRecordModalVisible}
                hideModal={() => this.navigationBlockStore.isRecordModalVisible = false}
                store={this.navigationBlockStore}
              />
    
              <NavigationModal
                isVisible={isEndModalVisible}
                accept={isNavigating ? this.acceptEndNavigation : this.acceptEndTask}
                decline={isNavigating ? this.declineEndNavigation : this.declineEndTask}
                warning={isFarAway}
                icon={!isFarAway ? "navigation": "pan-tool"}
                message={modalTitle}
                note="Ipsum lorem ..."
              />

              <StoppedTaskModal
                taskRef={taskRef}
                isVisible={isStoppedTaskModalVisible}
                hideModal={() => this.navigationBlockStore.isStoppedTaskModalVisible = false}
              />
            </View>
        );
    }
}
