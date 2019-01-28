import React, { Component } from 'react';
import { View, Image, Text, TextInput, Button, Icon, Container, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import firebase from 'firebase';
import Spinner from "../components/common/Spinner"
import LoginRedirect from '../components/loginComponents/LoginRedirect';

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                this.setState({ error: "We can't find an account with that email address", loading: false });
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

        this.props.navigation.navigate('Home');
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
            <View style={button.viewStyle}>
                <TouchableOpacity style={button.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                    <Text style={button.buttonText}>LOG IN</Text>
                </TouchableOpacity>
            </View>
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
                    <LoginRedirect navigation={this.props.navigation} style={styles.redirect}/>


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
        height: '100%' },
    mainContainer: {
        flexGrow: 1,
        height: '100%',
        justifyContent: 'space-between',
        padding: 20 },
    logo: {
        width: null,
        resizeMode: 'contain',
        height: '33%',
        marginTop: '25%' },
    button: {
        alignSelf: 'flex-end' },
    redirect: {
        alignSelf:'flex-end' },
    testBorder: {
        borderColor: '#0ac45555',
        borderWidth: 2 },
    formStyle: {
        // padding: 35,
        justifyContent: 'space-between', },
    input2: {
        height: 50,
        backgroundColor: '#ffffff',
        //marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10, },
    input1: {
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoginScreen;