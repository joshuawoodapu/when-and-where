import React, { Component, Fragment} from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { Input, Icon} from 'react-native-elements';

class Okay2 extends Component
{
  constructor( props )
  {
    super(props);

    const inputs = props.placeholderList;

    this.state = { inputs };
  }

  handleChangeText = (typedText) => {
     this.setState({text:typedText}, () => {
       console.log(this.state.text);
     });
   }

  render()
  {
    return (
        this.state.inputs.map(( phObject, index ) => (
          <Input key={index}
            placeholder={phObject.placeholder}
            inputContainerStyle={styles[phObject.inputContainerStyle] || styles.defaultInput}
            inputStyle={styles[phObject.inputStyle] || styles.text}
            returnKeyType={phObject.returnKeyType || "next"}
            secureTextEntry={phObject.secureTextEntry || false}
            ref={ref => this[index] = ref}
            value={this.state[phObject.stateLabel] || null}
            onSubmitEditing={phObject.returnKeyType=="done" ? null : () => this[index+1].focus()}
            onChangeText={this.handleChangeText}
            autoCorrect = {phObject.autoCorrect}
            autoCapitalize = {phObject.autoCapitalize}
            autoComplete = {phObject.autoComplete}
            spellcheck = {phObject.spellcheck || true}
            leftIcon = {phObject.iconName ? <Icon
                                              name={phObject.iconName}
                                              size={phObject.iconSize || null}
                                              color={phObject.iconColor || null}
                                              />
                        : null }
          />
        ))
    );
  }
}

const styles = StyleSheet.create(
{
  text:
  {
    fontSize: 14,
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  defaultInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#B8BeC1',
    borderRadius: 15,
    paddingLeft: 17,
    paddingVertical: 11,
  },
  regScreenInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#B8BeC1',
    borderRadius: 15,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  tabsInput: {
    height: 33,
    borderWidth: 1,
    borderColor: '#B8BeC1',
    borderRadius: 10,
    paddingVertical: 11,
    backgroundColor: "#fff"
  },
  tabsText: {
    fontSize: 14,
    color: "#2661B2",
    paddingLeft: 5,
  },
});

export default Okay2;
