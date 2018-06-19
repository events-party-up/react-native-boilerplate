// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image} from "react-native";
import {H1, Button, Spinner, ListItem, Item, Body, Label, Input} from "native-base";
import DatePicker from "react-native-datepicker";

import CreateStore from "./CreateStore";

import {BaseContainer, Styles, Images, Field, WindowDimensions} from "../components";
import type {ScreenProps} from "../components/Types";
import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Create extends React.Component<ScreenProps<>> {

    store: CreateStore;
    project: Input;

    @autobind
    setProjectRef(project: Input) {
        this.project = project._root;
    }

    @autobind
    goToProject() {
        this.project.focus();
    }

    componentWillMount() {
        this.store = new CreateStore();
    }

    @autobind
    async save(): Promise<void> {
        try {
            await this.store.save();
            const {datetime} = this.store;
            this.props.navigation.navigate("Calendar", { datetime });
        } catch(e) {
            alert(e.message);
        }
    }

    render(): React.Node {
        const footer = (
            <View>
                <Button primary full onPress={this.save}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>CREATE</Text>
                }
                </Button>
            </View>
        );
        return (
            <BaseContainer safe={true} title="Create New" navigation={this.props.navigation} scrollable {...{footer}}>
            <View style={[Styles.center, Styles.header]}>
                <Image source={Images.lists} style={[StyleSheet.absoluteFill, Styles.header]} />
                <View style={[StyleSheet.absoluteFill, style.mask]} />
                <H1 style={{ color: "white" }}>NEW TASK</H1>
            </View>
            <Field
                label="Title"
                onChange={title => this.store.title = title}
                onSubmitEditing={this.goToProject}
            />
            <Field
                label="Project"
                onChange={project => this.store.project = project}
                textInputRef={this.setProjectRef}
                onSubmitEditing={this.save}
            />
            <ListItem last>
                <Body>
                    <Item style={{ borderBottomWidth: 0 }} stackedLabel={true}>
                        <Label>Date time</Label>
                        <DatePicker
                            style={style.datePicker}
                            customStyles={datePickerStyle}
                            date={this.store.datetime}
                            mode="datetime"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={datetime => this.store.datetime = datetime}
                        />
                    </Item>
                </Body>
            </ListItem>
        </BaseContainer>
        );
    }
}

const datePickerStyle = {
    dateInput: {
        borderWidth: 0,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    dateText: {
        fontFamily: "Avenir-Book",
        fontSize: 17
    },
    dateTouchBody: {
        flex: 1
    },
    btnTextConfirm: {
        color: variables.brandPrimary
    }
};

const {width} = WindowDimensions;
const style = StyleSheet.create({
    mask: {
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    icon: {
        color: variables.brandInfo,
        fontSize: 30
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        marginRight: variables.contentPadding / 2
    },
    text: {
        color: "white"
    },
    datePicker: {
        paddingLeft: variables.listItemPadding,
        width
    }
});
