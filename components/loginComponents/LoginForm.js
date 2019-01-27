import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.formStyle}>
                <TextInput 
                    placeholder="Email"
                    returnKeyType="next"
                    style={styles.input1}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="next"
                    style={styles.input2}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formStyle: {
      // padding: 35,
       justifyContent: 'space-between',
    },

    input2: {
        height: 50,
        backgroundColor: '#ffffff',
        //marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
    input1: {
        height: 50,
        backgroundColor: '#ffffff',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    }
});