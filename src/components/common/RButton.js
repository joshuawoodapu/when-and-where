import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const RButton = ({ onPress, children }) => {
    return (
        <View style={styles.viewStyle}>
          <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                  {children}
              </Text>
          </TouchableOpacity>
        </View>
    );
};

const styles = {
    buttonContainer: {
       backgroundColor: '#ED7248',
       borderRadius: 40,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 3 },
       shadowOpacity: 0.2,
       shadowRadius: 2,
       height: 48,
       justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
        height: 10
    },
    viewStyle: {
        paddingHorizontal: 48,
        paddingBottom: 25,
        paddingTop: 5,
      }
  };

export default RButton;
