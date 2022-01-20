import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import firebase from "firebase";

export class Home extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={{ color: "white" }}> This is home </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    height:"100%"
  },
});

export default Home;
