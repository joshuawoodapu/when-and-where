import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import ActivityCard from './ActivityCard';
import PlanCard from './PlanCard';


export default class Tabs extends Component {
    state = {
        activeTab: 'activities'
    };

    renderTabs() {
        if (this.state.activeTab === 'activities') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.tabStyle, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.activeTabText}>
                                Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.tabStyle, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
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
                    <View style={[styles.tabStyle, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.inactiveTabText}>
                                Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.tabStyle, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
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
                <View style={styles.contentContainer}>
                    <FlatList
                        data={[
                            {key: 'Aloha Sushi'},
                            {key: 'Amoeba Records'},
                            {key: 'Hanger 18'}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <ActivityCard onCardPress={this.onActivityCardPress.bind(this)} text={item.key}/>
                        }
                    />
                </View>
            );
        }
        else if (this.state.activeTab === 'plans') {
            return (
                <View style={styles.contentContainer}>
                    <FlatList
                        data={[
                            {key: 'Janet\'s Birthday'},
                            {key: 'Halloween Party'},
                            {key: 'Galentine\'s Day'}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <PlanCard text={item.key}/>
                        }
                    />
                </View>
            );
        }

    };

    onActivitiesTabPress() {
        if (this.state.activeTab !== 'activities')
            this.setState({activeTab: 'activities'})
    };

    onActivityCardPress() {
        this.props.navigation.navigate('Activity');
    };

    onPlansTabPress() {
        if (this.state.activeTab !== 'plans')
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
        flex: 1
    },
    flatView: {
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: 100
    },
    tabsView: {
        height: 47,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tabStyle: {
        width: Dimensions.get('window').width/2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    touchableStyle: {
        alignSelf: 'stretch'
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
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    contentStyle: {
        backgroundColor: '#F0F3F7',
    },
    contentContainer: {
        backgroundColor: '#F0F3F7',
        flex: 1
    }
})
