// @flow
import React from "react";
import { StyleSheet, View } from "react-native";

import Mapbox from "@mapbox/react-native-mapbox-gl";

const styles = StyleSheet.create({
    annotationContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    annotationFill: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "orange",
      transform: [{ scale: 0.6 }],
    },
});

const Destination = ({lat, lng}) => (
    <Mapbox.PointAnnotation
      key='pointAnnotation'
      id='pointAnnotation'
      coordinate={[lng, lat]}>
      <View style={styles.annotationContainer}>
        <View style={styles.annotationFill} />
      </View>
      <Mapbox.Callout title='Look! An annotation!' />
    </Mapbox.PointAnnotation>
  );

export default Destination;