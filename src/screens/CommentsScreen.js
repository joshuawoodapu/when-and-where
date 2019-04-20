import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Comment from '../components/commentComponents/Comment';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import firebase from 'firebase';
import { Button, Icon } from 'react-native-elements';
import { parse } from 'qs';

class CommentsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_comment: '',
            loading: false,
            loadedComments: [],
            update: false
        };
    }


    static navigationOptions = ({navigation}) => ({
        title: 'COMMENTS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        },
        headerRight:  (
            <Icon
              name="refresh"
              size={30}
              color="#B8BEC1"
              onPress={navigation.getParam('forceRefresh')}
            />
          )
    });


    // This is a stop-gap re-query called by the top right refresh button
    // until I can get a db change listener working
    _forceRefresh = async() => {
        
        var keyArray = [];
        var dataArray = [];

        try {
        var commentQuery = await firebase.database().ref("/plans/"+this.props.plan.planId+"/commentthread").orderByKey();
        await commentQuery.once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                keyArray.push(key);
                dataArray.push(childData);
            });
        });
        } catch(err){
            console.log(err);
        }

        await this.setState({loadedComments: dataArray});
    }

    state = {new_comment: '', loading: true, initComments: [], loadedComments: []}

    componentWillMount = async ()=>{
        this.props.navigation.setParams({ forceRefresh: this._forceRefresh });
        this.setState({loading: true});
        var keyArray = [];
        var dataArray = [];


        try {
        var commentQuery = await firebase.database().ref("/plans/"+this.props.plan.planId+"/commentthread").orderByKey();
        await commentQuery.once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                keyArray.push(key);
                dataArray.push(childData);
            });
        });
        } catch(err){
            console.log(err);
        }
        
        await this.setState({loadedComments: dataArray});
        this.setState({loading: false});

        // Listener for updates
        commentQuery.onSnapshot(function(child){
            console.log('INSIDE LISTENER');
            this.state.loadedComments.push(object);
            this.setState(this.state);
        });

    }


    setCommentState = (value) => {
        this.setState({new_comment: value});
    }

    renderComments = () => {
        if (this.state.loading == false){
        return (
            this.state.loadedComments.map((c, index) =>
            <View key={index}>
                <Comment
                    username={c.user}
                    avatar={c.avatar_url}
                    content={c.content}
                    created={c.created} />
            </View>
        ));
        }
        else{
            return(<View></View>);
        }
    }

    postComment = async () => {
        // TODO actually make this post to comment thread

        date = new Date();
        dateOptions = {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: '2-digit'};

        planID = this.props.plan.planId
        object = {
            user: this.props.user.fullName,
            avatar_url: 'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
            content: this.state.new_comment,
            created: date.toLocaleDateString("en-us", dateOptions)
        }

        try{
            newCommentID = await firebase.database().ref('/plans/'+planID+'/commentthread/').push(object)
        }catch{(error)=>{
            console.log(error);
        }}

        // Adds new comment to loaded comments state, then forces re-render
        this.state.loadedComments.push(object);
        this.forceUpdate();

        //Clears input field.
        // Requires " ref = {input => { this.textInput = input }} " in TextInput props.
        this.textInput.clear();
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.contentContainer}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}>
                    {this.renderComments()}
                </ScrollView>

                <KeyboardAvoidingView keyboardVerticalOffset={125} behavior={"position"} styles={styles.footer}>
                    <View style={styles.postCommentContainer}>
                        <TextInput
                            ref = {input => { this.textInput = input }} 
                            placeholder="Say something..."
                            label="comment_input"
                            returnKeyType="done"
                            onChangeText={this.setCommentState.bind(this)}
                            style={styles.input}
                        />
                        <Button
                            icon={<Icon name='arrow-forward' color='#2661B2' />}
                            buttonStyle={styles.button}
                            onPress={this.postComment}
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

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan, fullName: state.fullName };
  }

export default connect(mapStateToProps, actions)(CommentsScreen);
