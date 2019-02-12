import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import AAActivityCard from './AAActivityCard';
import DynamicInput from '../components/common/DynamicInput';


export default class AATabs_FixTabs extends Component {
    state = {
        activeTab: 'search'
    };

    renderTabs() {
        if (this.state.activeTab === 'search') {
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
                                    Search
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
                                My Activities
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        else if (this.state.activeTab === 'myactivities') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.inactiveLeft, styles.inactiveTab]}>
                        <TouchableHighlight
                            style={styles.inactiveLeft}
                            onPress={this.onActivitiesTabPress.bind(this)}
                            key={"search-inactive"}
                        >
                            <Text style={styles.inactiveTabText}>
                                Search
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
                                My Activities
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

    };
    renderContentHeader() {
      return(
        <View style={styles.tabsInputs}>
          <DynamicInput placeholderList={[
              {placeholder: 'Search',
                inputContainerStyle: 'tabsInput',
                inputStyle: 'tabsText',
                autoCapitalize: "words",
                stateLabel: "search",
                iconStyle: "Icon",
                iconName: "search",
                iconColor: "#605985",
                iconSize: 22},
              {placeholder: 'Current Location',
                inputContainerStyle: 'tabsInput',
                inputStyle: 'tabsText',
                returnKeyType: 'done',
                stateLabel: "current_location",
                iconStyle: "Icon",
                iconName: "location-on",
                iconColor: "#605985",
                iconSize: 22},
              ]}
          />
        </View>
      );
    };

    renderContentFooter() {
        if (this.state.activeTab === 'search') {
          var activities = [{title: 'Aloha Sushi', add: true, address: '3030 Freedom Lane, Merced, CA 95340', stars: 5, favorited: true},
            {title: 'Mystic Sports', add: true, address: '465 Edsel Road, Irvine, CA 92614', stars: 4},
            {title: 'Primedia', add: true, address: '3903 Turnley Ave, Oakland, CA, 94605', stars: 4, favorited: true},
            {title: 'Glaciarts', address: '3904 Sarno Ct, Moorpark, CA, 93021', stars: 2},
            {title: 'Ridgeco', add: true, address: '3906 Chelsea Ct, Rocklin, CA, 95677', stars: 4},
            {title: 'Lucent Bar & Grille', address: '3906 Mayfield St, Newbury Park, CA, 91320', stars: 3},];

          return (
              <View flex={6} paddingHorizontal={15}>
                <FlatList
                    data={activities}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                      <AAActivityCard
                        key={item.id}
                        onCardPress={this.onRActivityCardPress.bind(this)}
                        title={item.title}
                        add={item.add}
                        text={item.title}
                        address={item.address}
                        stars={item.stars}
                        favorited={item.favorited}
                      />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
              </View>
          );
        }
        else if (this.state.activeTab === 'myactivities') {
          var activities = [{title: 'Aloha Sushi', add: true, address: '3030 Freedom Lane, Merced, CA 95340', stars: 5, favorited: true},
            {title: 'Primedia', add: true, address: '3903 Turnley Ave, Oakland, CA, 94605', stars: 4, favorited: true},];

          return (
              <View flex={6} paddingHorizontal={15}>
                <FlatList
                    data={activities}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                      <AAActivityCard
                        key={item.id}
                        onCardPress={this.onRActivityCardPress.bind(this)}
                        title={item.title}
                        add={item.add}
                        text={item.title}
                        address={item.address}
                        stars={item.stars}
                        favorited={item.favorited}
                      />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
              </View>
          );
        }
    };

    onActivitiesTabPress() {
        if (this.state.activeTab !== 'search')
            this.setState({activeTab: 'search'})
    };

    onRActivityCardPress() {
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
                <View style={styles.contentContainer}>
                  {this.renderContentHeader()}
                  {this.renderContentFooter()}
                </View>
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
    activeLeft: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 10,
    },
    activeRight: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
    },
    activeTab: {
        backgroundColor: '#F0F3F7',
    },
    inactiveRight: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 10,
    },
    inactiveTab: {
      backgroundColor: '#FFFFFF',
    },
    inactiveLeft: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomRightRadius: 10,
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
