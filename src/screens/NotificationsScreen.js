import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import Notification from '../components/NotificationComponents/Notification';


class NotificationsScreen extends Component {

        static navigationOptions = ({navigation}) => ({
            headerTitle: 'NOTIFICATIONS',
            headerTitleStyle: {
                color: '#2661B2',
                fontSize: 14,
                fontFamily: 'circular-std-bold',
            },
        });


    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.oldText}>New</Text>
                <View style={styles.notifsView}>
                     <Notification iconName='notifications' message="Notification 1"/>
                     <Notification iconName='notifications' message="Notification 2"/>
                     <Notification iconName='notifications' message="Notification 3"/>
                </View>
                <Text style={styles.earlierText}>Earlier</Text>
                <View style={styles.notifsView}>
                     <Notification iconName='notifications' message="Notification 1"/>
                     <Notification iconName='notifications' message="Notification 2"/>
                     <Notification iconName='notifications' message="Notification 3"/>
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
        fontWeight: 'bold',
        fontFamily: 'circular-std-bold',

    },
    earlierText: {
        marginTop: '5%',
        marginLeft: '5%',
        color: '#727E83',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'circular-std-bold',

    }
});

export default NotificationsScreen;
