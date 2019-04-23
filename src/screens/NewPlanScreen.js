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
              <View flex={1} paddingHorizontal={30}>
                <DatePickerIOS
                  mode="date"
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                />
              </View>
            )
        else
            return (
              <View flex={1} paddingHorizontal={30} alignItems='center'>
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

    onContinuePress() {
      if (Platform.OS === 'ios') {
        // Returns 'January 1, 2020' formatted date string
        // use console.log(this.state.chosenDate); to just return the date object
        this._toggleModal();
        var displayDate = monthNames[this.state.chosenDate.getMonth()] + " "
        + this.state.chosenDate.getDate() + ", " + this.state.chosenDate.getFullYear();

        console.log(displayDate);
      }
      else {
        this._toggleModal();
        console.log(this.state.chosenDate);
      }
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
          <Text style={styles.toggleLabel1}> Private </Text>
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
        privacy: this.state.privacySetting ? "Private" : "Public",
        favorites: 0
      }).getKey();
      await firebase.database().ref('users/' + user.uid + '/ownedPlans').push({
        planId: newPlanId
      })
      this.props.userLoad(user);
      this.props.planSet(newPlanId);
      this.props.plansLoad(this.props.user.ownedPlans, this.props.user.collabForPlans);
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
                {this.renderDatePicker()}
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
<View style={{ flex: 1, paddingTop: 50, paddingBottom: 50 }}>

<View style={styles.modalContainer}>

  <ScrollView showsVerticalScrollIndicator={false}>

      <View>
          <View flex={1} justifyContent='center' alignItems='center' paddingTop={30} paddingLeft={70} paddingRight={70}>
            <RHeader>Confirmation</RHeader>
          </View>

          <View paddingHorizontal={24} paddingTop={17} paddingBottom={27}>
            <Text style={styles.textLabel}>PLAN NAME</Text>
            <Text style={styles.toggleLabel}>{this.state.planName}</Text>
          </View>

          {/*Avatars*/}
          <View paddingHorizontal={24}>
            <Text style={styles.textLabel}>WHO'S GOING?</Text>
          </View>
          <View flexDirection="row" flex={1} paddingBottom={2} paddingHorizontal={35}>
            <View flex={20}>
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
              <Icon raised name='clear' color='#2699FB' />
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
    header: {
        fontSize: 30,
        color: '#413C77',
        fontWeight: 'bold',
        marginBottom: 20
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
    toggleLabel: {
      fontSize: 14,
      color: "#2661B2",
      paddingLeft: 10
    },
    toggleLabel1: {
      fontSize: 14,
      color: "#2661B2",
    },
    toggleContainer: {
      paddingHorizontal: 9,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 43
    },
    buttonText: {
        fontFamily: 'circular-std-medium',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 13,
        height: 14
    },
    dateContainer: {
       backgroundColor: '#0E91D6',
       borderRadius: 10,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 3 },
       shadowOpacity: 0.2,
       shadowRadius: 2,
       height: 48,
       width: 140,
       justifyContent: 'center',
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
        alignItems: 'center',
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
  return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(NewPlanScreen);
