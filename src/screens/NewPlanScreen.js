import React, { Component } from 'react';
import {View, Text} from 'react-native';
import StdText from '../components/StdText';
import BoldStdText from '../components/BoldStdText';

class NewPlanScreen extends Component {
    render() {
        return (
            <View>
                <StdText style={{fontSize: 56}}>NewPlan!!!!</StdText>
                <BoldStdText style={{fontSize:56}}>NewPlan!!!!</BoldStdText>
                <Text style={{fontSize: 56}}>NewPlan!!!!</Text>
            </View>
        )
    }
}

export default NewPlanScreen;