import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import { MapView} from 'expo';
import {Icon} from 'react-native-elements';

class ActivityScreen extends Component {
    constructor(props){
        super(props);
        let activity_title = this.props.navigation.state.params.activity_name;
    }
    
    static navigationOptions = {
        title: this.activity_title,
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
                        latitude: this.props.navigation.state.params.coordinates.lat,
                        longitude: this.props.navigation.state.params.coordinates.lng,
                        latitudeDelta: 0.0278,
                        longitudeDelta: 0.0096,
                    }}
                >
                    <MapView.Marker 
                        coordinate={{
                            latitude: this.props.navigation.state.params.coordinates.lat, 
                            longitude: this.props.navigation.state.params.coordinates.lng}}
                    />
                </MapView>
                <ScrollView contentContainerStyle={styles.activityDescView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            {this.props.navigation.state.params.activity_name}
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
                            ADDRESS
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            {this.props.navigation.state.params.address}
                        </Text>
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            PHONE NUMBER
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            {this.props.navigation.state.params.phone_number ? this.props.navigation.state.params.phone_number : 'N/A'}
                        </Text>
                    </View>
                    <View style={styles.subSectionTitleView}>
                        <Text style={styles.subSectionTitleText}>
                            HOURS OF OPERATION
                        </Text>
                    </View>
                    <View style={styles.subSectionTextView}>
                        <Text style={styles.subSectionText}>
                            {this.props.navigation.state.params.hours}
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