import React, { Component } from 'react';
import {View, Text} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';


class ProfileScreen extends Component {
    render() {
        return (
            <View>
                <ReusableHeader title="PROFILE"/>
            </View>
        )
    }
}

export default ProfileScreen;