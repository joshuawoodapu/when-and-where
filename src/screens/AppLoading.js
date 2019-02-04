import React, { Component } from 'react';
import {View, AsyncStorage, Image} from 'react-native';

class AppLoading extends Component {
    componentWillMount = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        this.props.navigation.navigate(userToken ? 'App' : 'Auth');

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