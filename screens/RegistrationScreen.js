import React, { Component } from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import RegisterForm from '../src/components/registerForm';
import RegisterButton from '../src/components/registerButton';

class RegistrationScreen extends Component {
    render() {
        return (
            <DismissKeyboard>
            <View>
                <Header />
                <RegisterForm />
                <Footer />
                <RegisterButton />
            </View>
            </DismissKeyboard>
        )
    }
}

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default RegistrationScreen;