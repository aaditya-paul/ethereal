import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/home";
import Add from "../screens/add"
import { Ionicons } from '@expo/vector-icons';
import ViewProfile from '../screens/viewProfile'

const Tab = createBottomTabNavigator()


export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
        <NavigationContainer >


        <Tab.Navigator initialRouteName='home'  screenOptions={{tabBarShowLabel:false,headerShown:false,tabBarStyle:[{display:"flex",backgroundColor:"black",   height:80,width:"100%",alignSelf:'center',padding:10}],tabBarActiveTintColor:"yellow",tabBarInactiveTintColor:"white",  }}  >
            <Tab.Screen name="home" component={Home} options={{tabBarLabel:"Home",tabBarIcon:({focused,color,size})=>(
              focused?<Ionicons name='ios-home' size={35} color={color} /> :
              <Ionicons name='ios-home-outline' size={35} color={color} />
            )
        }} />
            <Tab.Screen name="add" component={Add} options={{tabBarLabel:"Add",tabBarIcon:({focused,color,size})=>(
              
              focused?<Ionicons name="add-circle" size={35} color={color}  />:
              <Ionicons name="add-circle-outline" size={35} color={color}  />

             )
        } } />
            <Tab.Screen name="profile" component={ViewProfile} options={{tabBarLabel:"Add",tabBarIcon:({focused,color,size})=>(
              
              focused?<Ionicons name="person-circle" size={35} color={color}  />:
              <Ionicons name="person-circle-outline" size={35} color={color}  />

             )
        } } />
        </Tab.Navigator>
 
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({})

