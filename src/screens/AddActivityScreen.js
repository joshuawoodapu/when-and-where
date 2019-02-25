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

    handleSearchChange = (typedText) => {
        this.setState({search:typedText});
    }

    handleLocationChange = (typedText) => {
        this.setState({location:typedText});
    }

    render() {
        return (
            <View flex={1}>
                <AATabs
                navigation={this.props.navigation}
                handleSearch={this.handleSearchChange}
                handleLocation={this.handleLocationChange}
                />
            </View>
        )
    }
}

export default AddActivityScreen;
