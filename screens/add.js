import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Picker,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import * as Fonts from "expo-font";

const custom_fonts = {
  font1: require("../fonts/Mochiy_Pop_One/MochiyPopOne-Regular.ttf"),
  font2: require("../fonts/Dongle/Dongle-Regular.ttf"),
  font2_bold: require("../fonts/Dongle/Dongle-Bold.ttf"),
  font3: require("../fonts/Red_Hat_Mono/static/RedHatMono-Regular.ttf"),
};

export default class Add extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      state: "",
      city: "",
      locality: "",
      hotel_name: "",
      about: "",
    };
  }

  _loadFonts = async () => {
    await Fonts.loadAsync(custom_fonts);
    this.setState({ loading: false });
  };

  btnPress = () => {
    if (
      this.state.state === null ||
      this.state.city === "" ||
      this.state.locality === ""
    ) {
      alert("Fill all the details.");
    } else {
      console.log(`
      ${this.state.state}
      ${this.state.city}
      ${this.state.locality}
      ${this.state.hotel_name}
      ${this.state.about}
      `);

      firebase
        .firestore()
        .collection(this.state.state)
        .doc(`${this.state.city}|${this.state.locality}`)
        .set({
          city: this.state.city,
          uid: firebase.auth().currentUser.uid,
        });
    }
  };

  componentDidMount() {
    this._loadFonts();
  }

  render() {
    if (this.state.loading) {
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
          <ScrollView>
            <Text
              style={{
                color: "yellow",
                fontFamily: "font2_bold",
                margin: 20,
                fontSize: 50,
                marginBottom: 10,
                marginTop: 50,
              }}
            >
              State
            </Text>

            <Picker
              style={{
                color: "orange",
                borderColor: "white",
                borderWidth: 5,
                width: "100%",
                marginLeft: 10,
                borderColor: "yellow",
                borderWidth: 5,
              }}
              selectedValue={this.state.state}
              onValueChange={(itemValue) => {
                this.setState({ state: itemValue });
              }}
            >
              <Picker.Item label="CHOOSE A STATE" value={null} />
              <Picker.Item label="Andhra Pradesh" value="andhra_pradesh" />
              <Picker.Item
                label="Arunachal Pradesh"
                value="arunachal_pradesh"
              />
              <Picker.Item label="Assam" value="assam" />
              <Picker.Item label="Bihar" value="bihar" />
              <Picker.Item label="Chhattisgarh" value="chhattisgarh" />
              <Picker.Item label="Goa" value="goa" />
              <Picker.Item label="Gujarat" value="gujarat" />
              <Picker.Item label="Haryana" value="haryana" />
              <Picker.Item label="Himachal Pradesh" value="himachal_pradesh" />
              <Picker.Item label="Jharkhand" value="jharkhand" />
              <Picker.Item label="Karnataka" value="karnataka" />
              <Picker.Item label="Kerala" value="kerala" />
              <Picker.Item label="Madhya Pradesh" value="madhya_pradesh" />
              <Picker.Item label="Maharashtra" value="maharashtra" />
              <Picker.Item label="Manipur" value="manipur" />
              <Picker.Item label="Meghalaya" value="meghalaya" />
              <Picker.Item label="Mizoram" value="mizoram" />
              <Picker.Item label="Nagaland" value="nagaland" />
              <Picker.Item label="Odisha" value="odisha" />
              <Picker.Item label="Punjab" value="punjab" />
              <Picker.Item label="Rajasthan" value="rajasthan" />
              <Picker.Item label="Sikkim" value="sikkim" />
              <Picker.Item label="Tamil Nadu" value="tamil_nadu" />
              <Picker.Item label="Telangana" value="telangana" />
              <Picker.Item label="Tripura" value="tripura" />
              <Picker.Item label="Uttar Pradesh" value="uttar_pradesh" />
              <Picker.Item label="Uttarakhand" value="uttarakhand" />
              <Picker.Item label="West Bengal" value="west_bengal" />
            </Picker>

            <Text
              style={{
                color: "yellow",
                fontFamily: "font2_bold",
                margin: 20,
                marginBottom: 10,
                fontSize: 50,
                alignSelf: "flex-end",
              }}
            >
              City
            </Text>

            <TextInput
              style={styles.textInput2}
              onChangeText={(t) => {
                this.setState({ city: t });
              }}
              ref={(r) => {
                this.emailF = r;
              }}
            />
            <Text
              style={{
                color: "yellow",
                fontFamily: "font2_bold",
                margin: 20,
                marginBottom: 10,
                fontSize: 50,
              }}
            >
              Locality
            </Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(t) => {
                this.setState({ locality: t });
              }}
              ref={(r) => {
                this.emailF = r;
              }}
            />

            <Text
              style={{
                color: "yellow",
                fontFamily: "font2_bold",
                margin: 20,
                marginBottom: 10,
                fontSize: 50,
                alignSelf: "flex-end",
              }}
            >
              Hotel Name
            </Text>

            <TextInput
              style={styles.textInput2}
              onChangeText={(t) => {
                this.setState({ hotel_name: t });
              }}
              ref={(r) => {
                this.emailF = r;
              }}
            />

            <Text
              style={{
                color: "yellow",
                fontFamily: "font2_bold",
                margin: 20,
                marginBottom: 10,
                fontSize: 50,
              }}
            >
              About
            </Text>

            <TextInput
              style={styles.textInput}
              multiline={true}
              onChangeText={(t) => {
                this.setState({ about: t });
              }}
              ref={(r) => {
                this.emailF = r;
              }}
            />

            <TouchableOpacity
              style={{
                alignSelf: "center",
                padding: 20,
                backgroundColor: "tomato",
                marginTop: 20,
                width: "30%",
                borderColor: "crimson",
                borderWidth: 2,
                borderRadius: 15,
                marginBottom: 20,
              }}
              onPress={this.btnPress}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "font2_bold",
                  fontSize: 25,
                  color: "white",
                }}
              >
                ADD
              </Text>
            </TouchableOpacity>
          </ScrollView>
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

  textInput: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: 15,
    color: "white",
    borderWidth: 2,
    borderBottomColor: "white",
    borderBottomRightRadius: 20,
    width: "80%",
    fontFamily: "font3",
    marginLeft: 20,
  },
  textInput2: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: 15,
    color: "white",
    borderWidth: 2,
    borderBottomColor: "white",
    borderBottomLeftRadius: 20,
    width: "80%",
    fontFamily: "font3",
    marginRight: 20,
    alignSelf: "flex-end",
  },
});
