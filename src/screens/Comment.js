import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';

class Comment extends Component {

    render() {
        const {
            avatar,
            username,
            created,
            content
        } = this.props;
        return (
            <View style={styles.container}>
                <Avatar rounded size="medium" source={{ uri: avatar }} />

                <View style={styles.contentContainer}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
                
                <Text style={styles.content}>{created}</Text>

                <Divider style={{ backgroundColor: '#B0CAED' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        borderColor: '#EEE',
        padding: 5,
    },
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