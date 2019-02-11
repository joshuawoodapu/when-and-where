import React from 'react';
import firebase from 'firebase';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import OnBoardingScreens from './src/screens/OnBoardingScreens';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import NewPlanScreen from './src/screens/NewPlanScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';
import CreateActivityScreen from './src/screens/CreateActivityScreen';
import ActivityScreen from './src/screens/ActivityScreen';



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
    const AppNavigatorNav = createBottomTabNavigator(
      {
        SearchStack: SearchStackNav,
        NewPlanStack: NewPlanStackNav,
        NotificationsStack: NotificationsStackNav,
        ProfileStack: ProfileStackNav
      }
    );
    const MainNavigator = createStackNavigator(
      {
        OnBoarding: OnBoardingScreens,
        Login: LoginScreen,
        Registration: RegistrationScreen,
        AppNav: AppNavigatorNav
      },
      {
        headerMode: 'screen'
      }
    );
    const AppContainer = createAppContainer(MainNavigator);
    return (
      <AppContainer/>
    );
  }
}
