import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MapView } from 'expo';
import {Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class ActivityScreen extends Component {
    static navigationOptions = {
        title: 'AMOEBA RECORDS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    render() {
        return (
            <View style={styles.activityView}>
                <MapView 
                    style={{flex:1}}
                    initialRegion={{
                        latitude: 34.097205,
                        longitude: -118.329103,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <ScrollView style={styles.activityDescView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Amoeba Records
                        </Text>
                        <Icon 
                            style={styles.favoriteIconStyle}
                            name='favorite'
                            color='#F387B8'
                            size={18}
                        />
                    </View>
                    <View style={styles.subTitleView}>
                        <Text style={styles.subTitleText}>
                            ACTIVITY TYPE
                        </Text>
                        <Icon 
                            name='add'
                            color='#2661B2'
                            size={24}
                        />
                    </View>
                    <View style={styles.subIconsView}>
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={18}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={18}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={18}
                        />
                        <Icon 
                            name='star'
                            color='#FDAF17'
                            size={18}
                        />
                        <Icon 
                            name='star'
                            color='#B8BEC1'
                            size={18}
                        />
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.subSectionTitleText}>
                            DESCRIPTION
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
        flex: 1,
    },
    titleView: {
        flex: 1,
        flexDirection: 'row'
    },
    titleText: {
        marginLeft: 36,
        fontSize: 30,
        color: '#413C77'
    },
    favoriteIconStyle: {
        marginLeft: 57
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
    descriptionTitleView: {
        flex: 1,
    },
    subSectionTitleText: {
        marginLeft: 36,
        marginTop: 26,
        fontFamily:'circular-std-medium',
        fontSize: 12,
        color: '#B8BEC1'
    }
});

export default ActivityScreen;