import React, { Component } from 'react';
import {ScrollView ,View, Text, StyleSheet} from 'react-native';
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
                    iconName='user'/>
                <Setting settingName='Notifications' currentSetting='All' iconName='user'/>
                <Setting settingName='Account' currentSetting='john.doe@gmail.com' iconName='user'/>
                <Setting settingName='Privacy' iconName='user'/>
                <Setting settingName='Help' currentSetting='Questions?' iconName='user'/>
                <Setting settingName='Log Out' iconName='user'/>

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