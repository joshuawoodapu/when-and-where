import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Comment from './Comment';
import { ListItem } from 'react-native-elements';

class CommentsScreen extends Component {
    static navigationOptions = {
        title: 'COMMENTS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    /* <FlatList
        data={comments}
        renderItem={({ comment, index }) =>
            <Comment
                username={comment.user}
                content={comment.comment}
                time={comment.created} />}
        /> 
    */

    render() {
        return (
            <View>
                {comments.map((c, index) =>
                    <View key={index}>
                        <Comment
                            username={c.user}
                            avatar={c.avatar_url}
                            content={c.content}
                            created={c.created} />
                    </View>
                )}
            </View>
        )
    }
}

const comments = [
    {
        user: 'Joseph K.',
        avatar_url: 'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
        content: "I’m highly allergic to dairy. I can’t go to an ice cream shop.",
        created: '2h'
    },
    {
        user: 'Janelle M.',
        avatar_url: 'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
        content: "It be like that sometimes",
        created: '1h'
    },
    {
        user: 'Emily H.',
        avatar_url: 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg',
        content: "Would frozen yogurt be okay?",
        created: '5m'
    }
]
export default CommentsScreen;