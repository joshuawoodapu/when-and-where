import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Comment from '../components/commentComponents/Comment';
import { Button, Icon } from 'react-native-elements';

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
            <View style={styles.container}>
                <ScrollView style={styles.contentContainer}>
                    {comments.map((c, index) =>
                        <View key={index}>
                            <Comment
                                username={c.user}
                                avatar={c.avatar_url}
                                content={c.content}
                                created={c.created} />
                        </View>
                    )}
                </ScrollView>

                <KeyboardAvoidingView keyboardVerticalOffset={125} behavior={"position"} styles={styles.footer}>
                    <View style={styles.postCommentContainer}>
                        <TextInput
                            placeholder="Say something..."
                            label="comment_input"
                            // value={this.state.new_comment}
                            // onChangeText={new_comment => this.setState({ new_comment })}
                            style={styles.input}
                        />
                        <Button
                            icon={<Icon name='arrow-forward' color='#2661B2' />}
                            buttonStyle={styles.button}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1
    },
    footer: {
        height: 100,
    },
    postCommentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 7
    },
    input: {
        borderWidth: 1,
        borderColor: '#B8BEC1',
        borderRadius: 30,
        color: '#B8BEC1',
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: 0.9
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#B0CAED',
    },
});

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
        created: '2h'
    },
    {
        user: 'Emily H.',
        avatar_url: 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg',
        content: "Would frozen yogurt be okay?",
        created: '1h'
    },
    {
        user: 'Joseph K.',
        avatar_url: 'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
        content: "That's still dairy",
        created: '1h'
    },
    {
        user: 'Emily H.',
        avatar_url: 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg',
        content: "Not all frozen yogurt",
        created: '30m'
    },
    {
        user: 'Janelle M.',
        avatar_url: 'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
        content: "But most of them are",
        created: '25m'
    },
    {
        user: 'Joseph K.',
        avatar_url: 'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
        content: "okay",
        created: '1m'
    },
]
export default CommentsScreen;