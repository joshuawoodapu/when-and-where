import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Setting from '../../src/components/SettingsComponents/Setting';
import ReusableHeader from '../components/ReusableHeader';


class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}> 
            
                <ReusableHeader title="SETTINGS"/>

                <View style={styles.settingsHolder}>

                <Setting settingName='Me'
                    currentSetting='Jen Smith'
                    iconName='edit'/>
                <Setting settingName='Notifications' currentSetting='All' iconName='notifications'/>
                <Setting settingName='Account' currentSetting='john.doe@gmail.com' iconName='person'/>
                <Setting settingName='Privacy' iconName='lock'/>
                <Setting settingName='Log Out' iconName='not-interested'/>
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