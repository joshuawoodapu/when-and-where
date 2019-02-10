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

                <Setting />
                <Setting />
                <Setting />
                <Setting />
                <Setting />
                <Setting />

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