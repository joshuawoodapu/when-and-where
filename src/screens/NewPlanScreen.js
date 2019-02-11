import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, DatePickerIOS } from 'react-native';
import SwitchToggle from "../components/common/Switch.js";
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import FlipToggle from 'react-native-flip-toggle-button';


export default class NewPlanScreen extends Component {

  constructor(props) {
         super(props);
         this.state = {
           isSwitch1On: false,}

           this.state = {chosenDate: new Date()};

           this.setDate = this.setDate.bind(this);
         };

         setDate(newDate) {
           this.setState({chosenDate: newDate});
         }


    render() {
        return (
            <ScrollView style={form.formStyle}>

                <View style={stylesTextBlueStart.formStyle}>
                <Text style={stylesTextBlueCenter.text}>New Plan</Text>
                </View>

                <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Create A New Plan</Text>
                </View>

                <View style={stylesText.formStyle}>
                <Text style={stylesText.text}>Plan Name</Text>
                </View>

                <TextInput
                placeholder="Typing"
                returnKeyType="next"
                style={form.input}
                onSubmitEditing={() => this.emailInput.focus()}
                />

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

            <View style={stylesDate.container}>
            <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
            />
            </View>

            <View style={stylesText.formStyle}>
            <Text style={stylesText.text}>Privacy</Text>
            </View>

            <View style={containerStyle.rowContainer}>

            <FlipToggle
                           value={this.state.isSwitch1On}
                           buttonWidth={34}
                           buttonHeight={20.4}
                           buttonRadius={50}
                           buttonOffColor={'#727e83'}
                           sliderOffColor={'#fff'}
                           buttonOnColor={'#B0CAED'}
                           sliderOnColor={'#fff'}
                           onToggle={(value) => {
                           this.setState({ isSwitch1On: value });
                           }}
            />

            <View style={stylesText.formStyle}>
            <Text style={stylesTextBlueCenter.text}>Make Plan Private</Text>
            </View>

            </View>


            <TouchableOpacity style={button.buttonContainer}>
                <Text style={button.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
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
       alignItems: 'center',
       justifyContent: 'center',
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

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

const stylesDate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
