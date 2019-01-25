import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import RegisterForm from '../src/components/registerForm';
import RegisterButton from '../src/components/registerButton';

class RegistrationScreen extends Component {
    render() {
        return (
            <View>
                <Header />
                <RegisterForm />
                <Footer />
                <RegisterButton />
            </View>
        )
    }
}

export default RegistrationScreen;