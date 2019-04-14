import React from 'react';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import OnBoardingScreens from './src/screens/OnBoardingScreens';
import TestCustomActivityScreen from './src/screens/TestCustomActivityScreen';
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
import SharePlanModal from './src/screens/SharePlanModal';
import { Icon } from 'react-native-elements';

export default class App extends React.Component {
  componentWillMount() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
    firebase.initializeApp({
      apiKey: "AIzaSyDCp3X_njrJy-_RJYTzUOvWZQrPYdekBak",
      authDomain: "when-and-where-c8a71.firebaseapp.com",
      databaseURL: "https://when-and-where-c8a71.firebaseio.com",
      projectId: "when-and-where-c8a71",
      storageBucket: "when-and-where-c8a71.appspot.com",
      messagingSenderId: "521022677241"
    });
    global.apiKey = 'AIzaSyBwRjjKEx0uuRVz-iuvhx_zDTzcBYNHS5g';

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
        NewPlan1: NewPlan1Screen,
        CreateActivity: CreateActivityScreen,
        TestCustom: TestCustomActivityScreen,
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
        MyPlans: MyPlansScreen,
        Notifications: NotificationsScreen,

      }
    );
    const AppNavigator = createBottomTabNavigator(
      {
        SearchStack: {
            screen: SearchStackNav,
            path: '/',
            navigationOptions: {
              tabBarIcon: ({ focused, tintColor }) => {
                  const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                  return <Icon name="search" size={35} color={tintColor}/>;
              },
              tabBarLabel: false
          },
        },
        NewPlanStack: {
            screen: NewPlanStackNav,
            path: '/',
            navigationOptions: {
              tabBarIcon: ({ focused, tintColor  }) => {
                  const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                  return <Icon name="edit" size={35} color={tintColor}/>;
              },
          },
        },
        NewActivityStack: {
            screen: CreateActivityScreen,
            path: '/',
            navigationOptions: {
              tabBarIcon: ({ focused, tintColor  }) => {
                  const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                  return <Icon name="nature-people" size={35} color={tintColor}/>;
              },
          },
        },
        ProfileStack: {
            screen: ProfileStackNav,
            path: '/',
            navigationOptions: {
              tabBarIcon: ({ focused, tintColor }) => {
                  const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                  return <Icon name="person" size={38} color={tintColor}/>;
              },
          },
        }
      },
      {
        tabBarOptions: {
          showLabel: false,
          activeTintColor: "#ED7248",
          inactiveTintColor: "#B8BEC1"
        }
      },
      {
        headerMode: 'screen'
      },
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
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
