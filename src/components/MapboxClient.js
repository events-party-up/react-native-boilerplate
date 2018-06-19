// @flow
import MapboxClient from "mapbox";

const accessToken = "pk.eyJ1IjoicnhtYXQiLCJhIjoiY2poNmE1eXlwMDBwdTJ3cGc4N2ZuNDZxZiJ9.1ub1EU5Zq4LY5mz0_hywyA";

const client = new MapboxClient(accessToken);
export default client;
