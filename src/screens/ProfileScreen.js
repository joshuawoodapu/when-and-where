import React, { Component } from 'react';
import firebase from 'firebase';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,
    DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid,
    FlatList} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import RHeader from '../components/common/RHeader';
import Tabs from '../components/Tabs';
import ProfileBanner from '../components/ProfileComponents/ProfileBanner';
import ProfileDescription from '../components/ProfileComponents/ProfileDescription';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { NavigationEvents } from "react-navigation";


class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'MY PROFILE',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        },
        headerRight:  (
          <Icon
            name="settings"
            size={30}
            color="#B8BEC1"
            onPress={()=>{ navigation.navigate('Settings'); }}
          />
        )
    });

    state = {
        fullName: this.props.user.fullName,
        description: 'Hello friends, this is my description',
        editProfile: false,
        planData: {},
        search: '',
        location: '',
        searchLat: 0.0,
        searchLng: 0.0,
        error: '',
        locationPredictions: [],
        filter_by_type: 'museum',
        isModalVisible: false,
        userActivities: []
    };

    // shouldComponentUpdate(nextProps){
    //         console.log("In should component update");
    //         console.log(nextProps.user.fullName);
    //         return nextProps.user.fullName != this.props.user.fullName;
    //   }

    // componentWillReceiveProps(nextProps){
    //     //fires when props change as expected
    //     console.log("In will receive props");

    //     console.log({'will receive props': nextProps.user.fullName});
    //     this.setState({
    //       fullName: nextProps.user.fullName
    //     });
    // }

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

        this.loadUserActivities();
    }

    loadUserActivities = async () => {
        let user = await firebase.auth().currentUser;
        var loadedActivities = await firebase.database().ref('activities').child('owner').equalTo(user.uid);
        var userActivities = [];
    
        console.log("Here are your user activities:");
        console.log(loadedActivities);

        this.setState({ userActivities: loadedActivities});
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

    componentDidMount() {
        console.log(this.props.user.plans);
        console.log(Object.keys(this.props.user.plans).length);
    }

    renderDescription() {
        if (this.state.editProfile) {
            
        }
        else {
            return (
                <ProfileDescription
                    description="Hello friends, this is my description"
                    planCount={Object.keys(this.props.user.plans).length}
                />
            )
        }
    }
    
    render() {
        return (
            <View style={styles.topViewContainer}>
            <NavigationEvents
                    onDidFocus={payload => {
                        console.log("will focus", payload);
                        this.setState({fullName: this.props.user.fullName});
                    }}
                    />

                <View style={styles.rowContainer}>
                        <ProfileBanner 
                            name={this.state.fullName}
                            location={this.state.location}
                        />
                </View>

                <View style={styles.descriptionContainer}>
                {this.renderDescription()}
                </View>
                <Tabs
                    navigation={this.props.navigation}
                    style={styles.Tabs}
                    planData={this.props.user.plans}
                    activityList={this.state.userActivities}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    topViewContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rowContainer: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    descriptionContainer:{
        flex: .25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    Tabs: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan, fullName: state.fullName};
}

export default connect(mapStateToProps, actions)(ProfileScreen);
