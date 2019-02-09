import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import { MapView} from 'expo';
import {Icon} from 'react-native-elements';


class ActivityScreen extends Component {
    static navigationOptions = {
        title: 'AMOEBA RECORDS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        }
    };

    render() {
        return (
            <View style={styles.activityView}>
                <MapView 
                    style={{height: 225}}
                    initialRegion={{
                        latitude: 34.097205,
                        longitude: -118.329103,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.0066,
                    }}
                >
                    <MapView.Marker 
                        coordinate={{latitude:34.097205, longitude:-118.329103}}
                    />
                </MapView>
                <ScrollView contentContainerStyle={styles.activityDescView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Amoeba Records
                        </Text>
                        <Icon 
                            containerStyle={styles.favoriteIconStyle}
                            name='favorite-border'
                            color='#F387B8'
                            size={30}
                        />
                    </View>
                    <View style={styles.subTitleView}>
                        <Text style={styles.subTitleText}>
                            ACTIVITY TYPE
                        </Text>
                    </View>
                    <View style={styles.subIconsView}>
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={20}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={20}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={20}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={20}
                        />
                        <Icon 
                            name='star'
                            color='#B8BEC1'
                            size={20}
                        />
                        <Icon
                            containerStyle={styles.addIconStyle}
                            name='add'
                            color='#2661B2'
                            size={30}
                        />
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            DESCRIPTION
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                        </Text>
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            ADDRESS
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            123 Address Rd. Azusa, CA 91702
                        </Text>
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            PHONE NUMBER
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            (555) 555 - 5555
                        </Text>
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            HOURS OF OPERATION
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            10AM - 5PM Mon - Fri
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityView: {
        flex: 1,
        height: 100
    },
    activityDescView: {
        
    },
    titleView: {
        flex: 1,
        flexDirection: 'row'
    },
    titleText: {
        marginTop: 20,
        marginLeft: 36,
        fontSize: 30,
        fontFamily: 'circular-std-black',
        color: '#413C77'
    },
    favoriteIconStyle: {
        position: 'absolute',
        right: 36,
        top: 30,
        alignSelf: 'center'
    },
    addIconStyle: {
        position: 'absolute',
        right: 36,
        alignSelf: 'center'
    },
    subTitleView: {
        flex: 1,
        flexDirection: 'row' 
    },
    subTitleText: {
        marginLeft:36,
        fontFamily:'circular-std-medium',
        fontSize: 12,
        color: '#B8BEC1'
    },
    subIconsView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 9,
        marginLeft: 36
    },
    subSectionTitleView: {
        flex: 1,
    },
    subSectionTitleText: {
        marginLeft: 36,
        marginTop: 26,
        fontFamily:'circular-std-medium',
        fontSize: 12,
        color: '#B8BEC1'
    },
    subSectionTextView: {
        flex: 1,
    },
    subSectionText: {
        marginLeft: 36,
        marginRight: 36,
        fontFamily: 'circular-std-book',
        fontSize: 14,
        color: '#2661B2'
    },
});

export default ActivityScreen;