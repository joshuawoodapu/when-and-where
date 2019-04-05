import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import RHeader from '../components/common/RHeader';
import RButton from '../components/common/RButton';
import DynamicInput from '../components/common/DynamicInput';
import Dropdown from '../components/common/Dropdown';
import Spinner from "../components/common/Spinner";
import Toggle from '../components/common/Toggle';
import firebase from 'firebase';
import RNPickerSelect from 'react-native-picker-select';
import FlipToggle from 'react-native-flip-toggle-button';



class CreateActivityScreen extends Component {
    static navigationOptions = {
        headerVisible: true,
    };

    state = { name: '', address: '', phone: '', activityType: '', privateBool: '', loading: '', error: ''};

    onRegisterFail() {
        this.setState({ error: 'Failed to create activity.', loading: false });
    }

    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
            <RButton flex={1} onPress={this.onSaveActivityPress.bind(this)}>
                SAVE ACTIVITY
            </RButton>
        );
    }

    renderError(){
      if (this.state.error.trim() != ""){
        console.log("Inside renderError");
        return(
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        )
      }
    }

    handleNameChange = (typedText) => {
      this.setState({name:typedText});
  }

  handlePhoneChange = (typedText) => {
      this.setState({phone:typedText});
  }

  handleAddressChange = (typedText) => {
      this.setState({address:typedText});
  }

  handleTypeChange = (data) => {
    console.log("Entered handle type change function");
    console.log(data)
    this.setState({activityType:data});
}

  handlePrivacyChange = (value) => {
      console.log("Inside privacy change function");
      this.setState({privateBool:value});
  }

  onCreateFail() {
    this.setState({ error: 'Activity creation failed.', loading: false });
}

  validateName(){
      if(this.state.name.trim() == ""){
        this.setState({ error: "Activity name cannot be empty.", loading: false });
        return false; // Name was empty
      }
      if(this.state.name.trim().length > 50){
        this.setState({error: "Activity name must be less than 50 characters.", loading: false})
        return false; // Name was too long
      }
      else{
        this.setState({ error: '', loading: false });
        return true; // Otherwise, return true
      }
  }
  validateAddress(address){

  }
  validatePhone(phone){

  }


    onSaveActivityPress = async () => {
        let user = await firebase.auth().currentUser;
        console.log("Inside the func");

        if(this.validateName()){ // If name is not empty, push to DB
          try{newActivityId = await firebase.database().ref('/activities').push({
            activityName: this.state.name,
            activityAddress: this.state.address,
            phoneNumber: this.state.phone,
            activityType: this.state.activityType,
            // Commenting out sending privacy bool since public custom activities are not part of MVP
            // privateBool: this.state.privateBool,
            owner: user.uid
          }).getKey()}
          catch{(error) => {
            console.log(error);
            this.onCreateFail.bind(this);
        }}
        await this.props.customActivitiesLoad(user);
        this.props.navigation.navigate('Discovery');
       } // End if, name validation
    }

    render() {
        return (
          <DismissKeyboard>
          <View flex={1}>
              <View flex={1} paddingLeft={35} paddingTop={35}>
                <RHeader>Create Activity</RHeader>
              </View>
              <View style={form.formStyle}>
                <DynamicInput placeholderList={[
                    {placeholder: 'Activity Name',
                      inputContainerStyle: 'defaultInput',
                      autoCapitalize: "words",
                      stateLabel: "name",
                      onChange: this.handleNameChange},
                    {placeholder: 'Address',
                      inputContainerStyle: 'defaultInput',
                      stateLabel: "address",
                      autoCorrect: false,
                      autoCapitalize: "words",
                      onChange: this.handleAddressChange},
                    {placeholder: 'Phone Number',
                      inputContainerStyle: 'defaultInput',
                      returnKeyType: 'done',
                      autoCorrect: false,
                      stateLabel: "phone",
                      onChange: this.handlePhoneChange},
                    ]}
                />
                <View style={form.pickerContainer}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Type',
                      value: null,
                    }}
                    items={[
                      {label: 'Active', value: 'active', },
                      {label: 'Food', value: 'food'},
                      {label: 'Entertainment', value: 'entertainment'},
                      {label: 'Free', value: 'free'},
                      {label: 'Nature', value: 'nature'},
                      ]}
                      onValueChange={value => {
                        this.setState({
                          activityType: value,
                        });
                      }}
                      style={{ ...pickerSelectStyles }}
                      // ref={el => {
                      //   this.inputRefs.activityType = el;
                      // }}
                
                    />
                  </View>
              </View>
              <View flex={3} paddingHorizontal={40} justifyContent="flex-start">
                <View flexDirection="row" alignItems="center" paddingBottom={27}>
                {/* COMMENTED OUT THIS TOGGLE BECAUSE PUBLIC CUSTOM ACTIVITES ARE NOT PART OF MVP */}
                    {/* <Toggle
                    buttonOffColor={'#727e83'}
                    sliderOffColor={'#fff'}
                    buttonOnColor={'#B0CAED'}
                    sliderOnColor={'#2661B2'}
                    onToggle={(value) => {this.setState({ privateBool: value });}}
                  />
                  <Text style={form.toggleLabel}>Make Activity Private</Text> */}
                </View>
                <View flexDirection="row" alignItems="center">
                  <Toggle
                    buttonOffColor={'#727e83'}
                    sliderOffColor={'#fff'}
                    buttonOnColor={'#B0CAED'}
                    sliderOnColor={'#2661B2'}
                  />
                  <Text style={form.toggleLabel}>Save to My Activities</Text>
                </View>
              </View>
              <Text style={form.errorTextStyle}>
                  {this.state.error}
              </Text>
              {this.renderButton()}

          </View>
          </DismissKeyboard>
        )
    }
}



const form = StyleSheet.create({
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
    pickerContainer: {
      paddingHorizontal: 10,
    }

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      height: 40,
      fontSize: 14,
      paddingTop: 13,
      paddingLeft: 17,
      paddingVertical: 11,
      borderWidth: 1,
      borderColor: '#B8BeC1',
      borderRadius: 15,
      color: 'black',
  },
  inputAndroid: {
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#B8BeC1',
      borderRadius: 15,
      backgroundColor: 'white',
      color: 'black',
  },
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const mapStateToProps = state => {
  return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(CreateActivityScreen);
