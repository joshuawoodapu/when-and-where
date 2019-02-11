import React from 'react';
import firebase from 'firebase';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import OnBoardingScreens from './src/screens/OnBoardingScreens';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import MyPlansScreen from './src/screens/MyPlansScreen';
import NewPlanScreen from './src/screens/NewPlanScreen';
import NewPlan1Screen from './src/screens/NewPlan1Screen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AppLoading from './src/screens/AppLoading';
import ActivityScreen from './src/screens/ActivityScreen';
import CreateActivityScreen from './src/screens/CreateActivityScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';
import ViewPlanScreen from './src/screens/ViewPlanScreen';
import PlanOptionsScreen from './src/screens/PlanOptionsScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import VotingScreen from './src/screens/VotingScreen';
import InviteCollabScreen from './src/screens/InviteCollabScreen';


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
        Discovery: DiscoveryScreen,
        Activity: ActivityScreen,
        PlanView: ViewPlanScreen,
        PlanOptions: PlanOptionsScreen,
        CommentsView: CommentsScreen,
        AddActivity: AddActivityScreen,
        VotingView: VotingScreen,
        CollabInvite: InviteCollabScreen
      }
    );
    const NewPlanStackNav = createStackNavigator(
      {
        NewPlan: NewPlanScreen,
        NewPlan1 : NewPlan1Screen,
        CreateActivity: CreateActivityScreen
      }
    );
    const NotificationsStackNav = createStackNavigator(
      {
        Notifications: NotificationsScreen
      }
    );
    const ProfileStackNav = createStackNavigator(
      {
        Profile: ProfileScreen,
        Settings: SettingsScreen,
        MyPlans: MyPlansScreen
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