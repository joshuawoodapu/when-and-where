import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Share } from 'react-native';
import VPActivityCard from '../components/VPActivityCard';
import SwitchToggle from "../components/common/Switch.js";
import RHeader from "../components/common/RHeader.js";
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";

export default class ViewPlanScreen extends Component {
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
      };
      this.shareMessage = this.shareMessage.bind(this);
      this.showResult = this.showResult.bind(this);
      this.state = { result: '' };
  };

    showResult(result) {
      this.setState({result})
    }

    shareMessage() {
      Share.share({ 
        message: 'You have been invited to collaborate on a plan! Join your friends on When&Where!' 
      }).then(this.showResult);
    }

  toggleSharePlanModal = () => this.setState({ visibleSharePlanModal: !this.state.visibleSharePlanModal });

    onAddPress() {
        this.props.navigation.navigate('AddActivity');
    }

    onPressViewComments() {
        this.props.navigation.navigate('CommentsView');
    }

    onPiePress() {
        this.props.navigation.navigate('VotingView')
    }

    onRActivityCardPress() {
        this.props.navigation.navigate('Activity');
    };

    onCollabPress() {
      this.setState({ visibleSharePlanModal: !this.state.visibleSharePlanModal });
      this.props.navigation.navigate('CollabInvite');
  }

    render() {
      var activities = [{tempColor: "#000", title: 'Molino Metro', address: '1016 N El Molino Ave, Pasadena, CA 91104', yVote: true, startTime: '12:30PM'},
        {tempColor: "#ddd", title: 'Azusa Pacific University', address: '701 E. Foothill Blvd, Azusa, CA 91702', startTime: '2:00PM'},
        {title: 'Popeyes Chicken', address: '994 E Alosta Ave, Azusa, CA 91702', nVote: true, startTime: '5:00PM'},
        {title: 'Joseph\'s House', address: '2310 N Cherry St, Pasadena, CA 91820', yVote: true, startTime: '7:30PM'},
        {title: 'Halloween Horror Nights', address: '100 Universal City Plaza, Universal City, CA 91608', startTime: '9:00PM'},
        {title: 'Cold Stone Creamery', address: '3730 S Figueroa St, Los Angeles, CA 90007', nVote: true, startTime: '11:30PM'},];
      var numSlots = activities.length-1;

        return (
          
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <View flexDirection="row" padding={15} alignItems="center">
                <RHeader>Halloween Night</RHeader>
                <TouchableOpacity onPress={this.toggleSharePlanModal}>
                  <Icon
                    name="share"
                    size={30}
                    color="#B8BEC1"
                  />
                </TouchableOpacity>
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
                    <FlatList
                        data={activities}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) =>
                          <VPActivityCard
                            key={item.id}
                            onCardPress={this.onRActivityCardPress.bind(this)}
                            title={item.title}
                            text={item.title}
                            address={item.address}
                            yesVote={item.yVote}
                            noVote={item.nVote}
                            startTime={item.startTime}
                            index={index}
                            totalSlots={numSlots}
                          />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
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
              </View>
            </ScrollView>

          
        )
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
