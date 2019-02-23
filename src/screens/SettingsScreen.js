import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import Setting from '../../src/components/SettingsComponents/Setting';
import ReusableHeader from '../components/ReusableHeader';


class SettingsScreen extends Component {
    onLogOutPress = async () => {
        await AsyncStorage.setItem('logged', 'false');
        this.props.navigation.navigate('Auth');
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
                    currentSetting='Jen Smith'
                    iconName='edit'/>
                <Setting settingName='Notifications' currentSetting='All' iconName='notifications'/>
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

export default SettingsScreen;