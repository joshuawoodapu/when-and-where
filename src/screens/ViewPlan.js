import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import SwitchToggle from "../components/common/Switch.js";
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class ViewPlan extends Component {
    render() {
        return (
            <ScrollView style={form.formStyle}>


            <TouchableOpacity style={containerStyle.rowContainer}>
            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>View Plan</Text>
            </View>

            <Icon
            raised
            name='more_vert'
            type='font-awesome'
            color='#b8bec1' />

            </TouchableOpacity>

            <TouchableOpacity style={containerStyle.rowContainer}>
            <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>Halloween Night</Text>
            </View>

            <Icon
            raised
            name='arrow_forward'
            type='font-awesome'
            color='#b8bec1' />

            </TouchableOpacity>


            <View style={stylesActivityCard.buttonContainer}>
            <Text style={stylesActivityCard.text}>Josephs House</Text>
            <Text style={stylesActivityCard.text}>2310 N Cherry St,</Text>
            <Text style={stylesActivityCard.text}>Pasadena, CA 91820</Text>
            <TouchableOpacity style={containerStyle.rowContainer}>
            <Icon
            raised
            name='plus'
            type='font-awesome'
            color='#b8bec1' />

            <Icon
            raised
            name='check'
            type='font-awesome'
            color='#b8bec1' />
            </TouchableOpacity>
            </View>

            <View style={stylesActivityCard.buttonContainer}>
            <Text style={stylesActivityCard.text}>Halloween Horror Nights</Text>
            <Text style={stylesActivityCard.text}>100 Universal City Plaza,</Text>
            <Text style={stylesActivityCard.text}>Universal City, CA 91608</Text>
            <TouchableOpacity style={containerStyle.rowContainer}>
            <Icon
            raised
            name='plus'
            type='font-awesome'
            color='#b8bec1' />

            <Icon
            raised
            name='check'
            type='font-awesome'
            color='#b8bec1' />
            </TouchableOpacity>
            </View>

            <View style={stylesActivityCard.buttonContainer}>
            <Text style={stylesActivityCard.text}>Cold Stone Creamery</Text>
            <Text style={stylesActivityCard.text}>3730 S Figueroa St,</Text>
            <Text style={stylesActivityCard.text}>Los Angeles, CA 90007</Text>
            <TouchableOpacity style={containerStyle.rowContainer}>
            <Icon
            raised
            name='plus'
            type='font-awesome'
            color='#b8bec1' />

            <Icon
            raised
            name='check'
            type='font-awesome'
            color='#b8bec1' />
            </TouchableOpacity>
            </View>

            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>View Comments...</Text>
            </View>

            <View style={containerStyle.rowContainer}>

            <Icon
            raised
            name='plus'
            type='font-awesome'
            color='#2661B2'
            onPress={() => console.log('Add')} />

            <View style={stylesTextBlueStart.formStyle}>
            <Text style={stylesTextBlueStart.text}>Add a New Activity</Text>
            </View>

            </View>


            </ScrollView>
        )
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

const stylesTextBlueStart = StyleSheet.create({
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
