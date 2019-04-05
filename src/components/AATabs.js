import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity,
  ScrollView, Dimensions, FlatList } from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import { Icon } from 'react-native-elements';
import AAActivityCard from './AAActivityCard';
import DynamicInput from '../components/common/DynamicInput';

class AATabs extends Component {
    state = {
        activeTab: 'search',
        location: '',
        searchLat: 0.0,
        searchLng: 0.0,
        error: '',
        locationPredictions: [],
        filter_by_type: 'museum'
    };

    componentWillMount = async () => {
        // TODO: not saving to state
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    searchLat: position.coords.latitude,
                    searchLng: position.coords.longitude
                });
                console.log("pos.coord: " + position.coords.latitude + " " + position.coords.longitude);
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );

        console.log("coordinates: " + this.state.searchLat + " " + this.state.searchLng);
        console.log(this.state.error);
        this.browseActivityList();

    }

    renderTabs() {
        if (this.state.activeTab === 'search') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.activeLeft, styles.activeTab]}>
                        <TouchableHighlight
                            style={styles.activeLeft}
                            onPress={this.onSearchTabPress.bind(this)}
                            key={"search-active"}
                            underlayColor="#F0F3F7"
                            activeOpacity={1}
                        >
                            <Text style={styles.activeTabText}>
                                Search
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.inactiveRight, styles.inactiveTab]}>
                        <TouchableHighlight
                            style={styles.inactiveRight}
                            onPress={this.onMyActivitiesTabPress.bind(this)}
                            key={"myactivities-inactive"}
                        >
                            <Text style={styles.inactiveTabText}>
                                My Activities
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        else if (this.state.activeTab === 'myactivities') {
            return (
                <View style={styles.tabsView}>
                    <View style={[styles.inactiveLeft, styles.inactiveTab]}>
                        <TouchableHighlight
                            style={styles.inactiveLeft}
                            onPress={this.onSearchTabPress.bind(this)}
                            key={"search-inactive"}
                        >
                          <Text style={styles.inactiveTabText}>
                              Search
                          </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.activeRight, styles.activeTab]}>
                        <TouchableHighlight
                            style={styles.activeRight}
                            onPress={this.onMyActivitiesTabPress.bind(this)}
                            key={"myactivities-active"}
                            underlayColor="#F0F3F7"
                            activeOpacity={1}
                        >
                          <Text style={styles.activeTabText}>
                              My Activities
                          </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

    };

    renderContentHeader() {
      return(
        <View style={styles.tabsInputs}>
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
                onChange: this.handleSearchChange },
              {placeholder: 'Current Location',
                inputContainerStyle: 'tabsInput',
                inputStyle: 'tabsText',
                returnKeyType: 'done',
                stateLabel: "current_location",
                iconStyle: "Icon",
                iconName: "location-on",
                iconColor: "#605985",
                iconSize: 22,
                onChange: this.handleLocationChange },
              ]}
          />
        </View>
      );
    };

    handleSearchChange = async (typedText) => {
        this.setState({search: typedText});

        const apiURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.search}&key=${global.apiKey}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000`;
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();

            this.setState({ locationPredictions: results_json.results });
        } catch (err){
            console.error(err)
        }

        if (this.state.search === ""){
            this.browseActivityList();
        }
    }

    handleLocationChange = (typedText) => {
        this.setState({location: typedText});
    }

    browseActivityList = async () => {
        // a sort of "browse" since search bar is empty
        const apiURL = `https://maps.googleapis.com/maps/api/place/search/json?types=${this.state.filter_by_type}&location=${this.state.searchLat},${this.state.searchLng}&radius=40000&sensor=true&key=${global.apiKey}`
        try {
            let result = await fetch(apiURL);
            let results_json = await result.json();

            this.setState({ locationPredictions: results_json.results });
        } catch (err){
            console.error(err)
        }
    }

    renderContentFooter() {
        if (this.state.activeTab === 'search') {
            let test = this.state.locationPredictions[0];
            if (typeof test !== 'undefined'){
                return (
                    <View flex={6} paddingHorizontal={15}>
                        <FlatList
                            data={this.state.locationPredictions}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                                <AAActivityCard
                                    title={item.name}
                                    onCardPress={() => this.onActivityCardPress(item.place_id, this.props.parentComponent)}
                                    add={true}
                                    text={item.name}
                                    address={item.vicinity ? item.vicinity : item.formatted_address}
                                    stars={item.rating}
                                    favorited={false}
                                />
                            }
                            keyExtractor= {(item) => {
                                return item.place_id
                            }}
                        />
                    </View>
                );
            } else {
                var activities = [{title: 'Aloha Sushi', add: true, address: '3030 Freedom Lane, Merced, CA 95340', stars: 5, favorited: true},
                    {title: 'Mystic Sports', add: true, address: '465 Edsel Road, Irvine, CA 92614', stars: 4},
                    {title: 'Primedia', add: true, address: '3903 Turnley Ave, Oakland, CA, 94605', stars: 4, favorited: true},
                    {title: 'Glaciarts', address: '3904 Sarno Ct, Moorpark, CA, 93021', stars: 2},
                    {title: 'Ridgeco', add: true, address: '3906 Chelsea Ct, Rocklin, CA, 95677', stars: 4},
                    {title: 'Lucent Bar & Grille', address: '3906 Mayfield St, Newbury Park, CA, 91320', stars: 3},];
                return (
                    <View flex={6} paddingHorizontal={15}>
                        <FlatList
                            data={activities}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                                <AAActivityCard
                                    key={item.id}
                                    title={item.title}
                                    add={item.add}
                                    text={item.title}
                                    address={item.address}
                                    stars={item.stars}
                                    favorited={item.favorited}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                );
            }

        }
        else if (this.state.activeTab === 'myactivities') {
          return (
              <View flex={6} paddingHorizontal={15}>
                <FlatList
                    data={this.getCustomActivityData()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                      <AAActivityCard
                        key={item.activityId}
                        onCardPress={this.onCustomActivityCardPress.bind(this, item.activityId)}
                        title={item.activityName}
                        add={false}
                        text={item.phoneNumber}
                        address={item.activityAddress}
                        stars={item.stars}
                        favorited={false}
                      />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
              </View>
          );
        }
    };

    onSearchTabPress() {
        if (this.state.activeTab !== 'search')
            this.setState({activeTab: 'search'})
    };

    onActivityCardPress = async (place_id, parComp) => {
       // Sending an action to add an activity slot!
       // Current plan
       // Chosen activity
       // False, as in this is not a custom activity!

       switch(parComp) {
          case 'add-box':
            console.log("ADDING TO EXISTING ACTIVITY SLOT");
            break;
          case 'add-circle':
            console.log("ADDING AS NEW ACTIVITY SLOT");
            await this.props.addActivitySlot(this.props.plan.planId, place_id, false);
            await this.props.planSet(this.props.plan.planId);
            this.props.navigation.navigate('PlanView');
            break;
          default:
            console.log("Talk to Campbell lol");
      }

       // make api call to get details on activity
       /*
        const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=name,rating,formatted_phone_number,formatted_address,type,opening_hours,geometry&key=${global.apiKey}`
       try {
           let result = await fetch(api_url);
           let activity_details = await result.json();
           activity_details =  activity_details.result;

           let activity_hours = activity_details.opening_hours ? activity_details.opening_hours.weekday_text.join('\n') : "Sorry! These hours are currently not available online.";
           this.props.navigation.navigate('Activity', {
               activity_name: activity_details.name,
               phone_number: activity_details.formatted_phone_number,
               hours: activity_hours,
               address: activity_details.formatted_address,
               rating: activity_details.rating,
               coordinates: activity_details.geometry.location,
               activity_type: activity_details.types[0]
           });

       } catch (err){
           console.log(err)
       }
       */
    };

    onCustomActivityCardPress = async (activityId) => {
      // Sending an action to add an activity slot!
      // Current plan
      // Chosen activity
      // True, as in this is a custom activity!
      await this.props.addActivitySlot(this.props.plan.planId, activityId, true);
      await this.props.planSet(this.props.plan.planId);
      this.props.navigation.navigate('PlanView');
    }


    onMyActivitiesTabPress() {
        if (this.state.activeTab !== 'myactivities')
            this.setState({activeTab: 'myactivities'})
    };

    onCantFind() {
        this.props.navigation.navigate('CreateActivity');
    }

    getCustomActivityData() {
      const result = [];
      for (var key in this.props.customActivityData) {
          // skiping if prototype
          if (!this.props.customActivityData.hasOwnProperty(key)) continue;

          var obj = this.props.customActivityData[key];
          result.push({activityId:key, ...obj})
      }
      return result;
  }

    render() {
        return (
            <View style={styles.parentView}>
                {this.renderTabs()}
                <View style={styles.contentContainer}>
                  {this.renderContentHeader()}
                  {this.renderContentFooter()}
                  <View style={styles.createActivityContainer}>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('CreateActivity')}
                        key={"createactivitylink"}
                        underlayColor="#F0F3F7"
                        activeOpacity={1}
                    >
                      <View flexDirection="row">
                        <Icon
                            name="add-circle"
                            color="#0E91D6"
                            size={25}
                        />
                        <View paddingLeft={10} flexDirection="column">
                          <Text flex={1}
                            style={{fontFamily: 'circular-std-bold',
                              fontSize: 11,
                              color: "#2661B2"}}>
                            Can’t find what you’re looking for?
                          </Text>
                          <Text flex={1}
                            style={{fontFamily: 'circular-std-book',
                              fontSize: 10,
                              color: "#2661B2"}}>
                            Add a New Activity
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
            </View>
        );
    }
}

styles = StyleSheet.create({
    parentView: {
        flex: 1
    },
    flatView: {
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: 100
    },
    tabsView: {
        height: 47,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activeLeft: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 10,
    },
    activeRight: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
    },
    activeTab: {
      backgroundColor: '#F0F3F7',
    },
    inactiveRight: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 10,
    },
    inactiveTab: {
      backgroundColor: '#FFFFFF',
    },
    inactiveLeft: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomRightRadius: 10,
    },
    activeTabText: {
        color: '#413C77',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inactiveTabText: {
        color: '#6A6789',
        fontSize: 18,
        fontWeight: 'bold'
    },
    contentContainer: {
        backgroundColor: '#F0F3F7',
        flex: 1,
    },
    createActivityContainer: {
        backgroundColor: '#e8ebef',
        flex: 0.75,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 5, height: 0},
        shadowOpacity: .1,
        shadowRadius: 10
    },
    tabsInputs:{
      flex: 1.5,
      justifyContent: "space-around",
      paddingVertical: 10,
      paddingHorizontal: 20
    },
})


const mapStateToProps = state => {
  return { plan: state.plan };
}

export default connect(mapStateToProps, actions)(AATabs);
