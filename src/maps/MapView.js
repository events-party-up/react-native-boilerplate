// @flow
import React, { Component } from "react";
import moment from "moment";
import autobind from "autobind-decorator";
import {Platform, StyleSheet, Image, View, Text, Dimensions, TouchableOpacity, TouchableHighlight } from "react-native";
import { H1, H3, Button, Icon, Card, CardItem, 
  Thumbnail, Left, Body, Spinner, Right, Tab, 
  Tabs, TabHeading, Content, Fab } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { multiLineString, lineString } from "@turf/helpers";

import distance from "@turf/distance";
const turfPoint = require("turf-point");

import {BaseContainer, Styles, WindowDimensions, NavigationModal, MessageModal } from "../components";

import { NavigationBlock, withNavigation } from "../navigation-block";

import MapStore from "./MapStore";

import Destination from "./Destination";
import Route from "./Route";
import CirclePicture from "./CirclePicture";

import styles from "./mapSheet";

import variables from "../../native-base-theme/variables/commonColor";

MapboxGL.setAccessToken('pk.eyJ1IjoicnhtYXQiLCJhIjoiY2poNmE1eXlwMDBwdTJ3cGc4N2ZuNDZxZiJ9.1ub1EU5Zq4LY5mz0_hywyA');

@inject("store")
@observer
class MapView extends Component<*> {
  mapRef = null;

  constructor(props) {
    super(props);
    this.key = this.props.navigation.state.params.key || "-FzahdiaADAh45";
  }

  componentDidMount() {
    // setInterval(() => this.mapStore.save(), 30000);
  }

  @autobind
  go(type: string, params: string) {
      this.props.navigation.navigate(type, {key: params});
  }

  renderRoute(): React$Element<*> {
    const { route, detailedRoute, store, loadingRoute } = this.props;

    const isNavigating = store.currentNavigation === this.key;

    if (loadingRoute) {
      return null;
    }
    return <Route route={isNavigating ? detailedRoute : route} />;
  }

  renderDestination(): React$Element<*> {
    const { company, loading } = this.props;

    if (loading) {
      return null;
    }

    return(
      <Destination
        lat={parseFloat(company.geoloc.lat)}
        lng={parseFloat(company.geoloc.lng)}
      />
    );
  }

  setMapRef = (ref) => { this.mapRef = ref; };

  pressCurrentLocation = () => {
    this.moveCamera(this.mapRef)();
  }
  
  moveCamera = (mapRef) => () => {
    const { company, store } = this.props;
    const { heading, lat, lng } = store;

    const latCompany = parseFloat(company.geoloc.lat);
    const lngCompany = parseFloat(company.geoloc.lng);

    const isNavigating = this.props.store.currentNavigation === this.key;
    if (isNavigating) {
      mapRef.setCamera({
        stops: [
          // { centerCoordinate: [lng, lat], duration: 100 },
          { zoom: 17, duration: 100 },
          { pitch: 45, duration: 100 },
          { heading, duration: 100 },
        ],
      });
    }
    else {
      mapRef.fitBounds(
        [Math.max(lng, lngCompany), Math.max(lat, latCompany)],
        [Math.min(lng, lngCompany), Math.min(lat, latCompany)],
        40,
        300,
      );
    }
  };

  render(): React$Element<*> {
    const { navigation, store, loading } = this.props;
    const { lat, lng } = store;

    const isNavigating = this.props.store.currentNavigation === this.key;

    const navigationMode = isNavigating ?
      MapboxGL.UserTrackingModes.FollowWithCourse :
      MapboxGL.UserTrackingModes.Follow;

    console.log("BREAKKKK");

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "column"}}>
          <View row style={{flex: 1}}>
            <MapboxGL.MapView
              styleURL={MapboxGL.StyleURL.Street}
              zoomLevel={12}
              ref={this.setMapRef}
              logoEnabled={false}
              onDidFinishRenderingMapFully={this.onDidFinishRenderingMapFully}
              centerCoordinate={[lng, lat]}
              userTrackingMode={navigationMode}
              onUserLocationUpdate={this.onUserLocationUpdate}
              style={styles.container}
              showUserLocation
            >
              { this.renderDestination() }
              { this.renderRoute() }
            </MapboxGL.MapView>
            <Fab
              style={{ backgroundColor: "#fff" }}
              onPress={this.pressCurrentLocation}
              position="bottomRight"
            >
              <MaterialIcon name="my-location" style={{color: "grey", fontSize: 25}} />
            </Fab>
          </View>
          <View row style={{height: 72 / 360 * WindowDimensions.width / 2}} />
          <CirclePicture
            style={{bottom: 10}}
            size={72 / 360 * WindowDimensions.width + 4}
            source={{ uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg" }}
          />
          { loading &&
            <View style={styles.loading}>
              <Spinner color='blue' />
            </View>
          }
        </View>
      </View>
    );
  }
}

export default withNavigation(MapView);
