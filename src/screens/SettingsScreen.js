import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage, Text, TouchableOpacity} from 'react-native';
import Setting from '../../src/components/SettingsComponents/Setting';
import ReusableHeader from '../components/ReusableHeader';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import DynamicInput from '../components/common/DynamicInput';
import firebase from 'firebase';

class SettingsScreen extends Component {

    user = firebase.auth().currentUser;
    state ={
        fullNameInitial: '',
        fullNameConfirm: '',
        fullName: this.props.user.fullName,
        email: firebase.auth().currentUser.email,
        emailNew: '',
        emailConfirm: '',
        visibleNameChangeModal: false,
        visibleEmailChangeModal: false,
        error: ''
    }


    onNotifPress = () => {
        this.props.navigation.navigate('Notifications');
    }

    toggleNameChangeModal = () => this.setState({ visibleNameChangeModal: !this.state.visibleNameChangeModal });
    toggleEmailChangeModal = () => this.setState({ visibleEmailChangeModal: !this.state.visibleEmailChangeModal });


    onLogOutPress = async () => {
        await AsyncStorage.setItem('logged', 'false');
        this.props.navigation.navigate('Login');
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'SETTINGS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        },
    });

    handleEmailChange = (typedText) =>{
        this.setState({emailNew: typedText});
    }

    handleEmailChangeConfirm = (typedText) =>{
        this.setState({emailConfirm: typedText});
    }

    handleNameChange = (typedText) =>{
        this.setState({fullNameInitial: typedText});
    }
 
    handleNameChangeConfirm = (typedText) =>{
        this.setState({fullNameConfirm: typedText});
    }

    handleNewEmailConfirm = async () =>{
        let user = await firebase.auth().currentUser;
        if (this.state.emailNew.includes('@') && this.state.emailNew.includes('.')) {
            if(this.state.emailNew == this.state.emailConfirm){
                this.setState({email: this.state.emailConfirm});
                this.toggleEmailChangeModal();
                this.setState({error: ''}); 
                try{
                    user.updateEmail(this.state.email);
                    console.log(this.state.email);
                } catch{(error)=>{
                    console.log(error);
                }}
            }
            else{
                this.setState({error: "Fields Must Match"});
            }
        } else{
            this.setState({error: "Incorrect Email Format"});
            }
     }

    handleNewNameConfirm = async () => {
        let user = await firebase.auth().currentUser;
        if (this.state.fullNameInitial == this.state.fullNameConfirm){
            this.setState({fullName:this.state.fullNameConfirm});
            this.toggleNameChangeModal();
            this.setState({error: ''});
            try{await firebase.database().ref('/users/' + user.uid).update({
                fullName: this.state.fullName
              }).getKey()}
              catch{(error) =>{
                console.log(error);
              }
            }
            this.props.user.fullName = this.state.fullName;
            this.props.user.name = this.state.fullName;
        }
        else {
            console.log("name change fail");
            this.setState({error: "Fields Must Match"})
        }
    }



    render() {
        return (
            <View style={styles.mainContainer}> 
        
                <View style={styles.settingsHolder}>

                <Setting settingName='Me' currentSetting={this.state.fullName}
                    iconName='edit'
                    onPress={this.toggleNameChangeModal.bind(this)}
                    />
                <Setting settingName='Notifications' iconName='notifications' onPress={this.onNotifPress.bind(this)}/>
                <Setting settingName='Email' currentSetting={this.state.email} iconName='person'
                onPress={this.toggleEmailChangeModal.bind(this)}/>
                <Setting settingName='Help' currentSetting='Questions?' iconName='help'/>
                <Setting settingName='About Us' iconName='book' currentSetting=':-)'/>
                <Setting settingName='Log Out' onPress={this.onLogOutPress.bind(this)} iconName='not-interested'/>
                </View>



                {/* NAME CHANGE MODAL */}
                <Modal isVisible={this.state.visibleNameChangeModal}>
              <View style={styles.modalContainer}>
                    <Text style={styles.headerTextStyle}>Change Profile Name</Text>
                    <View style={styles.formStyle}>
                        <DynamicInput placeholderList={[
                            {placeholder: 'New Full Name',
                            inputContainerStyle: "loginInput",
                              inputStyle: "loginText",
                              autoCapitalize: "none",
                              spellCheck: false,
                              stateLabel: "nameChange",
                              onChange: this.handleNameChange},
                            {placeholder: 'Confirm Full Name',
                              inputContainerStyle: "loginInput",
                              inputStyle: "loginText",
                              autoCapitalize: "none",
                              spellCheck: false,
                              stateLabel: "nameChangeConfirm",
                              onChange: this.handleNameChangeConfirm},
                            ]}
                        />
                        
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress = {this.handleNewNameConfirm.bind(this)} >
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {this.toggleNameChangeModal.bind(this)}
                            style={styles.button}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                         </TouchableOpacity>
                    </View>
              </View>
            </Modal>

                            {/* EMAIL CHANGE MODAL */}
            <Modal isVisible={this.state.visibleEmailChangeModal}>
              <View style={styles.modalContainer}>
                    <Text style={styles.headerTextStyle}>Change Email</Text>
                    <View style={styles.formStyle}>
                        <DynamicInput placeholderList={[
                            {placeholder: 'New Email',
                            inputContainerStyle: "loginInput",
                              inputStyle: "loginText",
                              autoCapitalize: "none",
                              spellCheck: false,
                              stateLabel: "emailNew",
                              onChange: this.handleEmailChange},
                            {placeholder: 'Confirm New Email',
                              inputContainerStyle: "loginInput",
                              inputStyle: "loginText",
                              autoCapitalize: "none",
                              spellCheck: false,
                              stateLabel: "emailConfirm",
                              onChange: this.handleEmailChangeConfirm},
                            ]}
                        />
                        
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress = {this.handleNewEmailConfirm.bind(this)} >
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {this.toggleEmailChangeModal.bind(this)}
                            style={styles.button}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                         </TouchableOpacity>
                    </View>
                    
                    
              </View>
            </Modal>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    defaultInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        paddingLeft: 17,
        paddingBottom: 14,
      },
    modalFields:{
        flex: 2,
        justifyContent: 'space-around',
    },
    mainContainer: {
        flex: 1, 
    },
    settingsHolder: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    modalContainer: {
        height: "60%",
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: .8,
        justifyContent: 'space-around',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    formStyle: {
        width: '90%',
        justifyContent: 'space-around'
    },
    error: {
        flex: .2,
        fontSize: 12,
        alignSelf: 'center',
        color: '#E23737',
        marginTop: 15
    },
    ////////////////////////Header////////////////////
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
});

const mapStateToProps = state => {
    return { user: state.user, fullName: state.fullName, email: state.email };
}

export default connect(mapStateToProps, actions)(SettingsScreen);