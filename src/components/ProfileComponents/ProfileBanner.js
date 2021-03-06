import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RHeader from '../common/RHeader';


class ProfileBanner extends Component {
    render() {
        return (
            <View style={styles.mainContainer}> 
                <Image style={styles.profilePic}
                    source={require('../../onboardingArt/1_corgi.png')}/>

                <View style={styles.secondaryTextContainer}>
                    <Text numberOfLines={2} style={styles.profileName}>{this.props.name}</Text>
                    <Text style={styles.locationText}>{this.props.location}</Text>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        marginRight: 15
    },
    profilePic: {
            resizeMode: 'contain',
            width: '20%',
            justifyContent: 'center',
            alignSelf: 'center',
            // borderWidth: 5,
            // borderColor: 'orange'
    },
    locationText:{
        color: '#2661B2',
        fontSize: 15,
        fontWeight: 'bold',
    },
    secondaryTextContainer: {
        width: '80%',
        paddingLeft: '3%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start',
        // borderWidth: 5,
        // borderColor: 'blue'
    },
    profileName: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    }
});

export default ProfileBanner;