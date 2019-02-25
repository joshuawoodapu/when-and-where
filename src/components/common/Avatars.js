import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class Avatars extends Component {
    renderName(name) {
      return(
        <Text style={styles.userNameText}>{name}</Text>
      );
    }

    render() {
        return (
           <View style={styles[this.props.avatarContainer] || styles.viewStyle} flexDirection="column">
                <Avatar
                    size={this.props.size}
                    rounded={this.props.rounded}
                    source={{uri: this.props.uri}}
                />
                <View paddingTop={6}>
                  {this.renderName(this.props.name)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    newPlanContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    userNameText: {
        fontFamily: 'circular-std-bold',
        fontSize: 12,
        color: "#2661B2"
    }
});
