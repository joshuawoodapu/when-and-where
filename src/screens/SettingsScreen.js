import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import Setting from '../../src/components/SettingsComponents/Setting';
import ReusableHeader from '../components/ReusableHeader';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import * as actions from '../redux/actions';



class SettingsScreen extends Component {


    state ={
        fullName: '',
        email: '',


    }

    onNotifPress = () => {
        this.props.navigation.navigate('Notifications');
    }

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

    render() {
        return (
            <View style={styles.mainContainer}> 
        
                <View style={styles.settingsHolder}>

                <Setting settingName='Me'
                    currentSetting={this.props.user.fullName}
                    iconName='edit'/>
                <Setting settingName='Notifications' iconName='notifications' onPress={this.onNotifPress.bind(this)}/>
                <Setting settingName='Account' currentSetting='john.doe@gmail.com' iconName='person'/>
                <Setting settingName='Privacy' iconName='lock'/>
                <Setting settingName='Log Out' onPress={this.onLogOutPress.bind(this)} iconName='not-interested'/>
                <Setting settingName='Help' currentSetting='Questions?' iconName='help'/>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
    },
    settingsHolder: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps, actions)(SettingsScreen);