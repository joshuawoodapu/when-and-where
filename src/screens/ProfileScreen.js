import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
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

    state = {
        fullName: ''
    };

    onPressProfile() {
        this.props.navigation.navigate('Settings');
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ imageSource: result.uri });
          let finalImage = await uploadAsFile(result.uri, (progress) => {
            console.log(progress)
            this.setState({ progress })
          })}
    };


    render() {
        return (
            <View style={styles.topViewContainer}>
                <View style={styles.rowContainer}>
                        <ProfileBanner name={this.props.user.fullName} />
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
        flexDirection: 'column',
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
        // borderColor: 'purple'        // borderWidth: 5,

    },
    Tabs: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps, actions)(ProfileScreen);