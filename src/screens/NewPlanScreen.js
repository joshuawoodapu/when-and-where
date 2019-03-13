import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,
    DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid,
    FlatList} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import SwitchToggle from "../components/common/Switch.js";
import RHeader from "../components/common/RHeader.js";
import RButton from "../components/common/RButton.js";
import DynamicInput from "../components/common/DynamicInput.js";
import Toggle from "../components/common/Toggle.js";
import Avatars from '../../src/components/common/Avatars';
import { Icon } from 'react-native-elements';
import FlipToggle from 'react-native-flip-toggle-button';
import Modal from "react-native-modal";


class NewPlanScreen extends Component {
    static navigationOptions = {
        title: 'NEW PLAN',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold'
        }
    };

    constructor(props) {
    super(props);
    monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    this.state = {
      planName: "",
      privacySetting: false, 
      chosenDate: new Date(),
      isModalVisible: false
        };

    this.setDate = this.setDate.bind(this);
  }

    openDatePicker() {
        try {
            const {action, year, month, day} = DatePickerAndroid.open({
              date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {

            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    openTimePicker() {
      try {
          const {action, year, month, day} = TimePickerAndroid.open({
            hour: 0,
            minute: 0,
            mode: 'spinner',
            is24Hour: false,
          });
          if (action !== TimePickerAndroid.dismissedAction) {

          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
    }

    renderDatePicker(){
        if (Platform.OS === 'ios')
            return (
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                />
            )
        else
            return (
              <View flex={1} flexDirection="row">
                <View flex={1} paddingRight={10}>
                  <RButton onPress={()=>this.openDatePicker()}>START DATE</RButton>
                </View>
                <View flex={1}>
                  <RButton onPress={()=>this.openTimePicker()}>START TIME</RButton>
                </View>
              </View>
            )
    }

    setDate(newDate) {
      this.setState({chosenDate: newDate});
    }

    handlePlanNameChange = (typedText) => {
      this.setState({planName:typedText});
    }

    onContinuePress() {
        this._toggleModal();
        var displayDate = monthNames[this.state.chosenDate.getMonth()] + " "
        + this.state.chosenDate.getDate() + ", " + this.state.chosenDate.getFullYear();
        var lHours = this.state.chosenDate.getHours();
        var ampm = "AM"

        if (lHours > 12) {
          lHours = lHours-12;
          ampm = "PM";
        }

        var displayTime = lHours + ":" + this.state.chosenDate.getMinutes() + " " + ampm;
        this.setState()

        console.log(displayDate);
        console.log(displayTime);
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />; }
        return (
          <View paddingHorizontal={28}>
            <RButton flex={1} onPress={this.onContinuePress.bind(this)}>
                CONTINUE
            </RButton>
          </View>
        );
    }

    chosenDateToString() {
      return (this.state.chosenDate.toDateString())

    }

    renderPrivacySetting() {
      if (this.state.privacySetting)
      {
        return (
          <View style={containerStyle.rowContainer}>
          <Icon
  
          name='lock'
          color='#2661B2' />
          <View style={containerStyle.textContainer}>
          <Text style={styles.toggleLabel}> Private </Text>
          </View>
          </View>
        )
      }
      else 
      {
        return (
          <View style={containerStyle.rowContainer}>
          <Icon
  
          name='lock-open'
          color='#2661B2' />
          <View style={containerStyle.textContainer}>
          <Text style={styles.toggleLabel}> Public </Text>
          </View>
          </View>
        )
      }
    }
 
    confirmPlan = async () => {

      let user = await firebase.auth().currentUser;
      let newPlanId = await firebase.database().ref('plans/').push({
        owner: user.uid,
        planName: this.state.planName,
        startDate: this.state.chosenDate.toLocaleDateString(),
        privacy: this.state.privacySetting ? "Private" : "Public"
      }).getKey();
      console.log(newPlanId);
      this.props.planSet(newPlanId);
      this._toggleModal();
      this.props.navigation.navigate('PlanView');
    }

    render() {
      /* When we get the users we want, we need to store the following info: */
      var avatars = [{name: "Kasey B.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Caroline R.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
        {name: "Hannah M.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
        {name: "Steve R.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        {name: "Elliot S.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Hannah K.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Matt A.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
        {name: "Sabine C.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
        {name: "Darnell D.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        {name: "Olivia C.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},];

        return (
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <View flex={1}>
              <View flex={1} paddingLeft={33} paddingTop={35}>
                <RHeader>Create a New Plan</RHeader>
              </View>
              <View paddingHorizontal={24} paddingTop={17} paddingBottom={27}>
                <Text style={styles.textLabel}>PLAN NAME</Text>
                <DynamicInput placeholderList={[
                    {placeholder: 'Write a title for your plan here!',
                      inputContainerStyle: 'createNewPlanInput',
                      autoCapitalize: "words",
                      stateLabel: "planName",
                      onChange: this.handlePlanNameChange},
                    ]}
                />
              </View>

              <View paddingHorizontal={24}>
                <Text style={styles.textLabel}>WHO'S GOING?</Text>
              </View>
              <View flexDirection="row" flex={1} paddingBottom={21} paddingHorizontal={35}>
                <View flex={6}>
                  <FlatList
                      data={avatars}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) =>
                        <Avatars
                            size={item.size}
                            rounded={item.rounded}
                            uri={item.uri}
                            avatarContainer="newPlanContainer"
                            name={item.name}
                        />
                      }
                      keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View flex={1} justifyContent="center" alignItems="center">
                  <TouchableOpacity>
                      <Icon
                          name="add-circle"
                          color="#0E91D6"
                          size={35}
                      />
                  </TouchableOpacity>
                </View>
              </View>
              {/* ^ Need to make Avatars component more dynamic with styling */}

              <View paddingHorizontal={24} paddingBottom={24}>
                <Text style={styles.textLabel}>WHEN?</Text>
                <View style={styles.dateStyle}>
                  {this.renderDatePicker()}
                </View>
              </View>

{/*Privacy*/}

              <View paddingHorizontal={24}>
                <Text style={styles.textLabel}>PRIVACY</Text>
                <View style={styles.toggleContainer}>
                    <Toggle style={styles.createActivityToggle}
                      buttonOffColor={'#727e83'}
                      sliderOffColor={'#fff'}
                      buttonOnColor={'#B0CAED'}
                      sliderOnColor={'#2661B2'}
                    />
                    <Text style={styles.toggleLabel}>Make Plan Private</Text>
                </View>
              </View>



              <View style={{ flex: 1 }}>

              <TouchableOpacity onPress={this._toggleModal}>
              {this.renderButton()}
              </TouchableOpacity>

              <Modal isVisible={this.state.isModalVisible}>

{/* Modal Starts */}
              <View style={{ flex: 1, paddingTop: 100, paddingBottom: 100 }}>

              <View style={styles.modalContainer}>

                <ScrollView flex={1} showsVerticalScrollIndicator={false}>

                    <View flex={1}>
                        <View flex={1} paddingLeft={33} paddingTop={35}>
                          <RHeader>Confirmation</RHeader>
                        </View>

                        <View paddingHorizontal={24} paddingTop={17} paddingBottom={27}>
                          <Text style={styles.textLabel}>PLAN NAME</Text>
                          <Text style={styles.toggleLabel}>{this.state.planName}</Text>
                        </View>

            {/*Avatars*/}

                        <View paddingHorizontal={24}>
                          <Text style={styles.textLabel}>WHOS GOING?</Text>
                        </View>
                        <View flexDirection="row" flex={1} paddingBottom={2} paddingHorizontal={35}>
                          <View flex={6}>
                            <FlatList
                                data={avatars}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) =>
                                  <Avatars
                                      size={item.size}
                                      rounded={item.rounded}
                                      uri={item.uri}
                                      avatarContainer="newPlanContainer"
                                      name={item.name}
                                  />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                          </View>

          {/*plus button*/}
                          <View flex={1} justifyContent="center" alignItems="center">
                            <TouchableOpacity>
                                <Icon
                                    name="add-circle"
                                    color="#0E91D6"
                                    size={35}
                                />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View paddingHorizontal={24} paddingBottom={24}>
                          <Text style={styles.textLabel}>WHEN?</Text>
                          <Text style={styles.toggleLabel}>{this.chosenDateToString()}</Text>
                        </View>

                        <View paddingHorizontal={24}>
                          <Text style={styles.textLabel}>PRIVACY</Text>

                          {this.renderPrivacySetting()}

                          <View style={containerStyle.checkContainer}>

                          <View style={containerStyle.exButton}>
                          <TouchableOpacity onPress={this._toggleModal}>
                          <Icon
                          raised
                          name='clear'
                          color='#2699FB' />
                          </TouchableOpacity>
                          </View>

                          <TouchableOpacity onPress={this.confirmPlan.bind(this)}>
                          <Icon
                          raised
                          name='done'
                          color='#2699FB' />
                          </TouchableOpacity>

                          </View>

                        </View>
                    </View>

                  </ScrollView>
              </View>

              </View>
              </Modal>
              </View>

          </View>
          </ScrollView>
        );
    }
}

const stylesDate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    textLabel: {
      fontFamily: 'circular-std-medium',
      fontSize: 12,
      color: '#B8BEC1',
      paddingLeft: 11,
      paddingVertical: 6
    },
    formStyle: {
      flex: 4,
      paddingHorizontal: 24,
      justifyContent: 'space-around'
    },
    errorTextStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: '#E23737',
        marginTop: 10
    },
    toggleLabel: {
      fontSize: 14,
      color: "#2661B2",
      paddingLeft: 10
    },
    toggleContainer: {
      paddingHorizontal: 9,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 43
    },
    dateStyle: {
      fontSize: 10
    },
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
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkContainer: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30
  }
});

const mapStateToProps = state => {
  return { plan: state.plan };
}

export default connect(mapStateToProps, actions)(NewPlanScreen);