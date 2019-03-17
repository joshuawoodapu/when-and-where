import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
export default class ActivityCard extends Component {
    render() {
        return (
            <Card containerStyle={styles.cardStyle}>
                <TouchableOpacity onPress={this.props.onCardPress}>
                    <View style={styles.parentView}>
                        <View style={styles.topRow}>
                            <View style={styles.topLeft}>
                                <Text style={styles.titleText}>
                                    {this.props.title}
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
                                {this.props.address}
                            </Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.bottomLeft}>
                                <Icon
                                    name='star'
                                    color='#FDAF17'
                                    size={14}
                                />
                                <Icon
                                    name='star'
                                    color='#FDAF17'
                                    size={14}
                                />
                                <Icon
                                    name='star'
                                    color='#FDAF17'
                                    size={14}
                                />
                                <Icon
                                    name='star'
                                    color='#FDAF17'
                                    size={14}
                                />
                                <Icon
                                    name='star'
                                    color='#B8BEC1'
                                    size={14}
                                />
                            </View>
                            <View style={styles.bottomRight}>
                                <Icon
                                    name='favorite-border'
                                    color='#F387B8'
                                    size={18}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    }
}
 const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        color: '#2661B2',
        fontFamily: 'circular-std-bold',
        fontSize: 14
    },
    addressText: {
        color: '#2661B2',
        fontSize: 12,
        fontFamily: 'circular-std-book'
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
        position: 'absolute',
        right: 0
    },
    topLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    middleRow: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 6
    },
    bottomRow: {
        marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        alignItems: "stretch",
    },
    bottomLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cardStyle: {
        marginBottom: 5,
        marginTop: 15,
        borderWidth: 0,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: '#fff'
    },
    sectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    notFavorited: {
      borderWidth: 1,
    },
});
