import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

export default class Tabs extends Component {
    render() {
        return (
            <View style={styles.parentView}>
                <View style={styles.tabsView}>
                    <View style={styles.activitiesTab}>
                    <TouchableWithoutFeedback

                    >
                        <Text style={styles.activeTabText}>
                            Activities
                        </Text>
                    </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.plansTab}>
                    <TouchableWithoutFeedback

                    >
                        <Text style={styles.inactiveTabText}>
                            Plans
                        </Text>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView style={styles.contentView}>
                    <Text>Discover this!</Text>
                </ScrollView>
            </View>
        );
    }
}

styles = StyleSheet.create({
    parentView: {
        flex: 1
    },
    tabsView: {
        height: 47,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    activitiesTab: {
        flex: 1,
        backgroundColor: '#F0F3F7'
    },
    plansTab: {
        flex: 2,
    },
    activeTabText: {
        color: '#413C77',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inactiveTabText: {
        color: '#6A6789',
        fontSize: 18,
        fontWeight: 'bold'
    },
    contentView: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#F0F3F7'
    }
})