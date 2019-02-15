import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

class Setting extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.mainContainer}> 
            {/* header */}

                <View style={styles.leftContainer}>
                    <View style={styles.iconHolder}>
                        <Icon name={this.props.iconName} size={30} color="#2661B2" />
                    </View>
                    <View style={styles.placeHolder2}>
                        <Text style={styles.settingNameText}>
                            { this.props.settingName }
                        </Text>
                    </View>
                </View>

                <View style={styles.rightContainer}>
                    <Text style={styles.settingSelectionText}>
                            {this.props.currentSetting}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#F0F3F7',
        marginTop: '1%'
    },
    iconHolder: {
       // flex: 1,
       // backgroundColor: '#55fc55',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: '5%'
    },
    placeHolder2: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    settingNameText:{
        color: '#2661B2',
        fontSize: 15,
        fontWeight: 'bold'
    },
    settingSelectionText: {
        color: '#727E83',
        fontSize: 14
    },
    leftContainer: {
        paddingLeft: '5%',
        flex: 1.5,
        flexDirection: 'row',
        alignContent: 'center'
    },
    rightContainer: {
        paddingRight: '5%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

});

export default Setting;