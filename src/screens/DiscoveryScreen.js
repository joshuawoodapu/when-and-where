import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, Button} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from '../components/locationSearch/LocationItem';
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
        filter_by_type: 'establishment',
        searchPageToken: '',
        browsePageToken: ''
    }

    componentWillMount = async () => {
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
        this.browseActivityList();
    }

    browseActivityList = async () => {
        // a sort of "browse" since search bar is empty 
        const apiURL = `https://maps.googleapis.com/maps/api/place/search/json?types=${this.state.filter_by_type}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000&sensor=true&key=${global.apiKey}&pagetoken=${this.state.browsePageToken}`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();
            
            this.setState({ locationPredictions: results_json.results });
            console.log(results_json);

            if ( results_json.hasOwnProperty("next_page_token") ){
                this.setState({ browsePageToken: result.next_page_token });
                console.log(this.state.browsePageToken)
            }
            
        } catch (err){
            console.error(err)
        }
    }

    handleSearchChange = async (typedText) => {
        this.setState({ search: typedText });

        const apiURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.search}&key=${global.apiKey}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000&pagetoken=${this.state.searchPageToken}`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();
            
            this.setState({ locationPredictions: results_json.results });

            if ( results_json.hasOwnProperty("next_page_token") ){
                this.setState({ searchPageToken: result.next_page_token });
                console.log(this.state.searchPageToken)
            }
        } catch (err){
            console.error(err)
        }

        if(this.state.search === ""){
            this.browseActivityList();
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
                        onChange: this.handleSearchChange}]}
                        // {placeholder: 'Current Location',
                        // inputContainerStyle: 'tabsInput',
                        // inputStyle: 'tabsText',
                        // returnKeyType: 'done',
                        // stateLabel: "current_location",
                        // iconStyle: "Icon",
                        // iconName: "location-on",
                        // iconColor: "#605985",
                        // iconSize: 22,
                        // onChange: this.handleLocationChange},
                        // ]}
                    />
                    <GoogleAutoComplete apiKey={global.apiKey} debounce={500} minLength={3} >
                        {({ handleTextChange, locationResults, fetchDetails, isSearching }) => (
                            <React.Fragment>
                                {console.log('locationResults: ', locationResults)}
                                <View /*style={styles.locationInputWrapper}*/>
                                    <TextInput 
                                        style={styles.locationInput}
                                        placeholder="Location" 
                                        onChangeText={handleTextChange}
                                    />
                                </View>
                                {isSearching && <ActivityIndicator size="large" />}
                                <ScrollView>
                                    <Text>testing sdfasd </Text>
                                    {locationResults.map(el => (
                                        <LocationItem 
                                            {...el}
                                            key={el.id}
                                            fetchDetails={fetchDetails}
                                        />
                                    )) }
                                </ScrollView>
                            </React.Fragment>
                        )}
                    </GoogleAutoComplete>
                </View>



                {/* <Tabs 
                    navigation={this.props.navigation}
                    planData={this.props.user.plans}
                    activityList={this.state.locationPredictions}
                    loadMore={this.browseActivityList}
                /> */}
            </View>
        )
    } 

}

const styles = StyleSheet.create({
    locationInput: {
        height: 33,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 10,
        paddingVertical: 11,
        backgroundColor: "#fff"
    },
    
    discoveryInputs: {
        // height: 120,
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

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(DiscoveryScreen);