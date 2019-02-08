import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SharePlanModal extends Component {
    render() {
        return (
           <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>Share Plan</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    }
});