import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
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
                    <View style={[styles.activeLeft, styles.activeTab]}>
                        <TouchableHighlight
                            style={styles.activeLeft}
                            onPress={this.onActivitiesTabPress.bind(this)}
                            key={"search-active"}
                            underlayColor="#F0F3F7"
                            activeOpacity={1}
                        >
                                <Text style={styles.activeTabText}>
                                    Activities
                                </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.inactiveRight, styles.inactiveTab]}>
                        <TouchableHighlight
                            style={styles.inactiveRight}
                            onPress={this.onPlansTabPress.bind(this)}
                            key={"myactivities-inactive"}
                        >
                            <Text style={styles.inactiveTabText}>
                                Plans
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        else if (this.state.activeTab === 'plans') {
            return (
                <View style={styles.tabsView}>
                <View style={[styles.inactiveLeft, styles.inactiveTab]}>
                    <TouchableHighlight
                        style={styles.inactiveLeft}
                        onPress={this.onActivitiesTabPress.bind(this)}
                        key={"search-inactive"}
                    >
                        <Text style={styles.inactiveTabText}>
                            Activities
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={[styles.activeRight, styles.activeTab]}>
                    <TouchableHighlight
                        style={styles.activeRight}
                        onPress={this.onPlansTabPress.bind(this)}
                        key={"myactivities-active"}
                        underlayColor="#F0F3F7"
                        activeOpacity={1}
                    >
                        <Text style={styles.activeTabText}>
                            Plans
                        </Text>
                    </TouchableHighlight>
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
                        /*
                        data={[
                            {key: 'Janet\'s Birthday'},
                            {key: 'Halloween Party'},
                            {key: 'Galentine\'s Day'}
                        ]}
                        */
                        data={Object.entries(this.props.planData)}
                        keyExtractor= {(item) => {
                            return item[0];
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <PlanCard onCardPress={this.onPlansCardPress.bind(this)} text={item.key}/>
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

    onPlansCardPress() {
        this.props.navigation.navigate('PlanView');
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
        fontFamily: 'circular-std-bold'
    },
    inactiveTabText: {
        color: '#6A6789',
        fontSize: 18,
        fontFamily: 'circular-std-bold'
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
