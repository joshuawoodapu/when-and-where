import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MapView } from 'expo';

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
            <View style={{flex:1}}>
                <MapView 
                    style={{flex:1}}
                    initialRegion={{
                        latitude: 34.097205,
                        longitude: -118.329103,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        backgroundColor: '#ffffff',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25,
        marginRight: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10, 
    },
    locationInput: {
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        marginLeft: 25,
        marginRight: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10, 
    }
    

});

export default ActivityScreen;