import React, { Component } from 'react';
import SwitchToggle from "../components/common/Switch.js";
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,
    DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid} from 'react-native';
import RHeader from "../components/common/RHeader.js";
import RButton from "../components/common/RButton.js";
import DynamicInput from "../components/common/DynamicInput.js";
import Toggle from "../components/common/Toggle.js";
import Avatars from '../../src/components/common/Avatars';
import FlipToggle from 'react-native-flip-toggle-button';


export default class NewPlanScreen1 extends Component {

  state = {
  isModalVisible: false,
};

_toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        return (



              <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <View flex={1}>
              <View flex={1} paddingLeft={33} paddingTop={35}>
                <RHeader>Confirmation</RHeader>
              </View>

              <View paddingHorizontal={24} paddingTop={17} paddingBottom={27}>
                <Text style={styles.textLabel}>PLAN NAME</Text>
                <Text>Sample Name</Text>
              </View>

              <View paddingHorizontal={24}>
                <Text style={styles.textLabel}>WHOS GOING?</Text>
              </View>

              <View paddingBottom={2} paddingHorizontal={8}>
                <Avatars />
              </View>

              <View paddingHorizontal={24} paddingBottom={24}>
                <Text style={styles.textLabel}>WHEN?</Text>
                <Text> Wednesday, October 31 at 3:00 PM </Text>
              </View>

              <View paddingHorizontal={24}>
                <Text style={styles.textLabel}>PRIVACY</Text>
                <Text> Private </Text>
                </View>
              </View>

          </ScrollView>

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
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    },
    textLabel: {
      fontFamily: 'circular-std-medium',
      fontSize: 12,
      color: '#B8BEC1',
      paddingLeft: 11,
      paddingVertical: 6
    },
    formStyle: {
      flex: 4,
      paddingHorizontal: 24,
      justifyContent: 'space-around'
    },
    errorTextStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: '#E23737',
        marginTop: 10
    },
    toggleLabel: {
      fontSize: 14,
      color: "#2661B2",
      paddingLeft: 10
    },
    toggleContainer: {
      paddingHorizontal: 9,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 43
    },
    dateStyle: {
      fontSize: 10
    }
});
const stylesDate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
