import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Comment from './Comment';

class CommentsScreen extends Component {
    static navigationOptions = {
        title: 'COMMENTS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    render() {
        return (
            <View>
                {comments.map((comment, index) =>
                    <View key={index}>
                        <Comment 
                            username={comment.name} 
                            content={comment.comment} 
                            time={comment.timeSincePost} />
                    </View>
                )}
            </View>
        )
    }
}

const comments = [
    {
        name: 'Joseph K.',
        comment: "I’m highly allergic to dairy. I can’t go to an ice cream shop.",
        timeSincePost: '2h'
    },
    {
        name: 'Janelle M.',
        comment: "It be like that sometimes",
        timeSincePost: '1h'
    },
    {
        name: 'Emily H.',
        comment: "Would frozen yogurt be okay?",
        timeSincePost: '5m'
    }
]
export default CommentsScreen;