import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import RHeader from '../components/common/RHeader';
import RButton from '../components/common/RButton';
import DynamicInput from '../components/common/DynamicInput';
import Dropdown from '../components/common/Dropdown';
import Spinner from "../components/common/Spinner";
import Toggle from '../components/common/Toggle';
import firebase from 'firebase';

class CreateActivityScreen extends Component {
    static navigationOptions = {
        headerVisible: true,
    };

    state = { activityName: 'Extreme Skateboarding', address: '952 Death Street', phoneNumber: '760221000', activityType: 'Active', private: 'False', loading: false };

    onButtonPress() {
        const { name, email, password_confirm, password } = this.state;
        this.setState({ error: '', loading: true });

    }

    onRegisterFail() {
        this.setState({ error: 'Failed to create activity.', loading: false });
    }

    // onRegisterSuccess() {
    //     this.setState({
    //         ActivityName: '',
    //         email: '',
    //         password: '',
    //         password_confirm: '',
    //         loading: false,
    //         error: ''
    //     });

    //     this.props.navigation.navigate('AppNav');
    // }

    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
            <RButton flex={1} onPress={this.onSaveActivityPress.bind(this)}>
                SAVE ACTIVITY
            </RButton>
        );
    }


    onSaveActivityPress = async () => {
        let user = await firebase.auth().currentUser;
        console.log("Inside the func");
        let newActivityId = await firebase.database().ref('/activities').push({
          activityName: this.state.name,
          activityAddress: this.state.address,
          phoneNumber: this.state.phoneNumber,
          activityType: this.state.activityType,
          privateBool: this.state.private
        }).getKey()
        .catch((error) => {
          console.log(error)
      });
        this.props.navigation('ActivityScreen');
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
                      stateLabel: "name"},
                    {placeholder: 'Address',
                      inputContainerStyle: 'defaultInput',
                      stateLabel: "address",
                      autoCorrect: false,
                      autoCapitalize: "words"},
                    {placeholder: 'Phone Number',
                      inputContainerStyle: 'defaultInput',
                      returnKeyType: 'done',
                      autoCorrect: false,
                      stateLabel: "phone"},
                    ]}
                />
                <Dropdown choices={[
                    {label: 'Active', value: 'active'},
                    {label: 'Food', value: 'food'},
                    {label: 'Entertainment', value: 'entertainment'},
                    {label: 'Free', value: 'free'},
                    {label: 'Nature', value: 'nature'}
                ]}/>
              </View>

              <Text style={form.errorTextStyle}>
                  {this.state.error}
              </Text>

              <View flex={3} paddingHorizontal={40} justifyContent="flex-start">
                <View flexDirection="row" alignItems="center" paddingBottom={27}>
                  <Toggle style={styles.createActivityToggle}
                    buttonOffColor={'#727e83'}
                    sliderOffColor={'#fff'}
                    buttonOnColor={'#B0CAED'}
                    sliderOnColor={'#2661B2'}
                  />
                  <Text style={form.toggleLabel}>Make Activity Private</Text>
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
    }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default CreateActivityScreen;
