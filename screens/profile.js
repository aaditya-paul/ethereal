import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Fonts from "expo-font";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

const custom_fonts = {
  font1: require("../fonts/Mochiy_Pop_One/MochiyPopOne-Regular.ttf"),
  font2: require("../fonts/Dongle/Dongle-Regular.ttf"),
  font2_bold: require("../fonts/Dongle/Dongle-Bold.ttf"),
  font3: require("../fonts/Red_Hat_Mono/static/RedHatMono-Regular.ttf"),
};

var blob;

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      loading: true,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dob: "",
      address: "",
      pin: "",
      country: "",
      uid: "",
      state: true,
      about: "",
    };
  }

  checkIfUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      try {
        if (user) {
          this.setState({ uid: user.uid });
        } else {
          this.props.navigation.navigate("login");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  loadFonts = async () => {
    await Fonts.loadAsync(custom_fonts);
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.loadFonts();
    this.checkIfUserLoggedIn();
  }

  handleSubmitPress = () => {
    if (
      !this.state.firstName ||
      !this.state.country ||
      !this.state.lastName ||
      !this.state.phoneNumber ||
      !this.state.image ||
      !this.state.about
    ) {
      alert("PLEASE FILL ALL FIELDS FIRST");
    } else {
      console.log(`
      ${this.state.firstName}
      ${this.state.lastName}
      ${this.state.phoneNumber}
      ${this.state.country}
      ${this.state.image}
      ${this.state.about}
      `);

      firebase.firestore().collection("user").doc(this.state.uid).set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        country: this.state.country,
        state: this.state.state,
      });

      this.props.navigation.navigate("bottomTab");
      this.setState({ state: true });
    }
  };

  handleChoosePicPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const response = await fetch(result.uri);
      const blobPic = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child(this.state.uid + "/ProfilePic");
      return ref.put(blobPic);
    }
  };

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.centerBody}>
              <Text
                style={{ color: "yellow", fontFamily: "font1", fontSize: 25 }}
              >
                Profile
              </Text>

              <Image
                source={{
                  uri: !this.state.image
                    ? "data:image/png;base64,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"
                    : this.state.image,
                }}
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 20,
                  marginTop: 20,
                  borderRadius: 150 / 2,
                }}
              />

              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 3,
                  borderColor: "#4275a5",
                  borderRadius: 15,
                  paddingBottom: 5,
                  backgroundColor: "#4275a5",
                }}
                onPress={this.handleChoosePicPress}
              >
                <Text
                  style={{
                    color: "orange",
                    fontFamily: "font2_bold",
                    fontSize: 35,
                  }}
                >
                  Upload Pic <Feather name="camera" size={24} color="orange" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, margin: 30 }}>
              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  fontFamily: "font3",
                }}
              >
                First Name
              </Text>

              <TextInput
                style={styles.textInput}
                autoCapitalize="words"
                keyboardType="email-address"
                onChangeText={(t) => {
                  this.setState({ firstName: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />
              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  textAlign: "right",
                  marginTop: 20,
                  fontFamily: "font3",
                }}
              >
                Last Name
              </Text>
              <TextInput
                style={styles.textInput2}
                autoCapitalize="words"
                keyboardType="email-address"
                onChangeText={(t) => {
                  this.setState({ lastName: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  fontFamily: "font3",
                  marginTop: 20,
                }}
              >
                Phone Number
              </Text>

              <TextInput
                style={styles.textInput}
                autoCapitalize="words"
                keyboardType="number-pad"
                onChangeText={(t) => {
                  this.setState({ phoneNumber: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  textAlign: "right",
                  marginTop: 20,
                  fontFamily: "font3",
                }}
              >
                Country
              </Text>
              <TextInput
                style={styles.textInput2}
                autoCapitalize="words"
                keyboardType="email-address"
                onChangeText={(t) => {
                  this.setState({ country: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  fontFamily: "font3",
                  marginTop: 20,
                }}
              >
                About
              </Text>

              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                multiline={true}
                onChangeText={(t) => {
                  this.setState({ about: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <TouchableOpacity onPress={this.handleSubmitPress}>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "black",
                    backgroundColor: "#71f2b6",
                    padding: 15,
                    textAlign: "center",
                    fontSize: 35,
                    borderRadius: 20,
                    margin: 25,
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    } else {
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
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    height: "100%",
  },

  centerBody: {
    alignItems: "center",
    marginTop: 50,
  },

  header: {
    color: "yellow",
    marginTop: 45,
    margin: 20,
    fontFamily: "font1",
    fontSize: 30,
    flex: 3,
  },
  headerLow: {
    color: "yellow",
    marginTop: 35,
    margin: 20,
    fontFamily: "font2",
    fontSize: 25,
    flex: 1,
    textAlignVertical: "bottom",
  },
  textInput: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: 15,
    color: "white",
    borderWidth: 2,
    borderBottomColor: "white",
    borderBottomRightRadius: 20,
    width: "90%",
    fontFamily: "font3",
    textAlign: "left",
  },
  textInput2: {
    backgroundColor: "transparent",
    height: 50,
    width: "90%",
    fontSize: 15,
    color: "white",
    borderWidth: 2,
    borderBottomColor: "white",
    borderBottomLeftRadius: 20,
    alignSelf: "flex-end",
    fontFamily: "font3",
  },
  error: {
    backgroundColor: "#e55454",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  correct: {
    backgroundColor: "#4cf77f",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    textAlign: "center",
  },
});

export default Profile;
