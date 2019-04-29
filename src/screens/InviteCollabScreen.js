import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/functions';
import * as actions from '../redux/actions';
import Avatars from '../../src/components/common/Avatars';
import DynamicInput from '../components/common/DynamicInput';

class InviteCollabsScreen extends Component {
    static navigationOptions = {
        title: 'INVITE COLLABORATORS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    state = { nameToAdd: '', displayMessage: '', greenbool: true};


    onInvitePress = async () => {
        var addCollabEmail = firebase.functions().httpsCallable('addCollabEmail');
            addCollabEmail({planId: this.props.plan.planId, collabEmail: this.state.nameToAdd})
            .then(result => {
                console.log("HAHAHA " + result.data.success);
                this.textInput.clear();
                this.setState({greenbool: true});
                this.setState({displayMessage: "Success!"});
            }).catch(() =>{
                this.setState({greenbool: false});
                this.setState({displayMessage: "Invite failed."});
            })
    };

    handleAddUserChange = (typedText) => {
        this.setState({nameToAdd:typedText});
    }

    render() {

        var avatars = [{name: "Kasey B.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Caroline R.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
        {name: "Hannah M.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
        {name: "Steve R.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        {name: "Elliot S.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Hannah K.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        {name: "Matt A.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
        {name: "Sabine C.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
        {name: "Darnell D.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        {name: "Olivia C.", size: "medium", rounded: true, uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},];

        return (
           <View>

                <View style={styles.textHeaderView}>
                    <Text style={styles.textHeader}>ADD USERS</Text>
                </View>

                <DismissKeyboard>
                    <View style={styles.formStyle}>
                    <TextInput style={styles.addUserStyle}
                      placeholder='Name or username'
                        autoCorrect={false}
                        stateLabel= "nameToAdd"
                        onChangeText= {this.handleAddUserChange}
                        returnKeyType = 'done'
                        ref = {input => { this.textInput = input}} />
                    </View>
                </DismissKeyboard>

                <View style={styles.avatarsStyle}>
                  <FlatList
                      data={avatars}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) =>
                        <Avatars
                            size={item.size}
                            rounded={item.rounded}
                            uri={item.uri}
                            avatarContainer="newPlanContainer"
                            name={item.name}
                        />
                      }
                      keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={styles.inviteMessageView}>
                    <Text style={styles.textHeader}>INVITATION MESSAGE</Text>
                </View>

                <DismissKeyboard>
                    <View style={styles.messageView}>
                        <TextInput placeholder="Your message here!" style={styles.messageBox} multiline={true} />
                    </View>
                </DismissKeyboard>

                <View style={styles.inviteButtonView}>
                    <TouchableOpacity onPress={this.onInvitePress.bind(this)} style={styles.inviteContainer}>
                        <Text style={styles.inviteButtonText}>INVITE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.responseView}>
                    <Text style={[styles.responseMessage, this.state.greenbool ? {color:'#38c45e'} : {color: '#e23737' }]}>{this.state.displayMessage}</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    responseMessage:{
        textAlign: 'center',
    },
    responseView: {
        marginTop: 10,
        justifyContent: 'center',
    },
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
        marginBottom: 25
    },
    headerTextStyle: {
        fontSize: 14,
        color: '#2661B2',
        fontWeight: 'bold',
    },
/////////////Add Users, Invitation Message Header//////////////////
    textHeaderView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginLeft: 40,
        marginTop: 50,
    },
    textHeader: {
        fontSize: 12,
        color: '#2661B2',
        fontWeight: 'bold',
    },
    inviteMessageView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginLeft: 40,
    },
/////////////Text Input Box///////////////////
    formStyle: {
        marginLeft: 35,
        marginRight: 35,
    },
    input: {
        height: 50,
        backgroundColor: '#ffffff',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
/////////////Invitation Message Box/////////////////
    messageView: {
        marginLeft: 35,
        marginRight: 35
    },
    messageBox: {
        height: 160,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        paddingTop: 16,
        paddingBottom: 14,
        paddingHorizontal: 20,
    },
    addUserStyle: {
        height: 40,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        paddingLeft: 17,
        paddingVertical: 11,
    },
/////////////Invite Button//////////////////////////
    inviteContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    inviteButtonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    inviteButtonView: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    //////////////////////Scroll View Styling///////////////////
    avatarsStyle: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
  }
  
export default connect(mapStateToProps, actions)(InviteCollabsScreen);
  