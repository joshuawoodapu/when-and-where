import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import RHeader from '../components/common/RHeader';
import RButton from '../components/common/RButton';

import Okay2 from '../components/common/Okay2';
import Dropdown from '../components/common/Dropdown';

import Spinner from "../components/common/Spinner";
import firebase from 'firebase';

class CreateActivityScreen extends Component {
    static navigationOptions = {
        headerVisible: true,
    };

    state = { name: '', email: '', password: '', password_confirm: '', error: '', loading: false };

    onButtonPress() {
        const { name, email, password_confirm, password } = this.state;
        this.setState({ error: '', loading: true });

    }

    onRegisterFail() {
        this.setState({ error: 'Failed to create activity.', loading: false });
    }

    onRegisterSuccess() {
        this.setState({
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            loading: false,
            error: ''
        });

        this.props.navigation.navigate('AppNav');
    }

    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
            <RButton flex={1} onPress={this.onButtonPress.bind(this)}>
                SAVE ACTIVITY
            </RButton>
        );
    }

    render() {
        return (
          <DismissKeyboard>
          <View flex={1}>
              <View flex={1} paddingLeft={35} paddingTop={35}>
                <RHeader>Create Activity</RHeader>
              </View>
              <View style={form.formStyle}>
                <Okay2 placeholderList={[
                    {placeholder: 'Activity Name',
                      inputContainerStyle: 'defaultInput',
                      autoCapitalize: "words",
                      stateLabel: "name"},
                    {placeholder: 'Address',
                      inputContainerStyle: 'defaultInput',
                      stateLabel: "address",
                      autoCapitalize: "words"},
                    {placeholder: 'Phone Number',
                      inputContainerStyle: 'defaultInput',
                      returnKeyType: 'done',
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

              <View flex={3}>
                <Text style={form.tempToggle}>Make Activity Private</Text>
                <Text></Text>
                <Text></Text>
                <Text style={form.tempToggle}>Save to My Activities</Text>
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
    tempToggle: {
      fontSize: 14,
      color: "#2661B2",
      paddingLeft: 75
    }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default CreateActivityScreen;
