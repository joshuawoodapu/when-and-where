import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Share } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import VPActivityCard from '../components/VPActivityCard';
import SwitchToggle from "../components/common/Switch.js";
import RHeader from "../components/common/RHeader.js";
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";

class ViewPlanScreen extends Component {
  static navigationOptions = ({navigation}) => ({
        headerTitle: 'VIEW PLAN',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        },
        headerRight: (
          <Icon
            name="more-vert"
            size={30}
            color="#B8BEC1"
            onPress={()=>{ navigation.navigate('PlanOptions'); }}
          />
        )
    });

  constructor(props) {
    super(props);
    this.state = {
        isSwitch1On: false,
        visibleSharePlanModal: false,
        planLoaded: false
    };
    this.shareMessage = this.shareMessage.bind(this);
    this.showResult = this.showResult.bind(this);
    this.state = { result: '' };
  };

  componentWillUnmount = async () => {
    /*
    let planRef = firebase.database().ref("plans/" + this.props.plan.planId);
    await planRef.on("value", (snapshot) => {
      console.log("change detected in plan!!!!!!!!!!");
      this.props.planRefresh(snapshot.val());
      this.setState(this.state);
    });
    /*
    /*
    firebase.database().ref("plans/" + this.props.plan.planId + "/activitySlots/").on("child_added", () => {
      console.log("Change detected in plan!!! Live updating!");
      this.setState(this.state);
      this.props.planSet(this.props.plan.planId);
    })
    firebase.database().ref("plans/" + this.props.plan.planId + "/activitySlots/").on("child_changed", () => {
      console.log("Change detected in plan!!! Live updating!");
      this.setState(this.state);
      this.props.planSet(this.props.plan.planId);
    })
    firebase.database().ref("plans/" + this.props.plan.planId + "/activitySlots/").on("child_removed", () => {
      console.log("Change detected in plan!!! Live updating!");
      this.setState(this.state);
      this.props.planSet(this.props.plan.planId);
    })
    */
  }

    showResult(result) {
      this.setState({result})
    }

    shareMessage = async () => {
      const activitySlotsArray = Object.values(this.props.plan.activitySlots);
      var finalActivities = [];
      for (var i = 0; i < activitySlotsArray.length; i++) {
        finalActivities.push({ 'id': activitySlotsArray[i].activities.activity0.activityId, 'custom':activitySlotsArray[i].activities.activity0.custom });
      }
      // console.log(Object.values(activitySlots));

      let msg = "*You have been invited to:* _'";
      msg += this.props.plan.planName;
      msg += "'_ on ";
      msg += this.props.plan.startDate;
      for (var i = 0; i < finalActivities.length; i++) {
        if (finalActivities[i].custom)
        {
          msg += "\n " + await this.getFirebaseData(finalActivities[i].id);
        }
        else
        {
          msg += "\n " +  await this.getAPIData(finalActivities[i].id);
        }
      }
      msg += "\n\n _Join your friends on When&Where!_";
      Share.share({
        message: msg
      }).then(this.showResult);
    }

    getFirebaseData = async (activityId) => {
      return await firebase.database().ref('activities/' + activityId).once('value')
      .then(snapshot => {
        const data = snapshot.val();
        var stringToReturn = "*" + data.activityName + "*\n\t" + data.activityAddress; 
        return stringToReturn;
      })
    }
  
    getAPIData = async (activityId) => {
      const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${activityId}&fields=name,rating,formatted_phone_number,formatted_address,type,opening_hours,geometry&key=${global.apiKey}`
      try {
          let result = await fetch(api_url);
          let activity_details = await result.json();
          activity_details =  activity_details.result;
          //console.log(activity_details);
          var formattedDetails = {activityName: activity_details.name, activityAddress: activity_details.formatted_address};
          var stringToReturn = "*" + formattedDetails.activityName + "*\n\t" + formattedDetails.activityAddress; 
          return stringToReturn;
      } catch (err){
          console.log(err)
      }
    }

    toggleSharePlanModal = () => this.setState({ visibleSharePlanModal: !this.state.visibleSharePlanModal });

    planLoaded = () => {
      this.setState({planLoaded: true})
    }

    onAddPress() {
        this.props.navigation.navigate('AddActivity', {addAction: 'createSlot'});
    }

    onAddBoxPress(newActivityIndex) {
        this.props.navigation.navigate('AddActivity', {addAction: 'addActivity', newActivityIndex: newActivityIndex});
    }

    onInfoPress = async (place_id) => {
        // make api call to get details on activity
        console.log("onInfoPress triggered.");
    };

    onPressViewComments() {
        this.props.navigation.navigate('CommentsView');
    }

    onPiePress() {
        this.props.navigation.navigate('VotingView')
    }

    onCollabPress() {
      this.setState({ visibleSharePlanModal: !this.state.visibleSharePlanModal });
      this.props.navigation.navigate('CollabInvite');
  }

    iterate(activitySlotsObject) {
      if (activitySlotsObject) {
        var activitySlotsArray = Object.values(activitySlotsObject);
        var arrayLength = activitySlotsArray.length;
        return (
          <View flex={1}>
            {activitySlotsArray.map((activitySlot, index) => (
              <VPActivityCard
                key={index}
                index={index}
                activityData={activitySlot}
                onPlusPress={this.onAddBoxPress.bind(this, index)}
                onInfoPress={this.onInfoPress.bind(this)}
                totalSlots={arrayLength-1}
              />
            ))}
          </View>
          // Old version for safekeeping
          /*
                    <View flex={1}>
            {activitySlotsArray.map((activitySlot, index) => (
              <FlatList
              key={index}
              data={Object.values(activitySlot.activities)}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) =>
                <VPActivityCard
                  key={item.activityId}
                  custom={item.custom}
                  onCardPress={this.onRActivityCardPress.bind(this)}
                  index={index}
                  totalSlots={arrayLength-1}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            ))}
          </View>
          */
        );
      }
      else {
        //this.planLoaded();
        return (
          <View flex={1}>

          </View>
        )
      }

    };

    render() {
      var activities = [[{title: 'Molino Metro', address: '1016 N El Molino Ave, Pasadena, CA 91104', yVote: true},
          {title: 'Azusa Pacific University', address: '701 E. Foothill Blvd, Azusa, CA 91702'},
          {title: 'Popeyes Chicken', address: '994 E Alosta Ave, Azusa, CA 91702', nVote: true},
          {title: 'Joseph\'s House', address: '2310 N Cherry St, Pasadena, CA 91820', yVote: true},
        ],
        [
          {title: 'Halloween Horror Nights', address: '100 Universal City Plaza, Universal City, CA 91608'},
          {title: 'Cold Stone Creamery', address: '3730 S Figueroa St, Los Angeles, CA 90007', nVote: true},
        ]];
            return (
              <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <View flexDirection="row" padding={15} alignItems="center">
                  <RHeader>{this.props.plan.planName}</RHeader>
                  <Icon
                    name="share"
                    size={30}
                    color="#B8BEC1"
                    onPress={this.toggleSharePlanModal}
                  />
                </View>

                <Modal isVisible={this.state.visibleSharePlanModal} backdropOpacity={0.5}>
                  <View style={modalStyles.modalContainer}>
                    <Text style={modalStyles.headerTextStyle}>Share Plan</Text>

                  <TouchableOpacity style={modalStyles.buttonContainer} onPress={this.onCollabPress.bind(this)}>
                  <Text style={modalStyles.buttonText}>Manage Collaborators</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={modalStyles.buttonContainer} onPress={this.shareMessage}>
                    <Text style={modalStyles.buttonText}>Export Plan</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={modalStyles.cancelButton} onPress={this.toggleSharePlanModal}>
                    <Text style={modalStyles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                </Modal>
                <View flex={1} paddingRight={20}>
                    <View flex={1}>

                      {this.iterate(this.props.plan.activitySlots)}
                    </View>
                    <View flex={1}>
                      <TouchableOpacity onPress={this.onPressViewComments.bind(this)}>
                        <View paddingLeft={145} flexDirection='row' alignItems='center'>
                          <Icon
                            name='chat-bubble'
                            color='#B0CAED'
                            size={16}
                          />
                          <View paddingLeft={6}>
                            <Text style={styles.viewCommentsText}>View Comments…</Text>
                          </View>
                        </View>
                        </TouchableOpacity>
                      </View>
                  </View>
                  <View flex={1} paddingTop={38}>
                    <TouchableOpacity onPress={this.onAddPress.bind(this)}>
                      <View paddingLeft={80} flexDirection='row' alignItems='center'>
                        <Icon
                          name='add-circle'
                          color='#0E91D6'
                          size={31}
                        />
                        <View paddingLeft={35}>
                          <Text style={styles.addActivityText}>Add a New Activity</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              </ScrollView>
          )
        // If the plan hasn't finished loading, we want to display a spinner!!!
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    },
    addActivityText: {
      fontSize: 12,
      color: '#2661B2',
      fontFamily: 'circular-std-book'
    },
    viewCommentsText: {
      fontSize: 10,
      color: '#B0CAED',
      fontFamily: 'circular-std-book'
    },
});
const modalStyles = StyleSheet.create({
  /////////////////////Button/////////////////////
  buttonContainer: {
      backgroundColor: '#Ed7248',
      borderRadius: 30,
      width: 270,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
  },
  buttonText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 11,
      fontWeight: 'bold',
  },
  ////////////////////////Header////////////////////
  headerTextStyle: {
      fontSize: 30,
      color: '#605985',
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20
  },
  //////////////////////Modal Container//////////////////
  modalContainer: {
      backgroundColor: '#fff',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E23737',
      borderRadius: 30,
      width: 130,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
  },
  cancelButtonText: {
    textAlign: 'center',
      color: '#ffffff',
      fontSize: 11,
      fontWeight: 'bold',
  }
});

const mapStateToProps = state => {
  return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(ViewPlanScreen);
