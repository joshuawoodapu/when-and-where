import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Footer extends Component {
    render() {
        return (
           <View style={styles.footerStyle}>
                <Text style={styles.footerTextStyle}>By creating an account you agree to our terms of service and privacy policy.</Text>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    footerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 15,
    },
    footerTextStyle: {
        fontSize: 12,
        color: '#B8BeC1',
        fontWeight: 'bold',
        width: 250,
        textAlign: 'center',
    }
});