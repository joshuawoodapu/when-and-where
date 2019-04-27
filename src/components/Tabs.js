import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import ActivityCard from './ActivityCard';
import PlanCard from './PlanCard';
import Spinner from './common/Spinner';


class Tabs extends Component {
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

    getPlanData() {
        const result = [];
        for (var key in this.props.planData) {
            // skiping if prototype
            if (!this.props.planData.hasOwnProperty(key)) continue;

            var obj = this.props.planData[key];
            result.push({planId:key, ...obj})
        }
        return result;
    }

    renderContent() {
        if (this.state.activeTab === 'activities') {
            let test = this.props.activityList[0];
            if (typeof test !== 'undefined'){
                return (
                    <View style={styles.contentContainer}>
                        <FlatList
                            data={this.props.activityList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                                <ActivityCard 
                                    onCardPress={() => this.onActivityCardPress(item.place_id)} 
                                    title={item.name}
                                    address={item.vicinity ? item.vicinity : item.formatted_address}  
                                    rating={item.rating}  
                                />
                            }
                            keyExtractor= {(item) => {
                                return item.place_id
                            }}
                            // onEndReached={this.props.loadMoreActivities_search}
                            // onEndReached={this.props.loadMore}
                            onEndReachedThreshold={0}
                        />
                    </View>
                );
        } else {
            return (
                <View style={styles.contentContainer}>
                    <FlatList
                        data={[
                            {name: 'Aloha Sushi'},
                            {name: 'AMC Covina 17'},
                            {name: 'Rockin Jump'},
                            {name: 'Amoeba Records'},
                            {name: 'Hanger 18'}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <ActivityCard 
                                    onCardPress={this.onActivityCardPress.bind(this)} 
                                    title={item.name}
                                    address={'701 E Alosta Ave, Azusa, CA 91702'}
                                />
                        }
                        keyExtractor= {(item) => {
                            return item.name
                        }}
                    />
                </View>
            );
        }
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
                        data={this.getPlanData()}
                        keyExtractor= {(item) => {
                            return item.planId
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                                <PlanCard
                                    planId={item.planId} 
                                    onCardPress={this.onPlansCardPress.bind(this,item.planId)}
                                    favorites={item.favorites}
                                    planName={item.planName}
                                    activitySlots={item.activitySlots}
                                />
                        }
                    />
                </View>
            );
        }

    };

    onActivityCardPress = async (place_id) => {
        // make api call to get details on activity
        const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=name,rating,formatted_phone_number,formatted_address,type,opening_hours,geometry&key=${global.apiKey}`
        try {
            let result = await fetch(api_url);
            let activity_details = await result.json();
            activity_details =  activity_details.result;

            let activity_hours = activity_details.opening_hours ? activity_details.opening_hours.weekday_text.join('\n') : "Sorry! These hours are currently not available online.";
            this.props.navigation.navigate('Activity', {
                activity_name: activity_details.name,
                phone_number: activity_details.formatted_phone_number,
                hours: activity_hours,
                address: activity_details.formatted_address,
                rating: activity_details.rating,
                coordinates: activity_details.geometry.location,
                activity_type: activity_details.types[0]
            });

        } catch (err){
            console.log(err)
        }
    };

    onPlansTabPress() {
        if (this.state.activeTab !== 'plans') {
            this.props.plansLoad(this.props.user.ownedPlans, this.props.user.collabForPlans);
            this.setState({activeTab: 'plans'})
        }
    };

    onActivitiesTabPress() {
        if (this.state.activeTab !== 'activities')
            this.setState({activeTab: 'activities'})
    }; 

    onPlansCardPress = async (planId) => {
        await this.props.planSet(planId);
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

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(Tabs);
