import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import PieChart from 'react-native-pie-chart';
import Modal from "react-native-modal";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import {connect} from 'react-redux';
import firebase from 'firebase';
import * as actions from '../redux/actions';


class VPActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleVotingModal: false,
      renderedActivityGroup: null,
      yesVote: false,
      noVote: false,
      activities: [],
      activitiesLoaded: false,
    }
  }

  componentDidMount = async () => {
    this.mounted = true;
    var activitiesArray = Object.values(this.props.activityData.activities);
    for (i = 0; i < activitiesArray.length; i++) {
      //console.log("activitiesArray length " + activitiesArray.length);
      // If a custom activity, then the information comes from the database!
      if (activitiesArray[i].custom) {
        this.getFirebaseData(activitiesArray);
      }
      // If not a custom activity, then the information comes from the Google API!
      else {
        this.getAPIData(activitiesArray);
      }
    }
    if (this.mounted) {
      this.setState({activitiesLoaded:true})
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getFirebaseData = async (activitiesArray) => {
    let id = activitiesArray[i].activityId;
    await firebase.database().ref('activities/' + activitiesArray[i].activityId).once('value')
    .then(snapshot => this.activityDataSuccess(snapshot.val(), id))
    .catch((error) => {
        console.log(error)
    })
  }

  getAPIData = async (activitiesArray) => {
    const api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${activitiesArray[i].activityId}&fields=name,rating,formatted_phone_number,formatted_address,type,opening_hours,geometry&key=${global.apiKey}`
    try {
        activityId = activitiesArray[i].activityId;
        let result = await fetch(api_url);
        let activity_details = await result.json();
        activity_details =  activity_details.result;
        console.log("********************");
        console.log(activity_details);
        //console.log(activity_details);
        var formattedDetails = {activityName: activity_details.name, activityAddress: activity_details.formatted_address, id: activityId};
        this.activityDataSuccess(formattedDetails, formattedDetails.id);

    } catch (err){
        console.log(err)
    }
  }

  activityDataSuccess = (data, id, votes) => {
    var newActivityData = {...data, 'activityId': id};

    //console.log("CHECK IT OR RECK IT: " + Object.values(newActivityData));

    if (this.mounted) {
      this.setState(prevState => ({
        activities: [...prevState.activities, newActivityData]
      }))
    }
  }

  onYesPress = async (activity) => {
      console.log("We INSIDE THE YES!");
      console.log(activity.activityId);


      slotname = '';
      let uid = await firebase.auth().currentUser.uid;
      console.log("here's a uid: "+uid);

      var id = activity.activityId;

      var slotRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+'slot'+this.props.index);
      slotname = slotRef.getKey();

      // getting 'activity#' reference for firebase #########
      var activityRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+slotname+'/activities/');
      activityName = '';

      await activityRef.orderByChild('activityId').equalTo(id).once("value", function(snapshot){
        snapshot.forEach((function(child){
          console.log("child.key: "+child.key);
          activityName = child.key;
        }));
      });

      vote = {
        [uid]: true
      }

    try{
      await firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+slotname+'/activities/'+activityName+'/voters/')
      .update(vote);
    }catch{(error)=>{
        console.log(error);
    }}


    // if (this.state.yesVote == false && this.state.noVote == false) {
    //   this.setState({ yesVote: true });
    // }
    // else if (this.state.yesVote == false && this.state.noVote == true) {
    //   this.setState({ yesVote: true, noVote: false });
    // }
    // else if (this.state.yesVote == true) {
    //   this.setState({ yesVote: false });
    // }

    // this.renderYes(this.yesVote);
    // this.renderNo(this.noVote);


  }

  onNoPress = async (activity) => {
    console.log("We INSIDE THE NO!");
    console.log(activity.activityId);


    slotname = '';
    let uid = await firebase.auth().currentUser.uid;
    console.log("here's a uid: "+uid);

    var id = activity.activityId;

    var slotRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+'slot'+this.props.index);
    slotname = slotRef.getKey();

    // getting 'activity#' reference for firebase #########
    var activityRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+slotname+'/activities/');
    activityName = '';

    await activityRef.orderByChild('activityId').equalTo(id).once("value", function(snapshot){
      snapshot.forEach((function(child){
        console.log("child.key: "+child.key);
        activityName = child.key;
      }));
    });

    vote = {
      [uid]: false
    }

  try{
    await firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+slotname+'/activities/'+activityName+'/voters/')
    .update(vote);
  }catch{(error)=>{
      console.log(error);
  }}

    // if (this.state.noVote == false && this.state.yesVote == false) {
    //   this.setState({ noVote: true });
    // }
    // else if (this.state.noVote == false && this.state.yesVote == true) {
    //   this.setState({ noVote: true, yesVote: false });
    // }
    // else if (this.state.noVote == true) {
    //   this.setState({ noVote: false });
    // }



  }

  onAddPress() {
      this.props.navigation.navigate('AddActivity');
  }

  onRActivityCardPress() {
      //console.log("this.props.navigation.navigate('Activity');");
      // this.props.navigation.navigate('Activity');
  };

  renderInfo(activity, index) {
    console.log("Inside render info. Index: "+index);


    var actAddr = activity.activityAddress;

    if (actAddr.includes(",")) {
      var index = actAddr.indexOf(",");
      var streetAddress = actAddr.substr(0, index + 1);
      var cityStateAddress = actAddr.substr(index + 2);

      return (
          <View flex={3} margin={13}>
            <View style={styles.nameRow}>
              <Text style={styles.titleText}>
                {activity.activityName}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Text style={styles.addressText}>
                {streetAddress}
              </Text>
              <Text style={styles.addressText}>
                {cityStateAddress}
              </Text>
            </View>
          </View>
      );
    }

    else {
      return (
          <View flex={3} margin={13}>
            <View style={styles.nameRow}>
              <Text style={styles.titleText}>
                {activity.activityName}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Text style={styles.addressText}>
                {actAddr}
              </Text>
            </View>
          </View>
      );
    }
  }

  renderYes(yesVote) {
    if (yesVote) {
      return (
        <Icon
          key={this.props.keyExtractor + "_yes"}
          name='check'
          color='green'
          size={18}
        />
      );
    }
    else {
      return (
        <Icon
          key={this.props.keyExtractor + "_yes"}
          name='check'
          color='#2699FB'
          size={18}
        />
      );
    }
  }

  renderNo(noVote) {
    if (noVote) {
      return (
        <Icon
          key={this.props.keyExtractor + "_no"}
          name='close'
          color='red'
          size={18}
        />
      );
    }
    else {
      return (
        <Icon
          key={this.props.keyExtractor + "_no"}
          name='close'
          color='#2699FB'
          size={18}
        />
      );
    }
  }

  renderTopLine(ind) {
    if (ind != 0) {
      return (
        <View flex={1}>
          <View flex={3}
            style={{
              borderLeftWidth: 1,
              borderLeftColor: '#B0CAED',
            }}
          />
          <View flex={1} />
        </View>
      );
    }
    else {
      return (<View flex={4} />);
    }
  }

  renderBottomLine(ind) {
    if (ind != this.props.totalSlots) {
      return (
        <View flex={1}>
          <View flex={1} />
          <View flex={3}
            style={{
              borderLeftWidth: 1,
              borderLeftColor: '#B0CAED',
            }}
          />
        </View>
      );
    }
    else {
      return (<View flex={4} />);
    }
  }

  toggleVotingModal = () =>
    this.setState({ visibleVotingModal: !this.state.visibleVotingModal });

  /* should take in an activitySlot as a param */
  renderPieChart = (voteNums) => {




    return(
    <View style={votingModalStyles.modalContent}>
      <View style={votingModalStyles.closeButton}>
        <Icon
          name='clear'
          color='#2661B2'
          size={30}
          onPress={this.toggleVotingModal}
        />
      </View>

      <View style={votingModalStyles.centered}>
        <Text style={votingModalStyles.header}> Voting Results </Text>
        <PieChart
          style={{ marginBottom: 25 }}
          chart_wh={225}
          series={voteNums}
          sliceColor={sliceColors}
        />
      </View>

      <View style={votingModalStyles.votingLegendContainer}>
        {activityGroup1.map((activity, index) =>
          <View style={votingModalStyles.keyContainer} key={activity.activityName}>
            <View style={{ width: 20, height: 20, borderRadius: 100 / 2, backgroundColor: sliceColors[index], marginRight: 7 }} />
            <Text style={votingModalStyles.actName}>{activity.activityName}</Text>
          </View>
        )}
      </View>
    </View>
  );
}


  activityDelete = async (activity, activityId) =>{
    // ActivitySlot is this.props.activityData
    // ActivitySlot INDEX is this.props.index
    // PlanID is this.props.plan.planId

    console.log("Delete activity called");
    let user = await firebase.auth().currentUser.uid;
    let planID = this.props.plan.planId;
    // Get activity ID
    //try{
    // call firebase.database().ref(WHEREVER THE ACTIVITY IS).remove();
    //} catch {(error)=>{
    //}}

    var activitiesArray = Object.values(this.props.activityData.activities);
    // console.log("ACTIVITIES ARRAY: "+ activitiesArray[index]);

    slotname = '';

    var id = activity.activityId;

    var slotRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+'slot'+this.props.index);
    slotname = slotRef.getKey();

    // getting 'activity#' reference for firebase #########
    var activityRef = firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'+slotname+'/activities/');
    activityName = '';

    await activityRef.orderByChild('activityId').equalTo(id).once("value", function(snapshot){
      snapshot.forEach((function(child){
        console.log("child.key: "+child.key);
        activityName = child.key;
      }));
    });
    console.log("We out here: " + activityName);

    try {
        await firebase.database().ref('/plans/'+this.props.plan.planId+'/activitySlots/'
          +'slot'+this.props.index+'/activities/'+activityName).remove();
        console.log(activity.activityName + ' removed from slot.');
    } catch {(error)=>{
      console.log(error);
    }}
  }

  onLongDelPress = (activity) => {
    return(
      Alert.alert(
        'Delete',
        'Do you want to delete ' + activity.activityName + ' from the activity slot?',
        [
          {text: 'Cancel', onPress: () => console.log('Activity not deleted.')},
          {text: 'OK', onPress: () => this.activityDelete(activity)},
        ],
        { cancelable: false }
      )
    );
  }

  renderVoting(activity){
      console.log("Render voting?");

      return(
        <View flex={0.5} justifyContent="center">
            <TouchableOpacity flex={1} onPress={ () => { this.swiper.swipeRight(), this.onYesPress(activity) }}>
              <Icon
                key={this.props.keyExtractor + "_yes"}
                name='check'
                color='#0E91D6'
                size={20}
              />
            </TouchableOpacity>
            <View flex={.3}></View>
            <TouchableOpacity flex={1} onPress={ () => { this.swiper.swipeLeft(), this.onNoPress(activity) }}>
              <Icon
                key={this.props.keyExtractor + "_no"}
                name='close'
                color='#0E91D6'
                size={20}
              />
            </TouchableOpacity>
        </View>
      );

  }

  render() {
    //console.log("this.props = " + this.props)
    let voteNums = [];
    activityGroup1.map((activity) => {
      voteNums.push(activity.numVotes);
    });
    if (this.state.activitiesLoaded) {
      return (
        <View flex={.3} flexDirection="row" height={95}>
          <View style={styles.timeView}>
            <TouchableOpacity onPress={this.props.onPlusPress}>
              <Icon
                name='add-box'
                color='#2661B2'
                size={22}
              />
            </TouchableOpacity>
          </View>

          <View flex={.5} alignItems='center' justifyContent='center'>
            <View flex={4}>
              {this.renderTopLine(this.props.index)}
            </View>
            <TouchableOpacity onPress={this.toggleVotingModal}>
              <PieChart
                chart_wh={31}
                series={voteNums}
                sliceColor={sliceColors}
              />
            </TouchableOpacity>
            <View flex={4}>
              {this.renderBottomLine(this.props.index)}
            </View>
          </View>

          <View style={styles.cardSectionStyle}>
            <CardStack
              style={styles.content}
              loop={true}
              renderNoMoreCards={()=> <Text></Text>}
              ref={swiper => {
                this.swiper = swiper
              }}
              horizontalThreshold={5}
              secondCardZoom={1}
              disableTopSwipe={true}
              disableBottomSwipe={true}
            >
              {this.state.activities.map((activity, index) =>
                <Card style={styles.cardStyle} key={index}>
                    <View flex={1} flexDirection="row">
                      <TouchableOpacity
                        key={index}
                        onPress={this.props.onInfoPress}
                        onLongPress={this.onLongDelPress.bind(this, activity, index)}
                      >
                        {this.renderInfo(activity, index)}
                      </TouchableOpacity>
                      <View flex = {1} alignItems="flex-end" paddingRight={13} justifyContent="center">
                        {this.renderVoting(activity)}
                      </View>
                    </View>
                </Card>
              )}
            </CardStack>
          </View>

          <Modal isVisible={this.state.visibleVotingModal} backdropOpacity={0.5}>
            {this.renderPieChart(voteNums)}
          </Modal>
        </View>
      );
    }
  else {
    return (
      <View></View>
    )
  }
  }
}

const styles = StyleSheet.create({
  timeView: {
    width: 62,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  timeText: {
    fontSize: 11,
    color: "#0E91D6",
    fontFamily: 'circular-std-bold'
  },
  yesView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  noView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  voteContainer: {
    width: 22,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardSectionStyle: {
    flex: 3,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  titleText: {
    color: '#2661B2',
    fontWeight: 'bold',
    fontSize: 14
  },
  addressText: {
    color: '#2661B2',
    fontSize: 10,
    paddingVertical: 1
  },
  nameRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  addressRow: {
    flex: 1,
  },
  cardStyle: {
    // Temp - Sprint 5
    minWidth: 195,
    maxWidth: 205,
    maxHeight: '100%',
    // ^ Temp - Sprint 5
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: '#F0F3F7'
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const votingModalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 30,
    color: '#413C77',
    fontWeight: 'bold',
    marginBottom: 20
  },
  actName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2661B2',
  },
  keyContainer: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  votingLegendContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

const sliceColors = ['#F7D055', '#F387B8', '#6A6789', '#A0C1ED', '#EC7248'];

let activityGroup1 = [
  {
    activityName: 'The Broad',
    numVotes: 5
  },
  {
    activityName: 'LACMA',
    numVotes: 3
  },
  {
    activityName: 'California Science Center',
    numVotes: 4
  },
  {
    activityName: 'The Getty',
    numVotes: 7
  },
  {
    activityName: 'MOCA',
    numVotes: 1
  }
];

const mapStateToProps = state => {
  return { plan: state.plan, user: state.user };
}

export default connect(mapStateToProps, actions)(VPActivityCard);
