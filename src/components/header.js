import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
    render() {
        return (
           <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>Create an Account</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#0036d6',
        fontWeight: 'bold',
    }
});