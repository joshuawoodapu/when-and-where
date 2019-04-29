import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import firebase from 'firebase';

export default class PlanCard extends Component {
    state = {
        first_activity_name: "",
        second_activity_name: "",
        first_act_exists: false,
        second_act_exists: false,
        additional_act_num: 0
    };

    componentWillMount = async() => {
        if (this.props.activitySlots != undefined) {
            // see if we have something in the first activity slot
            if ( "slot0" in this.props.activitySlots && "activities" in this.props.activitySlots.slot0) {
                // set boolean for conditional rendering later on
                this.setState({ first_act_exists: true });

                const firstActName = await this.getActivityName(this.props.activitySlots.slot0.activities.activity0.activityId);
                this.setState({ first_activity_name: firstActName });
                
                // see if we have something in the first activity slot
                if ( "slot1" in this.props.activitySlots && "activities" in this.props.activitySlots.slot1 ) {
                    this.setState({ second_act_exists: true });
                
                    const secondActName = await this.getActivityName(this.props.activitySlots.slot1.activities.activity0.activityId)
                    this.setState({ second_activity_name: secondActName });

                    if ( "slot2" in this.props.activitySlots ){
                        // count the total number of activity slots
                        let activity_num = Object.keys(this.props.activitySlots);
                        activity_num = activity_num.length;
 
                        additional_acts = activity_num - 2;
                        this.setState({ additional_act_num: additional_acts});
                    }
                }
            } else {
                console.log("slot0 is empty")
            }
        }

    }

    renderActivities() {
        if (this.state.first_act_exists == true && this.state.second_act_exists == false){
            return (
                <View style={styles.activityRow}>
                    <Icon
                        containerStyle={styles.activitySlotIcon}
                        name='radio-button-unchecked'
                        color='#B0CAED'
                        size={16}
                    />
                    <Text style={styles.addressText}>
                        {this.state.first_activity_name}
                    </Text>
                </View>
            );
        } else if (this.state.first_act_exists && this.state.second_act_exists) {
            if (this.state.additional_act_num > 0) {
                return (
                    <View>
                        <View style={styles.activityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='radio-button-unchecked'
                                color='#B0CAED'
                                size={16}
                            />
                            <Text style={styles.addressText}>
                                {this.state.first_activity_name}
                            </Text>
                        </View>
                        <View style={styles.betweenActivityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='arrow-drop-down'
                                color='#B0CAED'
                                size={18}
                            />
                        </View>
                        <View style={styles.activityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='radio-button-unchecked'
                                color='#B0CAED'
                                size={16}
                            />
                            <Text style={styles.addressText}>
                                {this.state.second_activity_name}
                            </Text>
                        </View>
                        <View style={styles.betweenActivityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='more-vert'
                                color='#B0CAED'
                                size={20}
                            />
                            <Text style={styles.moreActivitiesText}>
                                {this.state.additional_act_num} additional activities
                            </Text>
                        </View>
                    </View>
                );
            }
            return (
                <View>
                    <View style={styles.activityRow}>
                        <Icon
                            containerStyle={styles.activitySlotIcon}
                            name='radio-button-unchecked'
                            color='#B0CAED'
                            size={16}
                        />
                        <Text style={styles.addressText}>
                            {this.state.first_activity_name}
                        </Text>
                    </View>
                    <View style={styles.betweenActivityRow}>
                        <Icon
                            containerStyle={styles.activitySlotIcon}
                            name='arrow-drop-down'
                            color='#B0CAED'
                            size={18}
                        />
                    </View>
                    <View style={styles.activityRow}>
                        <Icon
                            containerStyle={styles.activitySlotIcon}
                            name='radio-button-unchecked'
                            color='#B0CAED'
                            size={16}
                        />
                        <Text style={styles.addressText}>
                            {this.state.second_activity_name}
                        </Text>
                    </View>
                </View>
            );
        } else {
            // if there's no activites in the plan yet
            return(
                <View style={styles.betweenActivityRow}>
                    <Icon
                        containerStyle={styles.activitySlotIcon}
                        name='more-vert'
                        color='#B0CAED'
                        size={20}
                    />
                    <Text style={styles.noActivitiesText}>
                        No activities yet. Click to start planning!
                    </Text>
                </View>
            )
        }
    }

    getActivityName = async (place_id) => {
        let actName = "";
        if ( place_id.charAt(0) == '-' ){
            // custom activity, so we pull from database
            await firebase.database().ref('activities/' + place_id).once('value')
                .then(snapshot => {
                    actName = snapshot.val().activityName;
                })
                .catch((error) => { console.log(error) })
        } else {
            // pull from google places API
            const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=name&key=${global.apiKey}`;
            try {
                let result = await fetch(api_url);
                let activity_details = await result.json();
                actName = activity_details.result.name;
            } catch (err) {
                console.log(err)
            }
        }
        return await actName;
    }

    render() {
        return (
            <Card containerStyle={styles.cardStyle}>
                <TouchableOpacity onPress={this.props.onCardPress}>
                    <View style={styles.parentView}>
                        <View style={styles.topRow}>
                            <View style={styles.topLeft}>
                                <Text style={styles.titleText}>
                                    {this.props.planName}
                                </Text>
                            </View>
                        </View>
                        
                        {this.renderActivities()}
                        
                       
                        

                        <View style={styles.bottomRow}>
                            <View style={styles.bottomLeft}>
                                <Icon
                                    containerStyle={styles.timeIconStyle}
                                    name='place'
                                    color='#2661B2'
                                    size={20}
                                />
                                <Text style={styles.titleText}>
                                    Location!
                                </Text>
                            </View>
                            <View style={styles.bottomRight}>
                                <Text style={styles.favoriteNumberText}>
                                    {this.props.favorites}
                                </Text>
                                <Icon
                                    name='favorite-border'
                                    color='#F387B8'
                                    size={18}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    }
}
 const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        color: '#2661B2',
        fontFamily: 'circular-std-bold',
        fontSize: 14
    },
    addressText: {
        color: '#2661B2',
        fontSize: 12,
        fontFamily: 'circular-std-book'
    },
    cardContainer: {
        padding: 0,
        flex: 1
    },
    topRow: {
        flexDirection: 'row',
        height: 15,
        flex: 1,
        marginBottom: 10
    },
    topRight: {
        position: 'absolute',
        right: 0
    },
    topLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    activityRow: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 15
    },
    betweenActivityRow: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 13
    },
    bottomRow: {
        marginTop: 15,
        flexDirection: 'row',
        flex: 1,
    },
    bottomLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomRight: {
      position: 'absolute',
      flexDirection: 'row',
      right: 3
    },
    cardStyle: {
        marginBottom: 5,
        marginTop: 15,
        borderWidth: 0,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.46,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#fff'
    },
    sectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    notFavorited: {
      borderWidth: 1,
    },
    activitySlotIcon: {
        paddingRight: 15,
        bottom: 2
    },
    timeIconStyle: {
        paddingRight: 14,
        bottom: 1
    },
    favoriteNumberText: {
        fontFamily: 'circular-std-medium',
        fontSize: 14,
        marginRight: 8,
        color: '#2661B2',
    },
    moreActivitiesText: {
        fontFamily: 'circular-std-book',
        fontSize: 10,
        color: '#B0CAED',
        top: 5
    },
    noActivitiesText: {
        fontFamily: 'circular-std-book',
        fontSize: 11,
        color: '#B0CAED',
        top: 5
    }
});
