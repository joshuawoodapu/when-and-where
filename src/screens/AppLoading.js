import React, { Component } from 'react';
import {View, AsyncStorage, Image} from 'react-native';
import firebase from 'firebase';

class AppLoading extends Component {
    componentWillMount = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const logged = await AsyncStorage.getItem('logged');
        //console.log(user);
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