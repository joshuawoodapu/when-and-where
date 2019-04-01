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
        alignItems: 'center',
        justifyContent: 'center',
        //paddingBottom: 5,
        paddingTop: 10,
        flex: 1,
    },
    footerTextStyle: {
        fontSize: 12,
        color: '#B8BeC1',
        width: 250,
        textAlign: 'center',
    }
});
