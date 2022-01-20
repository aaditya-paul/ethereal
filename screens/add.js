import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import firebase from "firebase";

export class Add extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={{ color: "white" }}> This is add </Text>
        <Button
          title="go"
          onPress={() => {
            this.props.navigation.navigate("login");
          }}
        />
        <Button
          title="logout"
          onPress={() => {
            firebase.auth().signOut();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
});

export default Add;
