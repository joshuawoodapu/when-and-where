import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RHeader from '../common/RHeader';


class ProfileDescription extends Component {
    render() {
        return (
            <View style={styles.biggoContainer}> 
                <Text style={styles.descriptionText}>
                {this.props.description}
                </Text>
                <View style={styles.planCountBox}>
                    <Text style={styles.planCountText}>
                    {this.props.planCount}
                    </Text>
                    <Text style={styles.bigPlan}>
                    PLANS
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    biggoContainer:{
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    descriptionText: {
        color: '#727E83',
        fontSize: 14,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    planCountText: {
        color: '#727E83',
        fontSize: 20,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center'

    },
    bigPlan:{
        color: '#727E83',
        fontSize: 10,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    planCountBox:{
        alignContent: 'center',
        alignSelf: 'center',
        // borderWidth: 5,
        // borderColor: 'green'
    }
});

export default ProfileDescription;