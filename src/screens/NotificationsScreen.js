import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';


class NotificationsScreen extends Component {
    render() {
        return (
            <View>
                <ReusableHeader title="NOTIFICATIONS"/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    mainContainer: {

    },
    notifsView: {

    },
});

export default NotificationsScreen;