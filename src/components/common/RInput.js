import React from 'react';
import {Input} from 'react-native-elements';
import { View, Text } from 'react-native';

const RInput = ( props ) => {
    return (
      <View>
        <Text>{props.numInputs}</Text>
      </View>
    );
};

export default RInput;
