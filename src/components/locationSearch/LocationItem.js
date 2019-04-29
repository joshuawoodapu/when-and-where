import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

class LocationItem extends PureComponent {
    _handlePress = async () => {
        const res = await this.props.fetchDetails(this.props.place_id)
    
        this.props.onPress(res.place_id); // this hides the other recommendations
    }
    
    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={this._handlePress}> 
                <Text style={styles.text}> {this.props.description} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#B8BeC1',
        justifyContent: 'center'
    },
    text: {
        color: '#2661B2',
        fontSize: 12,
        fontFamily: 'circular-std-book'
    }

})

export default LocationItem;