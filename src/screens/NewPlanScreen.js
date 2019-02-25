import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,
    DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid,
    FlatList} from 'react-native';
import SwitchToggle from "../components/common/Switch.js";
import RHeader from "../components/common/RHeader.js";
import RButton from "../components/common/RButton.js";
import DynamicInput from "../components/common/DynamicInput.js";
import Toggle from "../components/common/Toggle.js";
import Avatars from '../../src/components/common/Avatars';
import { Icon } from 'react-native-elements';
import FlipToggle from 'react-native-flip-toggle-button';


export default class NewPlanScreen extends Component {
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
    this.state = {isSwitch1On: false, chosenDate: new Date()};

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

    onContinuePress() {
        var displayDate = monthNames[this.state.chosenDate.getMonth()] + " "
        + this.state.chosenDate.getDate() + ", " + this.state.chosenDate.getFullYear();
        var lHours = this.state.chosenDate.getHours();
        var ampm = "AM"

        if (lHours > 12) {
          lHours = lHours-12;
          ampm = "PM";
        }

        var displayTime = lHours + ":" + this.state.chosenDate.getMinutes() + " " + ampm;

        console.log(displayDate);
        console.log(displayTime);
    }

    renderButton(){
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
                    {placeholder: 'Typing',
                      inputContainerStyle: 'createNewPlanInput',
                      autoCapitalize: "words",
                      stateLabel: "typing"},
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

              {this.renderButton()}

          </View>
          </ScrollView>
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
    }
});

const stylesDate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
