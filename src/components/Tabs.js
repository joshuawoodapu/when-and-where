import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

export default class Tabs extends Component {
    state = {
        activeTab: 'activities'
    };

    renderTabs() {
        if (this.state.activeTab === 'activities') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.activitiesTab, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.activeTabText}>
                                Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.plansTab, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            onPress={this.onPlansTabPress.bind(this)}
                        >
                            <Text style={styles.inactiveTabText}>
                                Plans
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        else if (this.state.activeTab === 'plans') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.activitiesTab, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.inactiveTabText}>
                                Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.plansTab, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            onPress={this.onPlansTabPress.bind(this)}
                        >
                            <Text style={styles.activeTabText}>
                                Plans
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }

    };
    renderContent() {
        if (this.state.activeTab === 'activities') {
            return (
                <ScrollView style={styles.contentView}>
                    <Text>Activities!</Text>
                </ScrollView>
            );
        }
        else if (this.state.activeTab === 'plans') {
            return (
                <ScrollView style={styles.contentView}>
                    <Text>Plans!</Text>
                </ScrollView>
            );   
        }

    };

    onActivitiesTabPress() {
        if (this.state.activeTab === 'plans')
            this.setState({activeTab: 'activities'})
    };

    onPlansTabPress() {
        if (this.state.activeTab === 'activities')
            this.setState({activeTab: 'plans'})
    };

    render() {
        return (
            <View style={styles.parentView}>
                {this.renderTabs()}
                {this.renderContent()}
            </View>
        );
    }
}

styles = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: 'column'
    },
    tabsView: {
        height: 47,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activitiesTab: {
        flex: 1,
    },
    plansTab: {
        flex: 2,
    },
    activeTab: {
        backgroundColor: '#F0F3F7'
    },
    inactiveTab: {
        backgroundColor: '#FFFFFF'
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
        backgroundColor: '#F0F3F7',
    }
})