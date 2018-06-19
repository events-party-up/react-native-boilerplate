import React from "react";
import autobind from "autobind-decorator";
import { StyleSheet, View, Text } from "react-native";

import {observer, inject} from "mobx-react/native";

import { Content } from "native-base";

import MapboxClient from "../components/MapboxClient";
import distance from "@turf/distance";
const turfPoint = require("turf-point");
import { multiLineString, lineString } from "@turf/helpers";

import { NavigationBlock } from "./"

import { BaseContainer } from "../components";

import variables from "../../native-base-theme/variables/commonColor";

import NavigationBlockStore from "./NavigationBlockStore";

const defaultConfig = {
    navBlockPosition: "bottom",
};

const GEOLOC_DELAY = 1000;

function withNavigation(WrappedComponent, config = defaultConfig) {
		class WithNavigation extends React.Component {

			constructor(props) {
				super(props);
				this.key = props.navigation.state.params && props.navigation.state.params.key || "-FzahdiaADAh45";
				this.navigationBlockStore = new NavigationBlockStore(this.key, this.initData);
			}

			componentDidMount(){
				const { store } = this.props;
	
				// Update user location
				store.updateCurrentLocation();
				this.updateData();
	
				// Then update user location every GEOLOC_DELAY ms
				this.refreshIntervalId = setInterval(() => {
					store.updateCurrentLocation();
					this.updateData();
				}, GEOLOC_DELAY);

			}

			componentWillUnmount() {
				clearInterval(this.refreshIntervalId);
			}

			initData = () => {
				this.downloadRoute();
			}

			go(key: string, params:string) {
					this.props.navigation.navigate(key, {key: params });
			}

			updateData = async () => {
				console.log("updateData");
	
				const { task } = this.navigationBlockStore;
				const { lat, lng, prevLat, prevLng } = this.props.store;
	
				const currLocation = turfPoint([lng, lat]);
				const prevLocation = turfPoint([prevLng, prevLat]);
	
	
				// Idea for the future :
				// Download new route only if user chose a new route
				if (distance(prevLocation, currLocation) > 0.1) { // Distance greater than 100m 
					await this.downloadRoute();
				}
	
				if (!task || !task.company.geoloc) {
					return;
				}
	
				const destLocation = turfPoint([task.company.geoloc.lng, task.company.geoloc.lat])
				if (distance(currLocation, destLocation) < 0.1) { // Close to destination 
					if (!hasUserDeclined) {
						this.navigationBlockStore.modalTitle = "Have you arrived ?";
						this.navigationBlockStore.isEndModalVisible = true;
					}
					this.navigationBlockStore.isFarAway = false;
				}
				else {
					this.navigationBlockStore.isFarAway = true;
				}
			};

			@autobind
			async downloadRoute () {
				const { company } = this.navigationBlockStore;
				const { lat, lng } = this.props.store;
	
				try {
					const res = await MapboxClient.getDirections(
						[
							{
								latitude: lat,
								longitude: lng,
							},
							{
								latitude: parseFloat(company.geoloc.lat),
								longitude: parseFloat(company.geoloc.lng),
							},
						],
						{ profile: "driving", geometry: "polyline6", steps: true },
					);
					const routeData = res.entity.routes[0];

					const steps = routeData.legs[0].steps.map( step => step.geometry.coordinates);

					this.navigationBlockStore.route = lineString(routeData.geometry.coordinates);
					this.navigationBlockStore.detailedRoute = multiLineString(steps);

					this.navigationBlockStore.duration = routeData.duration;
					this.navigationBlockStore.distance = routeData.distance;

					this.navigationBlockStore.loadingRoute = false;
	
				} catch (err) {
					console.warn({err}, "current location : ", { lat, lng });
				}
				return Promise.resolve();
			};

			render() {
				const { store, navigation } = this.props;
				const { lat, lng } = store;
				const { task, loading, loadingRoute, company, taskRef, route, detailedRoute, isFarAway, distance, duration } = this.navigationBlockStore;

				const newProps = { task, loading, loadingRoute, company, taskRef, route, detailedRoute, isFarAway, distance, duration };

				console.log({newProps});
				
				if (config.navBlockPosition === "top") {
					return (
						<BaseContainer title="Intervention" headerbackgroundColor={variables.brandPrimary} navigation={ {... navigation}} scrollable>
								<NavigationBlock {...this.props} navigationBlockStore={this.navigationBlockStore} />
								<WrappedComponent {...this.props} {...newProps} />
						</BaseContainer>
					);
				}
				
				return (
					<BaseContainer title="Intervention" headerbackgroundColor={variables.brandPrimary} navigation={ {... navigation}}>
							<WrappedComponent {...this.props} {...newProps} />
							<NavigationBlock {...this.props} navigationBlockStore={this.navigationBlockStore} />
					</BaseContainer>
				);
			}
		}
		return inject("store")( observer(WithNavigation) );
}

export default withNavigation;