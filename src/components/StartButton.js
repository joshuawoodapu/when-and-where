import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class StartButton extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>LET'S START!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
       backgroundColor: '#ED7248',
       paddingVertical: 20,
       paddingHorizontal: 20,
       borderRadius: 40,
       width: 330,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 3 },
       shadowOpacity: 0.2,
       shadowRadius: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
