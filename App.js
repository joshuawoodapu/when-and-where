import React from 'react';
import firebase from 'firebase';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import OnBoardingScreens from './src/screens/OnBoardingScreens';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import NewPlanScreen from './src/screens/NewPlanScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AppLoading from './src/screens/AppLoading';



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
    const SearchStackNav = createStackNavigator(
      {
        Discovery: DiscoveryScreen
      }
    );
    const NewPlanStackNav = createStackNavigator(
      {
        NewPlan: NewPlanScreen
      }
    );
    const NotificationsStackNav = createStackNavigator(
      {
        Notifications: NotificationsScreen
      }
    );
    const ProfileStackNav = createStackNavigator(
      {
        Profile: ProfileScreen
      }
    );
    const AppNavigator = createBottomTabNavigator(
      {
        SearchStack: SearchStackNav,
        NewPlanStack: NewPlanStackNav,
        NotificationsStack: NotificationsStackNav,
        ProfileStack: ProfileStackNav
      },
      {
        headerMode: 'screen'
      }
    );
    const AuthStack = createStackNavigator(
      {
        OnBoarding: OnBoardingScreens,
        Login: LoginScreen,
        Registration: RegistrationScreen
      },
      {
        headerMode: 'screen'
      }
    );
    const AppContainer = createAppContainer(createSwitchNavigator(
      {
        App: AppNavigator,
        Auth: AuthStack,
        Loading: AppLoading
      },
      {
        initialRouteName: 'Loading',
      }
    ));
    return (
      <AppContainer/>
    );
  }
}
