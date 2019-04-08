import React, { Component } from 'react';
import { Alert, Text, TextInput, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = { userSelected: undefined, items: props.choices, userFunction: undefined};
    }

    handleChangeDrop = (value) => {
        this.setState({userSelected: value});
    }

    render() {
        return (
            <View style={styles.container}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Type',
                        value: null,
                    }}
                    items={this.state.items}
                    onValueChange={props.onChange || this.handleChangeDrop}

                    style={{ ...pickerSelectStyles }}
                    onValueChange={(value) => {
                        this.setState({
                            userSelected: value,
                        });
                    }}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        fontSize: 14,
        paddingTop: 13,
        paddingLeft: 17,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: 'black',
    },
    inputAndroid: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default Dropdown;
