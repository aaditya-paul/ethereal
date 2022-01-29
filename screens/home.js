import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import Card from "./card";
import * as Fonts from "expo-font";
const data = [
  {
    name: "Aaditya",
    city: "Dhupguri",
    state: "West Bengal",
    thumbnail: "https://wallpaperaccess.com/full/1376490.jpg",
    price: 5000,
    locality: "Netaji Para",
    hotel_name: "Oyo 5 star",
  },
  {
    name: "Bhaskar",
    city: "Kolkata",
    state: "Assam",
    thumbnail: "https://wallpaperaccess.com/full/6509.jpg",
    price: 7000,
    locality: "Asssam Club",
    hotel_name: "Beachster",
  },
];

const custom_fonts = {
  font1: require("../fonts/Mochiy_Pop_One/MochiyPopOne-Regular.ttf"),
  font2: require("../fonts/Dongle/Dongle-Regular.ttf"),
  font2_bold: require("../fonts/Dongle/Dongle-Bold.ttf"),
  font3: require("../fonts/Red_Hat_Mono/static/RedHatMono-Regular.ttf"),
};

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      fonts: false,
    };
  }

  renderItem = ({ item: data }) => {
    return <Card data={data} navigation={this.props.navigation} />;
  };

  loadFont = async () => {
    await Fonts.loadAsync(custom_fonts);
    this.setState({ fonts: true });
  };

  componentDidMount() {
    this.loadFont();
  }

  render() {
    if (!this.state.fonts) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator size={80} color="yellow" />
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <View style={{ margin: 20 }}>
            <Text
              style={{ color: "yellow", fontFamily: "font3", fontSize: 15 }}
            >
              Welcome to{" "}
            </Text>
            <Text
              style={{
                color: "yellow",
                fontFamily: "font1",
                fontSize: 25,
                borderBottomRightRadius: 15,
                borderBottomWidth: 3,
                borderBottomColor: "yellow",
                marginBottom: 10,
              }}
            >
              Ethereal
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                style={{ marginBottom: 100 }}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => {
                  index.toString();
                }}
              />
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    height: "100%",
  },
});

export default Home;
