import React, { Component } from 'react';
import { Text } from 'react-native';

export default class StdText extends Component {
    render() {
        return ( 
            <Text style={[{ fontFamily: 'circular-std'}, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}