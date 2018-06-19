// @flow
import * as React from "react";
import {Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content, Fab} from "native-base";
import {Platform} from 'react-native';
import  EvilIcons  from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Container from "./Container"
import type {NavigationProps, ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";

type BaseContainerProps = NavigationProps<*> & ChildrenProps & {
    title: string | React.Node,
    scrollable?: boolean,
    footer?: React.Node,
    safe?: boolean,
    bottomColor?: string,
    headerbackgroundColor: string
};

export default class BaseContainer extends React.Component<BaseContainerProps> {
    render(): React.Node {
        const {title, navigation, scrollable, footer, safe, bottomColor, headerbackgroundColor} = this.props;
        return <Container {...{safe, bottomColor}}>
                <NBHeader noShadow style={{ paddingTop: Platform.OS === 'ios' ? 5 : 0, backgroundColor: headerbackgroundColor ? headerbackgroundColor : "transparent"}}>
                  <Left>
                    <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                        <EvilIcons name="navicon" size={32} color={variables.white} />
                    </Button>
                  </Left>
                  <Body>
                  {
                      typeof(title) === "string" ? <Title style={{ fontWeight:"bold", color: "#FFFFFF" }}>{ title }</Title> : title
                  }
                  </Body>
                  <Right>
                      <Button transparent>
                        <MaterialIcons name="settings-phone" size={25} color={variables.white}/>
                      </Button>
                      <Button transparent>
                        <MaterialIcons name="more-vert" size={25} color={variables.white} style={{ marginRight:10 }}/>
                      </Button>
                  </Right>
                </NBHeader>
                {
                    scrollable ? <Content>
                            {this.props.children}
                        </Content>
                    :
                        this.props.children
                }
                {
                    footer
                }
            </Container>;
    }
}
