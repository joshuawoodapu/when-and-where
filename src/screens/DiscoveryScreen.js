import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Tabs from '../components/Tabs';
import DynamicInput from '../components/common/DynamicInput';

class DiscoveryScreen extends Component {
    static navigationOptions = {
        title: 'EXPLORE',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold'
        }
    };

    state = {
        search: '',
        location: ''
    };

    handleSearchChange = (typedText) => {
        this.setState({search:typedText}, () => {
          console.log(typedText);
        });
    }

    handleLocationChange = (typedText) => {
        this.setState({location:typedText}, () => {
          console.log(typedText);
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.discoveryInputs}>
                    <DynamicInput placeholderList={[
                        {placeholder: 'Search',
                        inputContainerStyle: 'tabsInput',
                        inputStyle: 'tabsText',
                        autoCapitalize: "words",
                        stateLabel: "search",
                        iconStyle: "Icon",
                        iconName: "search",
                        iconColor: "#605985",
                        iconSize: 22,
                        onChange: this.handleSearchChange},
                        {placeholder: 'Current Location',
                        inputContainerStyle: 'tabsInput',
                        inputStyle: 'tabsText',
                        returnKeyType: 'done',
                        stateLabel: "current_location",
                        iconStyle: "Icon",
                        iconName: "location-on",
                        iconColor: "#605985",
                        iconSize: 22,
                        onChange: this.handleLocationChange},
                        ]}
                    />
                </View>
                <Tabs navigation={this.props.navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    discoveryInputs: {
        height: 120,
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
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
