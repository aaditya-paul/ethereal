import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var text = `City : ${this.props.data.city}
Locality : ${this.props.data.locality}`;
    return (
      <View style={{ marginTop: 20 }}>
        <View>
          <TouchableOpacity>
            <View style={styles.box}>
              <Image
                source={{ uri: this.props.data.thumbnail }}
                style={{
                  height: 195,

                  borderRadius: 15,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                resizeMode="cover"
              />
              <Text
                style={{ color: "yellow", fontFamily: "font2", fontSize: 25 }}
              >
                {" "}
                {this.props.data.name}{" "}
              </Text>
              <Text
                style={{ color: "brown", fontFamily: "font2", fontSize: 25 }}
              >
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "yellow",
    borderRadius: 15,
    height: 300,
    margin: 20,
    marginTop: 0,
    borderColor: "yellow",
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
  },
});
