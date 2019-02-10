import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';


class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.topViewContainer}>
                    <ReusableHeader title="PROFILE"/>
                    <TouchableOpacity style={styles.button} />
                </View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    topViewContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1
    },
    button:{
        justifySelf: 'flex-end',
        width: 30,
        height: 30,
        color: '#ff4c0a',
        borderWidth: '5px'
    } 
});

export default ProfileScreen;