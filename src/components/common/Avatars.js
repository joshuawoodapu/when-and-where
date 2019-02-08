import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class Avatars extends Component {
    render() {
        return (
           <View style={styles.viewStyle}>
                <Avatar
                    size="medium"
                    rounded
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />

                <Avatar
                    size="medium"
                    rounded
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
                    }}
                />

                <Avatar
                    size="medium"
                    rounded
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                    }}
                />

                <Avatar
                    size="medium"
                    rounded
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                />

                <Avatar
                    size="medium"
                    rounded
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />

                <View style={styles.iconView}>
                <TouchableOpacity>
                    <Avatar
                        medium
                        rounded
                        icon={{name: 'add'}}
                    />
                </TouchableOpacity>
                </View> 

            </View> 
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 25
    },
    iconView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});