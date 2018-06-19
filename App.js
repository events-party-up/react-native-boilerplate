/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import {Dimensions} from "react-native";
import {StyleProvider, Icon, Button} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {useStrict, observable, computed} from "mobx";
import {observer, Provider} from "mobx-react/native";
import {Home} from './src/home';
import {Lists} from './src/lists';
import {ListsDetail} from './src/listsdetail';
import {Profile} from './src/profile';
import {Drawer} from "./src/drawer";
import {Login} from './src/login';
import {Map} from './src/maps';
import {Call} from './src/call';
import {Contacts} from './src/contacts';
import {Contact} from './src/contact';
import {ForgotPassword} from './src/forgot-password';
import {NavigationBlock} from './src/navigation-block';
import MainStore from "./src/MainStore";
import {Firebase,LoadingIndicator} from './src/components';

import { Platform } from "react-native";
import MapboxGL from "@mapbox/react-native-mapbox-gl";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

type Props = {};

const ONE_SIGNAL_KEY = "624468ad-59b8-4067-9d5a-3bc3cb0e2605";

@observer
export default class App extends React.Component<Props> {
  store = new MainStore();


  @observable _ready: boolean = false;
  @observable _authStatusReported: boolean = false;
  @observable _isLoggedIn: boolean = false;

  @computed get ready(): boolean { return this._ready; }
  set ready(ready: boolean) { this._ready = ready; }

  @computed get authStatusReported(): boolean { return this._authStatusReported; }
  set authStatusReported(authStatusReported: boolean) { this._authStatusReported = authStatusReported; }

  @computed get isLoggedIn(): boolean { return this._isLoggedIn; }
  set isLoggedIn(isLoggedIn: boolean) { this._isLoggedIn = isLoggedIn; }



  componentWillMount(){
    useStrict(true)
    Firebase.init();

    Firebase.auth.onAuthStateChanged(async user => {
        this.isLoggedIn = !!user;
        if (this.isLoggedIn) {
            Firebase.initGeo();
            this.store.init();
        }
        this.authStatusReported = true;
    });
  }

  componentDidMount() {
    if (Platform.OS === "android") {
        MapboxGL.requestAndroidLocationPermissions();
    }
  }

  render(): React.Node {
    const {ready, authStatusReported, isLoggedIn, store} = this;
    const onNavigationStateChange = () => undefined;
    
    return (<Provider {...{store}}>
      <StyleProvider style={getTheme(variables)}>
            {
                authStatusReported ?
                    (
                        isLoggedIn ?
                            <PrivateNavigator {...{onNavigationStateChange}} />
                            :
                            <PublicNavigator {...{onNavigationStateChange}} />

                    )
                    :
                    <LoadingIndicator/>
            }
        </StyleProvider>
    </Provider>);
  }
}

// $FlowFixMe
console.ignoredYellowBox = [
    "Setting a timer"
];

const MainNavigator = DrawerNavigator({
    Home: { screen: Home },
    Lists: { screen: Lists},
    ListsDetail : {screen : ListsDetail},
    Maps: { screen: Map },
    Profile: { screen: Profile },
    Call: {screen : Call},
    Contacts: {screen: Contacts},
    Contact: {screen: Contact},
    //Settings: { screen: Settings },
}, {
    drawerWidth: Dimensions.get("window").width - 80,
    contentComponent: Drawer
});

const navigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

const PublicNavigator = StackNavigator({
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword }
}, navigatorOptions);

const PrivateNavigator = StackNavigator({
    Main: { screen: MainNavigator }
}, navigatorOptions);

export {PrivateNavigator};
