import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class RegisterForm extends Component {
    render() {
        return (
            <View style={styles.formStyle}>
                <TextInput 
                    placeholder="Full Name"
                    returnKeyType="next"
                    style={styles.input}
                    onSubmitEditing={() => this.emailInput.focus()}
                />
                <TextInput 
                    placeholder="Email"
                    returnKeyType="next"
                    style={styles.input}
                    ref={(input) => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="next"
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.confirmInput.focus()}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    secureTextEntry
                    returnKeyType="go"
                    style={styles.input}
                    ref={(input) => this.confirmInput = input}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formStyle: {
       padding: 35,
    },
    input: {
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