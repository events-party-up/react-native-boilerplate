// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import {inject, observer} from "mobx-react/native";
import moment from "moment";

import { H1, H3, Button, Icon, Card, CardItem,
  Thumbnail, Left, Body, Spinner, Right, Tab,
  Tabs, TabHeading, Content, Container, Fab } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { WindowDimensions, Modal, Circle, Field } from "../components";

import { ListContainer, ListItem, ListSelect } from "./";

@inject("store")
@observer
class RecordModal extends Component<*> {
	state = {
		firstName: "",
		lastName: "",
		isSelf: true,
		note: "",
	};

	toggleSelf = () => this.setState({isSelf: !this.state.isSelf});

	send = () => {
		const { taskRef } = this.props;
		var updates = {
			note,
		};
		taskRef.update(updates).then( () => this.props.hideModal() );
	};

  render (): React$Element<*> {
		const { isVisible, header, footer, icon, message, note, store } = this.props;
		const { isSelf } = this.state;

		if (!store || !store.task || !store.company) {
			return null;
		}

    return (
      <Modal
        isVisible={isVisible}
        header={header}
        scrollable
        footer={footer}
      >
        <View style={styles.container}>
            <Circle size={42 * WindowDimensions.width / 360} color="rgba(63, 81, 181, 1)" style={{marginBottom: 10}}>
                <MaterialIcon
                name="today"
                style={styles.iconButton}
                />
            </Circle>
            <H3 style={{marginBottom: 10}}>Compte rendu</H3>
            <Text style={{color: "rgba(0, 0, 0, 0.38)"}}>Aliquam tempus sapien risus, quis tincidunt mauris imperdiet id.</Text>


        </View>
        <ListContainer white icon="account-circle" title="Identité de l'agent" expandable={false}>
			<View style={{
				paddingLeft: 16 * WindowDimensions.width / 360,
				paddingBottom: 24 * WindowDimensions.width / 360,
				paddingRight: 16 * WindowDimensions.width / 360
			}}>
				<ListSelect
					name="Mathieu Roux"
					value={isSelf}
					onClick={this.toggleSelf}
				/>
				<ListSelect
					name="Agent extérieur"
					value={!isSelf}
					onClick={this.toggleSelf}
				/>
			</View>
			{
				!isSelf &&
				<View style={{paddingLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Field
							label="Nom"
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="next"
							onChange={lastName => this.setState({lastName})}
							style={{borderRadius:4, borderColor: "#707070"}}
					/>
					<Field
							label="Prénom"
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="next"
							onChange={firstName => this.setState({firstName})}
							style={{borderRadius:4, borderColor:"#707070"}}
					/>
				</View>
			}
        </ListContainer>
        <ListContainer icon="location-on" title="Lieu d'intervention">
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Client
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{store.company.name}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Adresse
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{store.company.address}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}> </Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{store.company.city}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Spécification
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						Batiment B
					</Text>
			</View>
        </ListContainer>
        <ListContainer icon="access-time" title="Periode">
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Date
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{moment(store.task.time).format("H[h]MM")}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Départ itinéraire
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{moment(store.task.dateStartNavigation).format("H[h]MM")}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Arrivée itinéraire
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{moment(store.task.dateEndNavigation).format("H[h]MM")}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Début intervention
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{store.task.dateStartTask && moment(store.task.dateStartTask).format("H[h]MM")}
					</Text>
			</View>
			<View style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
					}}>
						Fin intervention
					</Text>
					<Text style={{
						flex: 1,
						paddingTop: 16,
						fontSize: 14 * WindowDimensions.width / 360,
						fontFamily: "Roboto-Regular",
						color: "rgba(0, 0, 0, 0.54)",
					}}>
						{store.task.dateEndTask && moment(store.task.dateEndTask).format("H[h]MM")}
					</Text>
			</View>
        </ListContainer>
        <ListContainer icon="assignment" title="Nature intervention">
			<Text style={{
				flex: 1,
				paddingTop: 16 * WindowDimensions.width / 360,
				paddingLeft: 56 * WindowDimensions.width / 360,
				fontSize: 14 * WindowDimensions.width / 360,
				fontFamily: "Roboto-Regular",
				color: "rgba(0, 0, 0, 0.54)",
			}}>
				{store.task.title}
			</Text>
        </ListContainer>
        <ListContainer icon="playlist-add-check" title="Action(s) réalisée(s)">
		{
			Object.entries(store.task.lists).map( (entry, i) => {
				return (
					<View
						key={i}
						style={{flexDirection: "row", marginLeft: 56 * WindowDimensions.width / 360}}
					>
						<Text style={{
							flex: 1,
							paddingTop: 16,
							fontSize: 14 * WindowDimensions.width / 360,
							fontFamily: "Roboto-Regular",
							color: "rgba(0,0,0,0.54)"
						}}>
							{entry[1].name}
						</Text>
						<MaterialIcon
							name={entry[1].done ? "check" : "clear"}
							style={{
								flex: 0,
								padding: 16,
								fontSize: 25 * WindowDimensions.width / 360,
								fontFamily: "Roboto-Regular",
								color: "rgba(0, 0, 0, 0.54)",
							}}
						/>
					</View>
				)
			})
		}
        </ListContainer>
        <ListContainer icon="playlist-add" title="Action(s) complémentaire(s)" expandable={false}>
			<View style={{paddingLeft: 56 * WindowDimensions.width / 360, paddingRight: 16 * WindowDimensions.width / 360}}>
				<Field
						label="Ajouter une note"
						autoCapitalize="none"
						autoCorrect={false}
						returnKeyType="next"
						onChange={note => this.setState({note})}
						style={{borderRadius:4, borderColor: "#707070"}}
				/>
			</View>
        </ListContainer>
        <ListContainer icon="add-circle-outline" title="PIÈCE(S) JOINTE(S)" expandable={false}>
            <ListItem
            text="PIÈCE(S) JOINTE(S)"
            icon="today"
            note="Lorem ipsum"
            />
        </ListContainer>
        <View style={{justifyContent: "center", alignItems: "center", padding: 24}}>
            <Button
                block
                style={{margin: 16 * WindowDimensions.width / 360}}
                onPress={this.send}
            >
                <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                <MaterialIcon name="send" style={styles.iconButtonStyle} />
                <Text style={{color: "#fff", fontSize: 18 * WindowDimensions.width / 360, paddingRight: 8 * WindowDimensions.width / 360, fontFamily: "Roboto-Medium"}}>ENVOYER</Text>
                </View>
            </Button>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconButton: {
    color: "#fff",
    fontSize: 20,
  },
  iconButtonStyle: {
    color: "#fff",
    fontSize:18,
    marginRight:10,
  },
});

export default RecordModal;