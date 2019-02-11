import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

export default class PlanCard extends Component {
    render() {
        return (
            <Card containerStyle={styles.cardStyle}>
                <TouchableOpacity onPress={this.props.onCardPress}>
                    <View style={styles.parentView}>
                        <View style={styles.topRow}>
                            <View style={styles.topLeft}>
                                <Text style={styles.titleText}>
                                    {this.props.text}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.activityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='radio-button-unchecked'
                                color='#B0CAED'
                                size={16}
                            />
                            <Text style={styles.addressText}>
                                Paint & Wine Night @ Mantra
                            </Text>
                        </View>
                        <View style={styles.betweenActivityRow}>
                            <Icon
                                containerStyle={styles.activitySlotIcon}
                                name='arrow-drop-down'
                                color='#B0CAED'
                                size={20}
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
                                Sunset @ Echo Park
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
                                2 additional activities
                            </Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.bottomLeft}>
                                <Icon
                                    containerStyle={styles.timeIconStyle}
                                    name='schedule'
                                    color='#2661B2'
                                    size={20}
                                />
                                <Text style={styles.titleText}>
                                    4-5 hours
                                </Text>
                            </View>
                            <View style={styles.bottomRight}>
                                <Text style={styles.favoriteNumberText}>
                                    205
                                </Text>
                                <Icon
                                    name='favorite'
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
    }
});
