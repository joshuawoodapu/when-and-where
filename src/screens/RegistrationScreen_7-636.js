/*FOR CAMPBELL'S USE -- PLEASE IGNORE*/
import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {DynamicInput} from 'react-native-elements';
import RHeader from '../components/common/RHeader';
import DynamicInput from '../components/common/DynamicInput';

import DynamicInput from '../components/common/DynamicInput';


import Footer from '../components/Footer';
import Spinner from "../components/common/Spinner";
import firebase from 'firebase';


class RegistrationScreen extends Component {
    static navigationOptions = {
        headerVisible: true,
    };

    state = { name: '', email: '', password: '', password_confirm: '', error: '', loading: false };

    onButtonPress() {
        const { name, email, password_confirm, password } = this.state;
        this.setState({ error: '', loading: true });

        if( password === password_confirm ){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onRegisterSuccess.bind(this))
                .catch(this.onRegisterFail.bind(this));
        } else {
            this.setState({ error: "Passwords do not match", loading: false });
        }
    }

    onRegisterFail() {
        this.setState({ error: 'Registration Failed.', loading: false });
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
            <View style={button.viewStyle}>
                <TouchableOpacity style={button.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                    <Text style={button.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <DismissKeyboard>
            <View>
                <RHeader>YO</RHeader>
                <View style={form.formStyle}>
                  <DynamicInput placeholderList={[
                      {placeholder: 'Full Name',
                        inputContainerStyle: 'regScreenInput',
                        secureTextEntry: false},
                      {placeholder: 'Email',
                        secureTextEntry: false},
                      {placeholder: 'Password',
                        secureTextEntry: true},
                      {placeholder: 'Confirm Password',
                        secureTextEntry: true},
                      ]}
                  />
                    {/*
                      <DynamicInput (PRE-REFS & ONSUBMIT) placeholderList={[
                          {placeholder: 'Full Name',
                            inputContainerStyle: 'regScreenInput',
                            secureTextEntry: false},
                          {placeholder: 'Password',
                            returnKeyType: 'done',
                            secureTextEntry: true}
                          ]}
                      />

                      <Okay
                        placeholderList={[
                          {phName: 'Full Name',
                              phProperties:[{propName: 'inputContainerStyle', propValue: 'regScreenInput'},
                                            {propName: 'returnKeyType', propValue: ""},
                                            {propName: 'secureTextEntry', propValue: false}],
                          },
                          {phName: 'Password',
                              phProperties:[{propName: 'inputContainerStyle', propValue: 'defaultInput'},
                                            {propName: 'returnKeyType', propValue: "go"},
                                            {propName: 'secureTextEntry', propValue: true}],
                          },
                        ]}
                      />

                      placeholderList={[
                        {phName: 'Full Name',
                            phProperties:[{propName: 'returnKeyType', propValue: ""},
                                          {propName: 'secureTextEntry', propValue: false}],
                        },
                        {phName: 'Password',
                            phProperties:[{propName: 'returnKeyType', propValue: "go"},
                                          {propName: 'secureTextEntry', propValue: true}],
                        },
                      ]
                      }

                      placeholderList={[
                        {phName: 'Full Name',
                            phProperties:[{propName: 'inputContainerStyle', propValue: 'regScreenInput'},
                                          {propName: 'returnKeyType', propValue: ""},
                                          {propName: 'secureTextEntry', propValue: false}],
                        },
                        {phName: 'Password',
                            phProperties:[{propName: 'inputContainerStyle', propValue: 'defaultInput'},
                                          {propName: 'returnKeyType', propValue: "go"},
                                          {propName: 'secureTextEntry', propValue: true}],
                        },
                      ]}

                      <DynamicInput
                        placeholder="First" returnKeyType="next" onSubmitEditing={() => this.passwordRef.focus()}
                      />
                      <DynamicInput
                        placeholder="Second" secureTextEntry ref={ref => this.passwordRef = ref}
                      />

                      <Fuck placeholderList={['Fourth', 'Fifth']}/>

                      <DynamicInput
                        placeholder="DynamicInput 1"
                        inputContainerStyle={form.DynamicInput}
                        returnKeyType="next"

                      />
                      <DynamicInput
                        label="input2"
                        placeholder="DynamicInput 2"
                        inputContainerStyle={form.DynamicInput}
                      />

                    <TextInput
                        placeholder="Full Name"
                        label="name"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        returnKeyType="next"
                        style={form.DynamicInput}
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <TextInput
                        placeholder="Email"
                        label="email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        returnKeyType="next"
                        style={form.DynamicInput}
                        ref={(DynamicInput) => this.emailInput = DynamicInput}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        label="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        returnKeyType="next"
                        style={form.DynamicInput}
                        ref={(DynamicInput) => this.passwordInput = DynamicInput}
                        onSubmitEditing={() => this.confirmInput.focus()}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        label="password_confirm"
                        value={this.state.password_confirm}
                        onChangeText={password_confirm => this.setState({ password_confirm })}
                        returnKeyType="go"
                        style={form.DynamicInput}
                        ref={(DynamicInput) => this.confirmInput = DynamicInput}
                    />
                    */}
                </View>

                <Text style={form.errorTextStyle}>
                    {this.state.error}
                </Text>

                <Footer />

                {this.renderButton()}

            </View>
            </DismissKeyboard>
        )
    }
}

const form = StyleSheet.create({
    formStyle: {
       padding: 35, },
    DynamicInput: {
        height: 50,
        backgroundColor: '#ffffff',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10, },
    errorTextStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: '#E23737',
        marginTop: 10 }
});

const button = StyleSheet.create({
    buttonContainer: {
       backgroundColor: '#ED7248',
       paddingVertical: 20,
       paddingHorizontal: 20,
       borderRadius: 30,
       width: 330,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default RegistrationScreen;
