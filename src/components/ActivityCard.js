import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

export default class ActivityCard extends Component {
    render() {
        return (
            <Card wrapperStyle={styles.parentView}>
                <TouchableOpacity onPress={this.props.onCardPress}>
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
                            <Text style={styles.addressText}>
                                425 E. Foothill Blvd, Azusa, CA
                            </Text>

                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.bottomLeft}>
                                <Icon 
                                    name='star'
                                    color='#FDAF17'
                                    size={12}
                                />
                                <Icon 
                                    name='star'
                                    color='#FDAF17'
                                    size={12}
                                />
                                <Icon 
                                    name='star'
                                    color='#FDAF17'
                                    size={12}
                                />
                                <Icon 
                                    name='star'
                                    color='#FDAF17'
                                    size={12}
                                />
                                <Icon 
                                    name='star'
                                    color='#B8BEC1'
                                    size={12}
                                />
                            </View>
                            <View style={styles.bottomRight}>
                                <Icon
                                    name='favorite'
                                    color='#F387B8'
                                    size={16}
                                />
                            </View>
                        </View>
                </TouchableOpacity>
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
        backgroundColor: '#FFFFFF',
        flex: 1
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