import React, { Component } from 'react';
import { View, Image, Text, TextInput, Button, Icon, Container, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LoginButton from '../components/loginComponents/LoginButton';
import LoginForm from '../components/loginComponents/LoginForm';
import LoginRedirect from '../components/loginComponents/LoginRedirect';

class LoginScreen extends Component {
    render() {
        return (
            <DismissKeyboard style={styles.toplevel}>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo}
                    source={require('../components/images/whenwherelogo.png')}/>
                    <View>
                        <LoginForm />
                        <LoginRedirect style={styles.redirect}/>
                    </View>
                    <LoginButton style={styles.button}/>
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
    }
  

});

export default LoginScreen;