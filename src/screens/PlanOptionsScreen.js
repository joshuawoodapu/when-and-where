import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import FlipToggle from 'react-native-flip-toggle-button';
import Modal from "react-native-modal";
import Dropdown from '../components/common/Dropdown';

export default class PlanOptionsScreen extends Component {

    static navigationOptions = {
        title: 'PLAN OPTIONS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isSwitch1On: false,
            visibleNotificationModal: false,
            visibleDatesModal: false,
        }
    };

    onCollabPress() {
        this.props.navigation.navigate('CollabInvite');
    }

    toggleNotificationModal = () => this.setState({ visibleNotificationModal: !this.state.visibleNotificationModal });
    toggleDatesModal = () => this.setState({ visibleDatesModal: !this.state.visibleDatesModal });

    render() {

        return (
            <View>

                <View style={styles.privacyOptionContainer}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='https'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.privacyOptionText}>Privacy</Text>

                        <FlipToggle
                            value={this.state.isSwitch1On}
                            buttonWidth={50}
                            buttonHeight={25}
                            buttonRadius={50}
                            buttonOffColor={'#727e83'}
                            sliderOffColor={'#fff'}
                            buttonOnColor={'#Ed7248'}
                            sliderOnColor={'#fff'}
                            onToggle={(value) => {
                                this.setState({ isSwitch1On: value });
                            }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={this.toggleNotificationModal}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='notifications'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Notifications</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onCollabPress.bind(this)} style={styles.buttonContainer}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='supervisor-account'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Manage Collaborators</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={this.toggleDatesModal}>
                    <View style={styles.organizeView}>
                        <Icon
                            name='date-range'
                            size={20}
                            color='#605985'
                        />
                        <Text style={styles.buttonText}>Date(s) of Trip</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.deletePlanView}>
                    <TouchableOpacity style={styles.deletePlanContainer}>
                        <Text style={styles.deletePlanText}>DELETE PLAN</Text>
                    </TouchableOpacity>
                </View>

                <Modal isVisible={this.state.visibleNotificationModal} backdropOpacity={0.5}>
                    <View style={modalstyles.modalContainer}>
                        <Text style={modalstyles.headerTextStyle}>Notifications</Text>

                        <View style={modalstyles.dropDownStyle}>
                        <Dropdown choices={[
                            {label: 'Friends', value: 'friends'},
                            {label: 'Just me', value: 'just me'},
                            {label: 'Turned off', value: 'turned off'},
                        ]}/>
                        </View>

                        <TouchableOpacity style={modalstyles.buttonContainer} onPress={this.toggleNotificationModal}>
                            <Text style={modalstyles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={this.state.visibleDatesModal} backdropOpacity={0.5}>
                    <View style={modalstyles.modalContainer}>
                        <Text style={modalstyles.headerTextStyle}>Date(s) of Trip</Text>

                        <TouchableOpacity style={modalstyles.buttonContainer} onPress={this.toggleDatesModal}>
                            <Text style={modalstyles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

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
    ////////////////Privacy Component///////////////////
    privacyOptionContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f3f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        marginBottom: 25,
        marginTop: 25
    },
    privacyOptionText: {
        fontSize: 15,
        color: '#2661B2',
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight: 130
    },
    ////////////////Notifications, Manage Collaborators, Dates of Trip Component///////////////
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f3f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        marginBottom: 25
    },
    buttonText: {
        textAlign: 'center',
        color: '#2661B2',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30
    },
    //////////////Delete Plan Component/////////////
    deletePlanContainer: {
        backgroundColor: '#E23737',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletePlanText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    deletePlanView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 20
    },
    //////////////////Justifying options left & aligning/////////////////////
    organizeView: {
        flexDirection: 'row',
        marginLeft: 40
    },
});

/////////////////////////////////Modal Styling////////////////////////////////////
const modalstyles = StyleSheet.create({
    /////////////////////Button/////////////////////
    buttonContainer: {
        backgroundColor: '#Ed7248',
        borderRadius: 30,
        width: 270,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
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
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ////////////////////Drop Down/////////////////////////
    dropDownStyle: {
        width: 250,
    }
});