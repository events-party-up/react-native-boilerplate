// @flow
import React from "react";

import Mapbox from "@mapbox/react-native-mapbox-gl";

const layerStyles = Mapbox.StyleSheet.create({
  route: {
    lineColor: "#3f51b5",
    lineWidth: 6,
    lineOpacity: 0.5,
  },
});

const Route = ({ route }) => (
    <Mapbox.ShapeSource id="routeSource" shape={route}>
      <Mapbox.LineLayer
        id="routeFill"
        style={layerStyles.route}
      />
    </Mapbox.ShapeSource>
  );

export default Route;