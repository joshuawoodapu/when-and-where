import React, { Component } from 'react';
import { View, Image, Text, TextInput, Button, Icon, Container, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from 'firebase';
import LoginButton from '../components/loginComponents/LoginButton';
// import LoginForm from '../components/loginComponents/LoginForm';
import Spinner from "../components/common/Spinner"
import LoginRedirect from '../components/loginComponents/LoginRedirect';

class LoginScreen extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false });
    }

    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button 
                onPress={this.onButtonPress.bind(this)}
                title="Log in" 
            />
        );
    }

    render() {
        return (
            <DismissKeyboard style={styles.toplevel}>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo}
                    source={require('../components/images/whenwherelogo.png')}/>

                    <View style={styles.formStyle}>
                        <TextInput 
                            placeholder="Email"
                            label="Email"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            returnKeyType="next"
                            style={styles.input1}
                        />
                        <TextInput 
                            secureTextEntry
                            placeholder="Password"
                            label="Password"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            returnKeyType="next"
                            style={styles.input2}
                        />
                    </View>
            
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    <LoginRedirect style={styles.redirect}/>


                    {this.renderButton()}
                    
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

const styles = StyleSheet.create({
    toplevel: {
        height: '100%'
    },
    mainContainer: {
            flexGrow: 1,
            height: '100%',
       // width: null,
      //  height: null,
           // flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20,
           
    },
    logo: {
        width: null,
        resizeMode: 'contain',
        height: '33%',
        marginTop: '25%'

    },
    form: {
    },
    button: {
        alignSelf: 'flex-end'
    },
    redirect: {
        alignSelf:'flex-end'
    },
    testBorder: {
        borderColor: '#0ac45555',
        borderWidth: 2 
    },
    formStyle: {
        // padding: 35,
        justifyContent: 'space-between',
    },
    input2: {
        height: 50,
        backgroundColor: '#ffffff',
        //marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
    input1: {
        height: 50,
        backgroundColor: '#ffffff',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginScreen;