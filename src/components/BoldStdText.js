import React, { Component } from 'react';
import { Text } from 'react-native';

export default class BoldStdText extends Component {
    render() {
        return ( 
            <Text style={[{ fontFamily: 'circular-std-bold'}, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}