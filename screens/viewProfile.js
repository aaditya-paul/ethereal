import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import * as Fonts from "expo-font";
import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";

var u;

const custom_fonts = {
  font1: require("../fonts/Mochiy_Pop_One/MochiyPopOne-Regular.ttf"),
  font2: require("../fonts/Dongle/Dongle-Regular.ttf"),
  font2_bold: require("../fonts/Dongle/Dongle-Bold.ttf"),
  font3: require("../fonts/Red_Hat_Mono/static/RedHatMono-Regular.ttf"),
};

export default class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uid: "",
      link: "",
      pic: false,

      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      address: "",
      about: "",
    };
  }

  _loadFonts = async () => {
    await Fonts.loadAsync(custom_fonts);
    this.setState({ loading: false });
  };

  _getDetails = async () => {
    var uid = firebase.auth().currentUser.uid.toString();
    var ref = firebase.firestore().collection("user").doc(uid);
    var data = await ref.get();
    var firstName = data.data().firstName;
    var lastName = data.data().lastName;
    var phone = data.data().phoneNumber;
    var country = data.data().country;
    var about = data.data().about;

    this.setState({
      firstName: firstName,
      lastName: lastName,
      country: country,
      about: about,
      phone: phone,
    });

    console.log(`
    ${firstName}
    `);
  };

  _getUser = async () => {
    var uid = await firebase.auth().currentUser.uid;
    var suid = uid.toString();
    this.setState({ uid: suid });
    console.log(this.state.uid);
    u = suid;
  };

  _getProfilePic = async () => {
    var ref = firebase
      .storage()
      .ref(u)
      .getDownloadURL()
      .then((url) => {
        console.log("iuoij");
      });
  };
  componentDidMount() {
    this._loadFonts();
    this._getUser();
    this._getProfilePic();
    this._getDetails();
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
        <View style={{ backgroundColor: "black", height: "100%" }}>
          <ScrollView>
            <View>
              <Image
                source={{
                  uri: "https://wallpaperaccess.com/full/84248.png",
                }}
                resizeMode="cover"
                style={{ height: 300, width: "100%" }}
              />
            </View>
            <View
              style={{
                borderColor: "white",
                borderWidth: 5,
                position: "relative",
                bottom: 170,
                marginBottom: 20,
                backgroundColor: "white",
                marginTop: 100,
                height: 160,
                width: 160,
                borderRadius: 160 / 2,
                alignSelf: "center",
              }}
            >
              {!this.state.pic ? (
                <TouchableOpacity
                  onPress={async () => {
                    var ref = await firebase
                      .storage()
                      .ref(this.state.uid + "/ProfilePic/")
                      .getDownloadURL()
                      .then((url) => {
                        console.log(url);
                        this.setState({ link: url, pic: true });
                      });
                  }}
                  style={{
                    height: 150,
                    width: 150,
                    position: "relative",
                    top: 45,
                    left: 45,
                  }}
                >
                  <AntDesign name="reload1" size={55} color="black" />
                </TouchableOpacity>
              ) : (
                <Image
                  style={{ height: 150, borderRadius: 150 / 2 }}
                  resizeMode="cover"
                  source={{
                    uri: this.state.link,
                  }}
                />
              )}
            </View>

            <View
              style={{
                position: "relative",
                bottom: 150,
                padding: 15,
                margin: 10,
                borderRadius: 15,
              }}
            >
              <View style={styles.textView}>
                <Text style={styles.text}>
                  {this.state.firstName} {this.state.lastName}
                </Text>
              </View>

              <View style={styles.textView}>
                <Text style={styles.text}>{this.state.phone}</Text>
              </View>

              <View style={styles.textView}>
                <Text style={styles.text}>{this.state.country}</Text>
              </View>

              <View style={styles.textView}>
                <Text style={styles.text}>{this.state.about}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "font1",
    color: "#F7DA7E",
  },
  textView: {
    backgroundColor: "rgba(255, 255, 255,0.09)",
    padding: 20,
    margin: 2,
    marginBottom: 30,
    shadowColor: "gray",
    shadowOffset: { width: 1, height: -5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
});
