//@flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {Platform, StyleSheet, Image, View, Text, Dimensions} from "react-native";
import {H1,H3, Button, Icon, Card, CardItem, Thumbnail, Left, Body,Spinner, Right, Tab, Tabs, TabHeading} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {observable,action} from "mobx";
import {observer,inject} from "mobx-react/native";


import {BaseContainer, Styles} from "../components";

import MapStore from './MapStore';


import variables from "../../native-base-theme/variables/commonColor";
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY= "AIzaSyDk8NZnPOZaVKCpdWQODQ_ZH3yRHPHvzKs";

@inject("store")
@observer
export default class Map extends React.Component<*> {

  mapStore = new MapStore(this.props.navigation.state.params.key);
  watchId = 0;
  mapView = null;

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
          this.mapStore.lat = position.coords.latitude;
          this.mapStore.lng =  position.coords.longitude;
          this.mapStore.error =  '';
      },
      (error) => this.mapStore.error = error.message,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidMount(){
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.mapStore.lat = position.coords.latitude;
        this.mapStore.lng =  position.coords.longitude;
        this.mapStore.error =  '';
      },
      (error) => this.mapStore.error = error.message,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
    setInterval(() => this.mapStore.save(), 30000)
  }

  componentWillUnmount() {
   navigator.geolocation.clearWatch(this.watchId);
  }

  render(): React$Element<*> {
    const {navigation} = this.props;
    const {task, loading, lng, lat, error} = this.mapStore;
    return(
      <BaseContainer headerbackgroundColor={variables.brandPrimary} title="Intervention" {...{ navigation }}>
        {!this.mapStore.loading ? (
            <Spinner color='blue' />)
           : (
            <Tabs>
              <Tab heading={ <TabHeading><Icon name="ios-map" /><Text>Carte</Text></TabHeading>}>
                <Grid>
                    <Row size={60}>
                      <MapView style={{flex : 1}} initialRegion={{
                                latitude: lat,
                                longitude: lng,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                              }}
                              ref= { c => this.mapView = c}>
                        <MapView.Marker coordinate={{ latitude : lat, longitude : lng }}/>
                        <MapView.Marker coordinate={{ latitude : task.company.geoloc.lat, longitude : task.company.geoloc.lng }}/>
                        <MapViewDirections
                          origin = {{latitude : lat, longitude : lng}}
                          destination = {{latitude : task.company.geoloc.lat, longitude : task.company.geoloc.lng}}
                          apikey={GOOGLE_MAPS_APIKEY}
                          strokeWidth={3}
                          strokeColor="3F51B5"
                          onReady={(result) => {
                            this.mapView.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                              }
                            });
                          }}
                          onError={(errorMessage) => {
                            console.log(errorMessage);
                          }}
                        />
                      </MapView>
                    </Row>
                    <Row size={40}>
                      <Card>
                        <CardItem>
                          <Left>
                            <Thumbnail circle source={{ uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg" }} />
                            <Body>
                              <H3>Coucou</H3>
                              <Text note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:13 }} /> 9h15 </Text>
                              <Text note> <Icon name="ios-pin" style={{ color: "#3F51B5", fontSize:13 }} /> 0,1km </Text>
                            </Body>
                          </Left>
                          {/* <Body>
                            <Button warning> <Text>Arrêter</Text> </Button>
                          </Body> */}
                        </CardItem>
                      </Card>
                    </Row>
                  </Grid>
              </Tab>
              <Tab heading={ <TabHeading><Icon name="ios-list" /><Text>Etape</Text></TabHeading> }>

              </Tab>
            </Tabs>)
        }
      </BaseContainer>
    )
  }
}
