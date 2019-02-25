import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, Vibration} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import RHeader from '../components/common/RHeader';
import RButton from '../components/common/RButton';
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
            console.log(email + password)
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onRegisterSuccess.bind(this))
                .catch(error => {
                    console.log(error.code)
                    this.onRegisterFail.bind(this)
                });
            });
        } else {
            Vibration.vibrate(1000)
            this.setState({ error: "Passwords do not match", loading: false });
        }
    }

    onRegisterFail() {
        this.setState({ error: 'Registration failed.', loading: false });
    }

    onRegisterSuccess = async () => {
        const user = await firebase.auth().currentUser;
        

        await firebase.database().ref('users/' + user.uid).set({
          fullName: this.state.name
        });

        //await AsyncStorage.setItem('accessToken', user.accessToken);
        //await AsyncStorage.setItem('refreshToken', user.refreshToken);

        if (user !== null)
            this.props.userLoad(user);


        this.setState({
          name: '',
          email: '',
          password: '',
          password_confirm: '',
          loading: false,
          error: ''
        });

        this.props.navigation.navigate('App');
    }

    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
          <View flex={1} paddingHorizontal={28} paddingBottom={28}>
            <RButton flex={1} onPress={this.onButtonPress.bind(this)}>
                CONTINUE
            </RButton>
          </View>
        );
    }

    handleNameChange = (typedText) => {
        this.setState({name:typedText}, () => {
          console.log(typedText);
        });
    }

    handleEmailChange = (typedText) => {
        this.setState({email:typedText}, () => {
          console.log(typedText);
        });
    }

    handlePasswordChange = (typedText) => {
        this.setState({password:typedText}, () => {
          console.log("passwordType");
        });
    }

    handlePasswordConfirmChange = (typedText) => {
        this.setState({password_confirm:typedText}, () => {
          console.log("passwordConfirmType");
        });
    }



    render() {
        return (
            <DismissKeyboard>
            <View flex={1}>
              <View flex={2} paddingLeft={48}>
                <RHeader>Create Account</RHeader>
              </View>
              <View style={form.formStyle}>
                  <DynamicInput placeholderList={[
                      {placeholder: 'Full Name',
                        inputContainerStyle: 'regScreenInput',
                        autoCorrect: false,
                        autoCapitalize: "words",
                        stateLabel: "name",
                        onChange: this.handleNameChange},
                      {placeholder: 'Email',
                        inputContainerStyle: 'regScreenInput',
                        autoCorrect: false,
                        autoCapitalize: "none",
                        stateLabel: "email",
                        spellcheck: false,
                        onChange: this.handleEmailChange},
                      {placeholder: 'Password',
                        inputContainerStyle: 'regScreenInput',
                        secureTextEntry: true,
                        autoCorrect: false,
                        stateLabel: "password",
                        onChange: this.handlePasswordChange},
                      {placeholder: 'Confirm Password',
                        inputContainerStyle: 'regScreenInput',
                        secureTextEntry: true,
                        returnKeyType: 'done',
                        autoCorrect: false,
                        stateLabel: "password_confirm",
                        onChange: this.handlePasswordConfirmChange},
                      ]}
                  />
                </View>

                <Text style={form.errorTextStyle}>
                    {this.state.error}
                </Text>

                <View flex={2}>
                  <Footer/>
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
      paddingHorizontal: 40,
      justifyContent: 'space-between'
    },
    errorTextStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: '#E23737',
        marginTop: 10
    }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps, actions)(RegistrationScreen);