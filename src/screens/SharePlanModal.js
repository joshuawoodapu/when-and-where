import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default class SharePlanModal extends Component {
    render () {
        return (
          <View>
            <Modal isVisible={true}>
              <View style={styles.modalContainer}>
                    <Text style={styles.headerTextStyle}>Share Plan</Text>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Manage Collaborators</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Export Plan</Text>
                    </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    /////////////////////Button/////////////////////
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
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
