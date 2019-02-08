import React, { Component } from 'react';
import {View, AsyncStorage, Image} from 'react-native';
import { Font } from 'expo';
import firebase from 'firebase';

class AppLoading extends Component {
    state = {fontLoaded: false}

    async componentDidMount() {
        await Font.loadAsync({
            'circular-std-black': require('../../assets/fonts/CircularStd-Black.otf'),
            'circular-std-black-italic': require('../../assets/fonts/CircularStd-BlackItalic.otf'),
            'circular-std-book': require('../../assets/fonts/CircularStd-Book.otf'),
            'circular-std-book-italic': require('../../assets/fonts/CircularStd-BookItalic.otf'),
            'circular-std-bold': require('../../assets/fonts/CircularStd-Bold.otf'),
            'circular-std-bold-italic': require('../../assets/fonts/CircularStd-BoldItalic.otf'),
            'circular-std-medium': require('../../assets/fonts/CircularStd-Medium.otf'),
            'circular-std-medium-italic': require('../../assets/fonts/CircularStd-MediumItalic.otf'),

          });
        this.setState({ fontLoaded:true })
        //const accessToken = await AsyncStorage.getItem('accessToken');
        //const refreshToken = await AsyncStorage.getItem('refreshToken');
        const logged = await AsyncStorage.getItem('logged');
        this.props.navigation.navigate(logged ? 'App' : 'Auth');
      }
    render() {
        return (
            <View>
                <Image
                    source={require('../../assets/splash.png')}
                />
            </View>
        )
    }
}

export default AppLoading;