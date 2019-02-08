import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Comment extends Component {
    
    render() {
        return (
            <View>
                <Text>{this.props.username}</Text>
                <Text>{this.props.time}</Text>
                <Text>{this.props.content}</Text>
                
                <Text>-------</Text>
            </View>
        )
    }
}

export default Comment;