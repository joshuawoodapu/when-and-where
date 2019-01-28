import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class RegisterButton extends Component {
    render() {
        return (
            <View style={button.viewStyle}>
            <TouchableOpacity style={button.buttonContainer}>
                <Text style={button.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const button = StyleSheet.create({
    buttonContainer: {
       backgroundColor: '#ED7248',
       paddingVertical: 20,
       paddingHorizontal: 20,
       borderRadius: 30,
       width: 330,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});