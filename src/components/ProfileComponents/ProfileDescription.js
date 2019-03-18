import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,
    DatePickerIOS,DatePickerAndroid,Platform,TimePickerAndroid,
    FlatList, TouchableWithoutFeedback} from 'react-native';
import RHeader from '../common/RHeader';
import Modal from "react-native-modal";
import DynamicInput from '../common/DynamicInput';
import { Icon } from 'react-native-elements';

class ProfileDescription extends Component {

  state = {
    isModalVisible: false,
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        return (
            <View style={stylesOne.biggoContainer}>

            <TouchableOpacity onPress={this._toggleModal}>
                <Text style={stylesOne.descriptionText}>
                {this.props.description}
                </Text>
            </TouchableOpacity>

            <Modal isVisible={this.state.isModalVisible}>

{/* Modal Starts */}

              <View style={{ flex: 1, paddingTop: 100, paddingBottom: 100 }}>

              <View style={styles.modalContainer}>

                <ScrollView flex={1} showsVerticalScrollIndicator={false}>

                    <View flex={1}>

                        <View flex={1} paddingHorizontal={28} paddingTop={50}>
                          <RHeader>Edit Description</RHeader>
                        </View>

                        <DismissKeyboard>
                        <View flex={1} paddingHorizontal={28} paddingTop={25}>
                            <View style={styles.messageView}>
                                <TextInput placeholder="Edit Description" style={styles.messageBox} multiline={true} />
                            </View>
                          </View>
                        </DismissKeyboard>

                        <View paddingHorizontal={24}>

                          <View style={containerStyle.checkContainer}>

                          <View style={containerStyle.exButton}>
                          <TouchableOpacity onPress={this._toggleModal}>
                          <Icon
                          raised
                          name='clear'
                          color='#2699FB' />
                          </TouchableOpacity>
                          </View>

                          <TouchableOpacity onPress={this._toggleModal}>
                          <Icon
                          raised
                          name='done'
                          color='#2699FB' />
                          </TouchableOpacity>

                          </View>

                        </View>





                  </View>

                  </ScrollView>

                  </View>

                </View>

              </Modal>

                <View style={stylesOne.planCountBox}>

                    <Text style={stylesOne.planCountText}>
                    {this.props.planCount}
                    </Text>

                    <Text style={stylesOne.bigPlan}>
                    PLANS
                    </Text>

                </View>
            </View>
        )
    }
}


const stylesOne = StyleSheet.create({

    biggoContainer:{
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    descriptionText: {
        color: '#727E83',
        fontSize: 14,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    planCountText: {
        color: '#727E83',
        fontSize: 20,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'

    },
    bigPlan:{
        color: '#727E83',
        fontSize: 10,
        fontFamily: 'circular-std-bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    planCountBox:{
        alignContent: 'center',
        alignSelf: 'center',
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContent: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 20,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center"
    },
    closeButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    header: {
        fontSize: 30,
        color: '#413C77',
        fontWeight: 'bold',
        marginBottom: 20
    },
    actName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2661B2',
    },
    keyContainer: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    votingLegendContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
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
    },
    buttonContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    ////////////////////////Header////////////////////
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    //////////////////////Modal Container//////////////////
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
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
});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkContainer: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30
  }
});

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default ProfileDescription;
