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
            <View>
                <View style={styles.container}>
                    <Avatar
                        rounded
                        size="medium"
                        containerStyle={{ marginRight: 7 }}
                        source={{ uri: avatar }} 
                    />

                    <View style={styles.contentContainer}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>

                    <Text style={styles.timestamp}>{created}</Text>
                </View>
                <Divider style={{ backgroundColor: '#B0CAED' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20
    },
    contentContainer: {
        flex: 1,
        borderColor: '#EEE',
        padding: 5,
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2661B2',
        marginBottom: 10
    },
    content: {
        fontSize: 15,
        fontWeight: '400',
        color: '#2661B2'
    },
    timestamp: {
        fontSize: 15,
        fontWeight: '400',
        color: '#2661B2',
        paddingTop: 2
    },
});

export default Comment;