import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Divider } from 'react-native-elements';

class Comment extends Component {
    
    render() {
        return (
            <View>
                <Text style={styles.username}>{this.props.username}</Text>
                <Text style={styles.content}>{this.props.time}</Text>
                
                <Text style={styles.content}>{this.props.content}</Text>
                
                
                <Divider style={{ backgroundColor: '#B0CAED' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2661B2'
    },
    content: {
        fontSize: 15,
        fontWeight: '400',
        color: '#2661B2'
    },
});

export default Comment;