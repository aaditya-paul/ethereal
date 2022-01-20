import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import firebase from "firebase";

export class Loading extends Component {
  checkIfUserLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          var docRef = firebase.firestore().collection("user").doc(user.uid);
          var data = await docRef.get();
          if (!data.exists) {
            console.log("does not exist");
          } else {
            console.log(data.data().state);
            if (!data.data().state) {
              this.props.navigation.navigate("profile");
            } else {
              this.props.navigation.navigate("bottomTab");
            }
          }
        } else {
          this.props.navigation.navigate("login");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  componentDidMount() {
    this.checkIfUserLoggedIn();
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "black" }}
      >
        <ActivityIndicator size={80} color="yellow" />
      </View>
    );
  }
}

export default Loading;
