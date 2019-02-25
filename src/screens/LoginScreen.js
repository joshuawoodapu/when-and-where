import React, { Component } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as actions from '../redux/actions';
import Spinner from "../components/common/Spinner";
import DynamicInput from "../components/common/DynamicInput";
import RButton from "../components/common/RButton";
import LoginRedirect from '../components/loginComponents/LoginRedirect';

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = { email: '', password: '', error: '', loading: false };

    handlePasswordChange = (typedText) => {
        this.setState({password:typedText}, () => {
          console.log("passwordType");
        });
    }

    handleEmailChange = (typedText) => {
        this.setState({email:typedText}, () => {
          console.log(typedText);
        });
    }

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch((error) => {
                    this.setState({ error: error, loading: false });
                });
        });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false });
    }

    onLoginSuccess = async () => {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        const user = await firebase.auth().currentUser;
        console.log(user);
        if (user !== null)
            this.props.userLoad(user);
        //await AsyncStorage.setItem('accessToken', user.accessToken);
        //await AsyncStorage.setItem('refreshToken', user.refreshToken);

        this.props.navigation.navigate('App');
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />; }

        return (
          <RButton flex={1} onPress={this.onButtonPress.bind(this)}>
              LOG IN
          </RButton>
        );
    }

    render() {
        return (
            <DismissKeyboard style={styles.toplevel}>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo}
                    source={require('../components/images/whenwherelogo.png')}/>

                    <View style={styles.formStyle}>
                        <DynamicInput placeholderList={[
                            {placeholder: 'Email',
                              inputContainerStyle: 'loginInput',
                              inputStyle: "loginText",
                              autoCapitalize: "none",
                              spellCheck: false,
                              stateLabel: "email",
                              iconStyle: "MCIcon",
                              iconName: "email-variant",
                              iconColor: "#B8BEC1",
                              iconSize: 22,
                              onChange: this.handleEmailChange},
                            {placeholder: 'Password',
                              secureTextEntry: true,
                              inputContainerStyle: 'loginInput',
                              inputStyle: "loginText",
                              stateLabel: "password",
                              returnKeyType: "done",
                              autoCorrect: false,
                              autoCapitalize: "none",
                              iconStyle: "MCIcon",
                              iconName: "lock",
                              iconColor: "#B8BEC1",
                              iconSize: 22,
                              onChange: this.handlePasswordChange},
                            ]}
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
        flex: 2,
        justifyContent: 'space-around', },
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

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps, actions)(LoginScreen);