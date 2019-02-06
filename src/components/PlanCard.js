import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements'; 

export default class PlanCard extends Component {
    render() {
        return (
            <Card>
                <View style={styles.parentView}>
                    <View style={styles.topRow}>
                        <View style={styles.topLeft}>
                            <Text style={styles.titleText}>
                                {this.props.text}
                            </Text>
                        </View>
                        <View style={styles.topRight}>
                            <Icon 
                                name='add'
                                color='#2661B2'
                                size={24}
                            />
                        </View>
                    </View>
                    <View style={styles.middleRow}>
                        <Icon 
                            name='radio-button-unchecked'
                            color='#B0CAED'
                            size={20}
                        />
                        <Text style={styles.addressText}>
                            Paint & Wine Night at Mantra
                        </Text>
                        <Icon 
                            name='radio-button-unchecked'
                            color='#B0CAED'
                            size={20}
                        />
                        <Text style={styles.addressText}>
                            Sunset @ Echo Park
                        </Text>
                        <Text style={styles.addressText}>
                            2 Additional Activities
                        </Text>

                    </View>
                    <View style={styles.bottomRow}>
                        <View style={styles.bottomLeft}>
                            <Icon 
                                name='schedule'
                                color='#2661B2'
                                size={20}
                            />
                            <Text>
                                4-5 Hours
                            </Text>
                        </View>
                        <View style={styles.bottomRight}>
                            <Text>
                                609
                            </Text>
                            <Icon
                                name='favorite'
                                color='#F387B8'
                                size={16}
                            />
                        </View>
                    </View>
                </View>
            </Card>
        );
    }
}

styles = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        color: '#2661B2',
        fontWeight: 'bold',
        fontSize: 14
    },
    addressText: {
        color: '#2661B2',
        fontSize: 12
    },
    cardContainer: {
        padding: 0,
        flex: 1
    },
    plusIcon: {
        color: '#2661B2', 
    },
    topRow: {
        flexDirection: 'row',
        height: 15,
        flex: 1
    },
    topRight: {
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-end'
    },
    topLeft: {
        flex: 1,
        alignSelf:'flex-end',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },
    middleRow: {
        flexDirection: 'row',
        flex: 1
    },
    bottomRow: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1
    },
    bottomLeft: {
        flex: 1,
        flexDirection: 'row'
    },
    bottomRight: { 

    },


    cardStyle: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        width: (Dimensions.get('window').width * .75),
        height: 1000,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#FFFFFF'
    },
    sectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative' 
    }

});