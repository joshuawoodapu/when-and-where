import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import SwitchToggle from "../components/common/Switch.js";
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";


export default class NewPlanScreen1 extends Component {

    render() {
        return (
            <ScrollView style={form.formStyle}>

            <Modal isVisible={true}>
              <View style={styles.modalContainer}>

                <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Confirmation</Text>
                </View>

                <View style={stylesText.formStyle}>
                <Text style={stylesText.text}>Plan Name</Text>
                </View>

                <View style={stylesText.formStyle}>
                <Text style={stylesTextBlueCenter.text}>Halloween Night</Text>
                </View>

            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>Whos Going?</Text>
            </View>

            <View style={containerStyle.rowContainer}>

            <Avatar
            rounded
            source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',  }}
            />

            <Avatar
            rounded
            source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',  }}
            />

            <Avatar
            rounded
            source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',  }}
            />

            </View>

            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>When?</Text>
            </View>

            <View style={stylesTextBlueCenter.formStyle}>
            <Text style={stylesTextBlueCenter.text}>Wednesday, October 31 at 3:00 PM</Text>
            </View>


            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>Privacy</Text>
            </View>

            <View style={containerStyle.rowContainer}>

            <Icon
            raised
            name='lock'
            type='font-awesome'
            color='#2661B2'
            />

            <View style={stylesText.formStyle}>
            <Text style={stylesTextBlueCenter.text}>Private</Text>
            </View>

            </View>

            <View style={containerStyle.rowContainer}>

            <Icon
            raised
            name='close'
            type='font-awesome'
            color='#2661B2'
            onPress={() => console.log('check')} />

            <Icon
            raised
            name='check'
            type='font-awesome'
            color='#2661B2'
            onPress={() => console.log('Private')} />

            </View>

            </View>
            </Modal>

            </ScrollView>
        );
    }
}

const form = StyleSheet.create({
    formStyle: {
       padding: 35,
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
    }
});

const button = StyleSheet.create({
    buttonContainer: {
       backgroundColor: '#ED7248',
       paddingVertical: 20,
       paddingHorizontal: 20,
       borderRadius: 30,
       width: 330,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    }
});

const stylesText = StyleSheet.create({
    formStyle: {
       padding: 35,
       flex: 1,
       flexDirection: 'row',
       alignSelf: 'flex-start'
    },
    text: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#b8bec1',
        paddingHorizontal: 10,
    },
    redirect: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#ED7248',
        paddingHorizontal: 10,
    }
});

const stylesTextBlueCenter = StyleSheet.create({
    formStyle: {
       padding: 35,
       flex: 1,
       flexDirection: 'row',
       alignSelf: 'flex-start'
    },
    text: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#2661B2',
        paddingHorizontal: 10,
    },
    redirect: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#ED7248',
        paddingHorizontal: 10,
    }
});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

const stylesActivityCard = StyleSheet.create({
    formStyle: {
       padding: 35,
       flex: 1,
       flexDirection: 'row',
       alignSelf: 'center'
    },
    buttonContainer: {
       backgroundColor: '#F0F3F7',
       paddingVertical: 20,
       paddingHorizontal: 20,
       borderRadius: 30,
       width: 330,
    },
    text: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#2661B2',
        paddingHorizontal: 10,
    },
    redirect: {
        height: 50,
        marginBottom: 25,
        borderRadius: 15,
        color: '#F0F3F7',
        paddingHorizontal: 10,
    }
});
