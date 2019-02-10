import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import Notification from '../components/NotificationComponents/Notification';


class NotificationsScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <ReusableHeader title="NOTIFICATIONS"/>
                <Text style={styles.oldText}>New</Text>
                <View style={styles.notifsView}>
                     <Notification iconName='bells' message="Notification 1"/>
                     <Notification iconName='bells' message="Notification 2"/>
                     <Notification iconName='bells' message="Notification 3"/>
                </View>
                <Text style={styles.earlierText}>Earlier</Text>
                <View style={styles.notifsView}>
                     <Notification iconName='bells' message="Notification 1"/>
                     <Notification iconName='bells' message="Notification 2"/>
                     <Notification iconName='bells' message="Notification 3"/>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    notifsView: {
        alignContent: 'center',
    },
    oldText: {
        marginLeft: '5%',
        color: '#727E83',
        fontSize: 15,
        fontWeight: 'bold'

    },
    earlierText: {
        marginTop: '5%',
        marginLeft: '5%',
        color: '#727E83',
        fontSize: 15,
        fontWeight: 'bold'

    }
});

export default NotificationsScreen;