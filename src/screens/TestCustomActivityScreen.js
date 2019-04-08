import React, { Component } from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Input} from 'react-native-elements';
import RHeader from '../components/common/RHeader';
import RButton from '../components/common/RButton';
import DynamicInput from '../components/common/DynamicInput';
import Dropdown from '../components/common/Dropdown';
import Spinner from "../components/common/Spinner";
import Toggle from '../components/common/Toggle';
import firebase from 'firebase';
import Tabs from '../components/Tabs';

import ActivityCard from '../components/ActivityCard';

class TestCustomActivityScreen extends Component {


    state = {ActivityList:[], name: "FightMe", address: "Fight You", key: '-Lb-VVf_YzYj0QgFIIcP'};

    readData() {
        firebase.database().ref('Activities/').once('activityName', function (snapshot) {
            console.log(snapshot.val())
        });
        console.log("function called");
    }

    render(){
        return(
            <View>
                <Text style={StyleSheet.errorTextStyle}>
                    Title: {this.state.name}
                </Text>
                <Text style={StyleSheet.errorTextStyle}>
                    Address: {this.state.address}
                </Text>
            </View>
        )
    }
}


const form = StyleSheet.create({
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: "red",
        marginTop: 10
    },
});

export default TestCustomActivityScreen;