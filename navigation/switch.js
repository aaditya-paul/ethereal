import React, { Component } from "react";
import { Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Loading from "../screens/loading";
import Login from "../screens/login";
import SignUp from "../screens/signUp";
import Profile from "../screens/profile";
// import BApp from "./bottomTab";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./bottomTabNavigator";

const switchS = createSwitchNavigator({
  loading: Loading,
  login: Login,
  signUp: SignUp,
  profile: Profile,
  bottomTab:BottomTab,
  home: Home,

});

const App = createAppContainer(switchS);

export class Switch extends Component {
  render() {
    return <App />;
  }
}

export default Switch;
