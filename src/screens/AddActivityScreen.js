import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AATabs from '../components/AATabs';

class AddActivityScreen extends Component {
    static navigationOptions = {
        title: 'ADD A NEW ACTIVITY',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    state = {
        search: '',
        location: ''
    };

    render() {
        return (
            <View style={{flex:1, backgroundColor:"#000"}}>
                <AATabs navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default AddActivityScreen;
