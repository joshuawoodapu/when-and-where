import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase';
import uploadAsFile from '../firebase/writeFunctions';
import ReusableHeader from '../components/ReusableHeader';
import RButton from '../components/common/RButton';


class ProfileScreen extends Component {
    state = {
        imageSource: null,
        progress: 0
    }

    onPressProfile() {
        this.props.navigation.navigate('Settings');
    }

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
            <View style={styles.mainContainer}>
                <View style={styles.topViewContainer}>
                    <ReusableHeader title="PROFILE"/>
                    <TouchableOpacity onPress={this.onPressProfile.bind(this)} style={styles.button} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                    />
                    {this.state.image &&
                    <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    topViewContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1
    },
    button:{
        width: 30,
        height: 30,
        color: '#ff4c0a',
        borderWidth: 5
    }
});

export default ProfileScreen;
