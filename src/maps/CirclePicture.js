// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { Thumbnail } from "native-base";

import Mapbox from "@mapbox/react-native-mapbox-gl";

import {Circle, WindowDimensions} from "../components";

const styles = StyleSheet.create({
    circle: {
      position: "absolute",
      left: 16 * WindowDimensions.width / 360,
    },
});

const CirclePicture = ({ style, source, size }) => (
    <View style={[styles.circle, style]}>
      <Circle size={size + 8} color="#fff">
        <Thumbnail
          circle
          style={{
            height: size,
            width: size,
            borderRadius: size / 2,
          }}
          source={source}
        />
      </Circle>
    </View>
  );

export default CirclePicture;