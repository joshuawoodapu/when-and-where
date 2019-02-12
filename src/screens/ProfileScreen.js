import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';


class ProfileScreen extends Component {

    onPressProfile() {
        this.props.navigation.navigate('Settings');
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.topViewContainer}>
                    <ReusableHeader title="PROFILE"/>
                    <TouchableOpacity onPress={this.onPressProfile.bind(this)} style={styles.button} />
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
        width: 30,
        height: 30,
        color: '#ff4c0a',
        borderWidth: 5
    }
});

export default ProfileScreen;
