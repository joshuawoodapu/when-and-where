import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Tabs from '../components/Tabs';

class DiscoveryScreen extends Component {
    static navigationOptions = {
        title: 'EXPLORE',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }        
    };

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="Search"
                    style={styles.searchInput}
                />
                <TextInput 
                    placeholder="Current Location"
                    style={styles.locationInput}
                />

                <Tabs />
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

export default DiscoveryScreen;