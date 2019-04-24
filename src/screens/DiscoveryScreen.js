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
        locationInFocus: false,
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
        const apiURL = `https://maps.googleapis.com/maps/api/place/search/json?types=${this.state.filter_by_type}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000&sensor=true&key=${global.apiKey}`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();

            this.setState({ locationPredictions: results_json.results });
        } catch (err){
            console.error(err)
        }
    }

    handleSearchChange = async (typedText) => {
        this.setState({ search: typedText });

        const apiURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.search}&key=${global.apiKey}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();

            this.setState({ locationPredictions: results_json.results });

        } catch (err){
            console.error(err);
        }

        if(this.state.search === ""){
            this.browseActivityList();
        }
    }

    handleLocationSuggestionPress = async (location_id) => {
        this.setState({ locationInFocus: false });

        const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${location_id}&fields=geometry&key=${global.apiKey}`
        try {
            let result = await fetch(api_url);
            let location_details = await result.json();
            location_lat =  location_details.result.geometry.location.lat;
            location_lng =  location_details.result.geometry.location.lng;

            this.setState({
                searchLat: location_lat,
                searchLng: location_lng
            });

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.discoveryInputs}>
                    <DynamicInput placeholderList={[{
                        placeholder: 'Search',
                        inputContainerStyle: 'tabsInput',
                        inputStyle: 'tabsText',
                        autoCapitalize: "words",
                        stateLabel: "search",
                        returnKeyType: 'done',
                        iconStyle: "Icon",
                        iconName: "search",
                        iconColor: "#605985",
                        iconSize: 22,
                        onChange: this.handleSearchChange }]}
                    />
                    <GoogleAutoComplete apiKey={global.apiKey} debounce={500} minLength={3} >
                        {({ handleTextChange, locationResults, fetchDetails, isSearching }) => (
                            <React.Fragment>
                                <View>
                                    <TextInput
                                        style={styles.locationInput}
                                        placeholder="Location"
                                        onChangeText={handleTextChange}
                                        onFocus={ () => ( this.setState({ locationInFocus: true }) ) }
                                    />
                                </View>

                                {isSearching && <ActivityIndicator size="large" />}
                                {this.state.locationInFocus &&
                                    <View>
                                        <ScrollView>
                                            {locationResults.map(el => (
                                                <LocationItem
                                                    {...el}
                                                    key={el.id}
                                                    fetchDetails={fetchDetails}
                                                    onPress={this.handleLocationSuggestionPress}
                                                    onBlur={() => (
                                                        this.setState({locationInFocus: false})
                                                    )}
                                                />
                                            )) }
                                        </ScrollView>
                                    </View>
                                }

                            </React.Fragment>
                        )}
                    </GoogleAutoComplete>
                </View>

                <Tabs
                    navigation={this.props.navigation}
                    planData={this.props.user.plans}
                    activityList={this.state.locationPredictions}
                    loadMore={this.browseActivityList}
                />
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
