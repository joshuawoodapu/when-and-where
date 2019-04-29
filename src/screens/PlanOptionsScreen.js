import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid,
    FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import FlipToggle from 'react-native-flip-toggle-button';
import Modal from "react-native-modal";
import Dropdown from '../components/common/Dropdown';
import firebase from 'firebase';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

class PlanOptionsScreen extends Component {

    static navigationOptions = {
        title: 'PLAN OPTIONS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    constructor(props) {
        super(props);
        monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        this.state = {
            isSwitch1On: false,
            visibleNotificationModal: false,
            visibleDatesModal: false,
            chosenDate: new Date(),
        }
        this.setDate = this.setDate.bind(this);
    };
    /////////////////////////////////////////////////////////
    openDatePicker() {
        try {
          DatePickerAndroid.open({
            date: new Date(),
            mode: "spinner"
          }).then(date => {
            if (date.action !== DatePickerAndroid.dismissedAction) {
              this.setDate(date);
            }
          });
        } catch ({ code, message }) {
          console.warn('Cannot open date picker', message);
        }
      }
  
      renderDatePicker(){
          if (Platform.OS === 'ios')
              return (
                <View>
                  <DatePickerIOS
                    mode="date"
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                  />
                </View>
              )
          else
              return (
                <View>
                  <TouchableOpacity onPress={()=>this.openDatePicker()} style={styles.dateContainer}>
                    <Text style={styles.buttonText}>Select a Start Date</Text>
                  </TouchableOpacity>
                </View>
              )
      }
  
      setDate(newDate) {
        if (Platform.OS === 'ios')
          this.setState({chosenDate: newDate});
        else {
          var translatedDate = new Date(newDate.year,newDate.month, newDate.day);
          this.setState({chosenDate: translatedDate});
        }
      }
  
      handlePlanNameChange = (typedText) => {
        this.setState({planName:typedText});
      }
  /*
      onContinuePress() {
        if (Platform.OS === 'ios') {
          // Returns 'January 1, 2020' formatted date string
          // use console.log(this.state.chosenDate); to just return the date object
          //this._toggleModal();
          var displayDate = monthNames[this.state.chosenDate.getMonth()] + " "
          + this.state.chosenDate.getDate() + ", " + this.state.chosenDate.getFullYear();
  
          console.log(displayDate);
        }
        else {
          console.log(this.state.chosenDate);
        }
      }
*/
      //chosenDateToString() {
        //return (this.state.chosenDate.toDateString())
  
     // }
    /////////////////////////////////////////////////////////

    onCollabPress() {
        this.props.navigation.navigate('CollabInvite');
    }

    toggleNotificationModal = () => this.setState({ visibleNotificationModal: !this.state.visibleNotificationModal });
    toggleDatesModal = () => this.setState({ visibleDatesModal: !this.state.visibleDatesModal });
    toggleDeletePlanModal = () => this.setState({ visibleDeletePlanModal: !this.state.visibleDeletePlanModal });


    deletePlan = async () => {
        console.log("Delet planmn calld");
        let user = await firebase.auth().currentUser.uid;
        let planID = this.props.plan.planId;
        console.log("planID:" + planID);
        try{
                await firebase.database().ref("plans/"+planID).remove();
                this.toggleDeletePlanModal;
                this.props.navigation.navigate('Discovery');
        }  catch{(error) => {
            console.log(error);
        }}

    }

    render() {

        return (
            <View>

                <View style={styles.privacyOptionContainer}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='https'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.privacyOptionText}>Privacy</Text>

                        <FlipToggle
                            value={this.state.isSwitch1On}
                            buttonWidth={50}
                            buttonHeight={25}
                            buttonRadius={50}
                            buttonOffColor={'#727e83'}
                            sliderOffColor={'#fff'}
                            buttonOnColor={'#Ed7248'}
                            sliderOnColor={'#fff'}
                            onToggle={(value) => {
                                this.setState({ isSwitch1On: value });
                            }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={this.toggleNotificationModal}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='notifications'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Notifications</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onCollabPress.bind(this)} style={styles.buttonContainer}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='supervisor-account'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Manage Collaborators</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={this.toggleDatesModal}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='date-range'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Date of Trip</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.deletePlanView}>
                    <TouchableOpacity style={styles.deletePlanContainer} onPress={this.toggleDeletePlanModal}>
                        <Text style={styles.deletePlanText}>DELETE PLAN</Text>
                    </TouchableOpacity>
                </View>

                <Modal isVisible={this.state.visibleNotificationModal} backdropOpacity={0.5}>
                    <View style={modalstyles.modalContainer}>
                        <Text style={modalstyles.headerTextStyle}>Notifications</Text>

                        <View style={modalstyles.dropDownStyle}>
                        <Dropdown choices={[
                            {label: 'Friends', value: 'friends'},
                            {label: 'Just me', value: 'just me'},
                            {label: 'Turned off', value: 'turned off'},
                        ]}/>
                        </View>

                        <TouchableOpacity style={modalstyles.buttonContainer} onPress={this.toggleNotificationModal}>
                            <Text style={modalstyles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={this.state.visibleDatesModal} backdropOpacity={0.5}>
                    <View style={styles.datePickerStyle}>
                        <View style={modalstyles.dateOfTrip}>
                            <Text style={modalstyles.headerTextStyle}>Date of Trip</Text>
                        </View>
                        {this.renderDatePicker()}
                        <View style={modalstyles.dateOfTrip}>
                            <TouchableOpacity style={modalstyles.buttonContainer} onPress={this.toggleDatesModal}>
                                <Text style={modalstyles.buttonText}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.visibleDeletePlanModal} backdropOpacity={0.5}>
                    <View style={modalstyles.modalContainer}>
                        <Text style={modalstyles.headerTextStyle}>Delete Plan</Text>

                        <View style={modalstyles.deletePlanModalTextContainer}>
                        <Text style={modalstyles.deletePlanModalText}>Are you sure you want to delete plan?</Text>
                        </View>

                        <View style={modalstyles.deletePlanContainer}>
                            <TouchableOpacity style={modalstyles.deletePlanButtonContainer} onPress={this.deletePlan}>
                                <Text style={modalstyles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                            <View style={modalstyles.noButton}>
                            <TouchableOpacity style={modalstyles.deletePlanButtonContainer} onPress={this.toggleDeletePlanModal}>
                                <Text style={modalstyles.buttonText}>No</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
        marginBottom: 25
    },
    headerTextStyle: {
        fontSize: 14,
        color: '#2661B2',
        fontWeight: 'bold',
    },
    ////////////////Privacy Component///////////////////
    privacyOptionContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f3f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        marginBottom: 25,
        marginTop: 25
    },
    privacyOptionText: {
        fontSize: 15,
        color: '#2661B2',
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight: 130
    },
    ////////////////Notifications, Manage Collaborators, Dates of Trip Component///////////////
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f3f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        marginBottom: 25
    },
    buttonText: {
        textAlign: 'center',
        color: '#2661B2',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30
    },
    datePickerStyle: {
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    //////////////Delete Plan Component/////////////
    deletePlanContainer: {
        backgroundColor: '#E23737',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletePlanText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    deletePlanView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 20
    },
    //////////////////Justifying options left & aligning/////////////////////
    organizeView: {
        flexDirection: 'row',
        marginLeft: 40
    },
});

/////////////////////////////////Modal Styling////////////////////////////////////
const modalstyles = StyleSheet.create({
    /////////////////////Button/////////////////////
    buttonContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
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
    ////////////////////Drop Down/////////////////////////
    dropDownStyle: {
        width: 250,
    },
    ////////////////////Delete Plan Modal Buttons/////////////////
    deletePlanButtonContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    deletePlanContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    deletePlanModalText: {
        fontSize: 15,
        color: '#2661B2',
        fontWeight: 'bold',
    },
    deletePlanModalTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noButton: {
        marginBottom: 20
    },
    dateOfTrip: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
   }
   
   export default connect(mapStateToProps, actions)(PlanOptionsScreen);