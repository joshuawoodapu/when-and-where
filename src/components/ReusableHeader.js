import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ReusableHeader extends Component {
    render() {
        return (
           <View style={styles.headerStyle}>
                  <Text style={styles.headerTextStyle}>{this.props.title}</Text>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%'
    },
    headerTextStyle: {
        fontSize: 15,
        color: '#2661B2',
        fontWeight: 'bold',
    }
});