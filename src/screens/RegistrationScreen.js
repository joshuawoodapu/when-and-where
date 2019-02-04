import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import Spinner from "../components/common/Spinner";
import firebase from 'firebase';
// import RegisterForm from '../src/components/registerForm';
// import RegisterButton from '../src/components/registerButton';

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

    onRegisterSuccess = async (user) => {
        this.setState({ 
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            loading: false,
            error: ''
        });
        user = firebase.auth().currentUser; 
        console.log(user);
        await AsyncStorage.setItem('userToken', user.uid);

        this.props.navigation.navigate('App');
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
                <Header />
                <View style={form.formStyle}>
                    <TextInput 
                        placeholder="Full Name"
                        label="name"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        returnKeyType="next"
                        style={form.input}
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <TextInput 
                        placeholder="Email"
                        label="email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        returnKeyType="next"
                        style={form.input}
                        ref={(input) => this.emailInput = input}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <TextInput 
                        placeholder="Password"
                        secureTextEntry
                        label="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        returnKeyType="next"
                        style={form.input}
                        ref={(input) => this.passwordInput = input}
                        onSubmitEditing={() => this.confirmInput.focus()}
                    />
                    <TextInput 
                        placeholder="Confirm Password"
                        secureTextEntry
                        label="password_confirm"
                        value={this.state.password_confirm}
                        onChangeText={password_confirm => this.setState({ password_confirm })}
                        returnKeyType="go"
                        style={form.input}
                        ref={(input) => this.confirmInput = input}
                    />
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
    input: {
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