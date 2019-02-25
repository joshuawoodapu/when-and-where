import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RHeader = ({children}) => {
    return (
        <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>
                {children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#413C77',
        fontWeight: 'bold',
    }
});

export default RHeader;
