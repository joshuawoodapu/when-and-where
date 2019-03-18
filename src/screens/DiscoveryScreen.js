import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
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
        location: '',
        searchLat: 0.0,
        searchLng: 0.0,
        error: '',
        locationPredictions: [],
        filter_by_type: 'museum'
    }

    componentDidMount = async () => {
        // gets current location and set initial region to this
        navigator.geolocation.getCurrentPosition(
            position => {                
                this.setState({
                    searchLat: position.coords.latitude,
                    searchLng: position.coords.longitude
                });
            }, 
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );
        this.renderBrowseActivities();
    }

    renderBrowseActivities = async () => {
        // a sort of "browse" since search bar is empty 
        const apiURL = `https://maps.googleapis.com/maps/api/place/search/json?types=${this.state.filter_by_type}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000&sensor=true&key=${global.apiKey}`
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();
            
            this.setState({ locationPredictions: results_json.results });
            console.log("in compWillMount()");
        } catch (err){
            console.error(err)
        }
    }

    handleSearchChange = async (typedText) => {
        this.setState({search: typedText}, () => {
            console.log(typedText);
        });

        const apiURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.search}&key=${global.apiKey}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();
            
            this.setState({ locationPredictions: results_json.results });
        } catch (err){
            console.error(err)
        }

        if(this.state.search === ""){
            this.renderBrowseActivities();
        }
    }

    handleLocationChange = (typedText) => {
        this.setState({location: typedText}, () => {
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
                <Tabs navigation={this.props.navigation} activityList={this.state.locationPredictions} />
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
