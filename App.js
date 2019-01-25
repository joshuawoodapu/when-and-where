import React from 'react';
import firebase from 'firebase';
import Swiper from 'react-native-swiper';
import Connect from './src/onboardingScreens/Connect';
import Create from './src/onboardingScreens/Create';
import Discover from './src/onboardingScreens/Discover';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDCp3X_njrJy-_RJYTzUOvWZQrPYdekBak",
      authDomain: "when-and-where-c8a71.firebaseapp.com",
      databaseURL: "https://when-and-where-c8a71.firebaseio.com",
      projectId: "when-and-where-c8a71",
      storageBucket: "when-and-where-c8a71.appspot.com",
      messagingSenderId: "521022677241"
    });
  }

  render() {
    return (
      <Swiper loop={false} dotColor={'#B0CAED'} activeDotColor={'#2661B2'}>
        <Discover />
        <Create />
        <Connect />
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
