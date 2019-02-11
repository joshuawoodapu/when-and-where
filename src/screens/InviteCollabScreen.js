import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Avatars from '../../src/components/common/Avatars';

export default class InviteCollabsScreen extends Component {
    render() {
        return (
           <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>INVITE COLLABORATORS</Text>
                </View> 

                <View style={styles.textHeaderView}>
                    <Text style={styles.textHeader}>ADD USERS</Text>
                </View>

                <DismissKeyboard>
                    <View style={styles.formStyle}>
                        <TextInput placeholder="Name or Username" style={styles.input}/>
                    </View>
                </DismissKeyboard>

                <Avatars />

                <View style={styles.textHeaderView}>
                    <Text style={styles.textHeader}>INVITATION MESSAGE</Text>
                </View>

                <DismissKeyboard>
                    <View style={styles.messageView}>
                        <TextInput placeholder="Your message here!" style={styles.messageBox} multiline={true} />
                    </View>
                </DismissKeyboard>

                <View style={styles.inviteButtonView}>
                    <TouchableOpacity style={styles.inviteContainer}>
                        <Text style={styles.inviteButtonText}>INVITE</Text>
                    </TouchableOpacity>
                </View>
                
            </View> 
        );
    }
}

const styles = StyleSheet.create({
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
        marginLeft: 40
    },
    textHeader: {
        fontSize: 12,
        color: '#2661B2',
        fontWeight: 'bold',
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
        backgroundColor: '#ffffff',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
/////////////Invite Button//////////////////////////
    inviteContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
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
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);