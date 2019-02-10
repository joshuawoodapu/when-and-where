import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';


class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <ReusableHeader title="PROFILE"/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});

export default ProfileScreen;