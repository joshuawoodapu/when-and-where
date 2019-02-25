import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RHeader from '../components/common/RHeader';
import Tabs from '../components/Tabs';
import ProfileBanner from '../components/ProfileComponents/ProfileBanner';
import ProfileDescription from '../components/ProfileComponents/ProfileDescription';
import { Icon } from 'react-native-elements';



class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'MY PROFILE',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        },
        headerRight:  (
          <Icon
            name="settings"
            size={30}
            color="#B8BEC1"
            onPress={()=>{ navigation.navigate('Settings'); }}
          />
        )
    });

    onPressProfile() {
        this.props.navigation.navigate('Settings');
    }

    render() {
        return (
            <View style={styles.topViewContainer}>
                <View style={styles.rowContainer}>
                        <ProfileBanner />
                </View>

                <View style={styles.descriptionContainer}>
                <ProfileDescription
                description="Hello friends, this is my description"
                planCount='250'
                />
                </View>
                <Tabs style={styles.Tabs}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    topViewContainer:{
        flex: 1,
        flexDirection: 'col',
        justifyContent: 'center'
    },
    rowContainer: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    descriptionContainer:{
        flex: .25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth: 5,
        // borderColor: 'purple'
    },
    Tabs: {
        flex: 1
    }
});

export default ProfileScreen;
