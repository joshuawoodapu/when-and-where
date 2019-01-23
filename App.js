import React from 'react';
import firebase from 'firebase';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import OnBoardingScreens from './screens/OnBoardingScreens';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';


export default class App extends Component {
  render() {
    return (
      <Header />
    );
  }
}


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
    const MainNavigator = createStackNavigator({
      OnBoarding: OnBoardingScreens,
      Login: LoginScreen,
      Registration: RegistrationScreen,
      Home: HomeScreen
    })
    const AppContainer = createAppContainer(MainNavigator);
    return (
      <AppContainer/>
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
