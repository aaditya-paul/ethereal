import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Fonts from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

const custom_fonts = {
  "font1": require("../fonts/Mochiy_Pop_One/MochiyPopOne-Regular.ttf"),
  "font2": require("../fonts/Dongle/Dongle-Regular.ttf"),
  "font2_bold": require("../fonts/Dongle/Dongle-Bold.ttf"),
  "font3": require("../fonts/Red_Hat_Mono/static/RedHatMono-Regular.ttf"),
};

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      emailFocus: "",
      fonts: false,
      email: "",
      pass: "",
      error: null,
      errorB: false,
      name: "",
      loading: "",
    };
  }

  loadFont = async () => {
    await Fonts.loadAsync(custom_fonts);
    this.setState({ fonts: true });
  };

  renderError = () => {
    return (
      <View style={styles.error}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "font2_bold",
            fontSize: 30,
          }}
        >
          {this.state.error}
        </Text>
      </View>
    );
  };

  renderCorrect = () => {
    return (
      <View style={styles.correct}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "font2_bold",
            fontSize: 30,
          }}
        >
          No Error
        </Text>
      </View>
    );
  };

  btnPressN = () => {
    this.setState({ loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then(async () => {
        this.setState({ loading: true, error: null });
        this.props.navigation.navigate("profile");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ error: e.message, errorB: true, loading: false });
      });
  };

  componentDidMount() {
    this.loadFont();
  }
  render() {
    if (this.state.fonts) {
      return (
        <View style={styles.main}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.header}> SIGN UP </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("login");
              }}
            >
              <Text style={styles.headerLow}> login </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.body}>
              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  fontFamily: "font3",
                }}
              >
                Name
              </Text>

              <TextInput
                style={styles.textInput}
                autoCapitalize="words"
                keyboardType="name-phone-pad"
                onChangeText={(t) => {
                  this.setState({ name: t });
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
                Email
              </Text>
              <TextInput
                style={styles.textInput2}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(t) => {
                  this.setState({ email: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <Text
                style={{
                  color: "orange",
                  fontSize: 25,
                  textAlign: "left",
                  marginTop: 20,
                  fontFamily: "font3",
                }}
              >
                Password
              </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="visible-password"
                onChangeText={(t) => {
                  this.setState({ pass: t });
                }}
                ref={(r) => {
                  this.emailF = r;
                }}
              />

              <TouchableOpacity onPress={this.btnPressN}>
                <View
                  style={{
                    backgroundColor: "#262121",
                    marginTop: 50,
                    height: 80,
                    borderRadius: 40,
                    width: 80,
                    alignSelf: "center",
                  }}
                >
                  {!this.state.loading ? (
                    <Text
                      style={{
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      <AntDesign
                        name="arrowright"
                        size={35}
                        color="yellow"
                        style={{ fontWeight: "bold" }}
                      />
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 15,
                      }}
                    >
                      <ActivityIndicator size={50} color="yellow" />
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              {this.state.errorB == true ? this.renderError() : null}
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

  body: {
    marginTop: 50,
    margin: 30,
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

export default SignUp;
