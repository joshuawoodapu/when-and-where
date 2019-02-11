import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import ActivityCard from './ActivityCard';
import PlanCard from './PlanCard';
import Okay2 from '../components/common/Okay2';


export default class AATabs extends Component {
    state = {
        activeTab: 'search'
    };

    renderTabs() {
        if (this.state.activeTab === 'search') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.tabStyle, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.activeTabText}>
                                Search
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.tabStyle, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onPlansTabPress.bind(this)}
                        >
                            <Text style={styles.inactiveTabText}>
                                My Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        else if (this.state.activeTab === 'myactivities') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.tabStyle, styles.inactiveTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onActivitiesTabPress.bind(this)}
                        >
                            <Text style={styles.inactiveTabText}>
                                Search
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.tabStyle, styles.activeTab]}>
                        <TouchableWithoutFeedback
                            style={styles.touchableStyle}
                            onPress={this.onPlansTabPress.bind(this)}
                        >
                            <Text style={styles.activeTabText}>
                                My Activities
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }

    };
    renderContent() {
        if (this.state.activeTab === 'search') {
            return (
                <View style={styles.contentContainer}>
                    <View style={styles.tabsInputs}>
                      <Okay2 placeholderList={[
                          {placeholder: 'Search',
                            inputContainerStyle: 'tabsInput',
                            inputStyle: 'tabsText',
                            autoCapitalize: "words",
                            stateLabel: "search",
                            iconName: "search",
                            iconColor: "#605985",
                            iconSize: 22,
                            onChange: this.props.handleSearch},
                          {placeholder: 'Current Location',
                            inputContainerStyle: 'tabsInput',
                            inputStyle: 'tabsText',
                            returnKeyType: 'done',
                            stateLabel: "current_location",
                            iconName: "location-on",
                            iconColor: "#605985",
                            iconSize: 22,
                            onChange: this.props.handleLocation},
                          ]}
                      />
                    </View>
                    <View flex={6}>
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
                </View>
            );
        }
        else if (this.state.activeTab === 'myactivities') {
            return (
              <View style={styles.contentContainer}>
                  <View style={styles.tabsInputs}>
                  <Okay2 placeholderList={[
                      {placeholder: 'Search',
                        inputContainerStyle: 'tabsInput',
                        inputStyle: 'tabsText',
                        autoCapitalize: "words",
                        stateLabel: "search",
                        iconName: "search",
                        iconColor: "#605985",
                        iconSize: 22,
                        onChange: this.props.handleSearch},
                      {placeholder: 'Current Location',
                        inputContainerStyle: 'tabsInput',
                        inputStyle: 'tabsText',
                        returnKeyType: 'done',
                        stateLabel: "current_location",
                        iconName: "location-on",
                        iconColor: "#605985",
                        iconSize: 22,
                        onChange: this.props.handleLocation},
                      ]}
                  />
                  </View>
                  <View flex={6}>
                    <FlatList
                        data={[
                            {key: 'Great Falls'},
                            {key: 'Hanger 18'},
                            {key: 'Classic Coffee'}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <ActivityCard onCardPress={this.onActivityCardPress.bind(this)} text={item.key}/>
                        }
                    />
                  </View>
              </View>
            );
        }

    };

    onActivitiesTabPress() {
        if (this.state.activeTab !== 'search')
            this.setState({activeTab: 'search'})
    };

    onActivityCardPress() {
        this.props.navigation.navigate('Search');
    };

    onPlansTabPress() {
        if (this.state.activeTab !== 'myactivities')
            this.setState({activeTab: 'myactivities'})
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
        alignSelf: 'stretch',
    },
    activeTab: {
        backgroundColor: '#F0F3F7',
        borderTopRightRadius: 10,
    },
    inactiveTab: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 10,
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
    },
    tabsInputs:{
      flex: 1,
      justifyContent: "space-around",
      paddingVertical: 10,
      paddingHorizontal: 20
    },
})