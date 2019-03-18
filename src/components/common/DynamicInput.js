import React, { Component, Fragment} from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class DynamicInput extends Component
{
  constructor(props){
    super(props);
    const inputs = props.placeholderList;
    this.state = { inputs };
  }

  handleChangeText = (typedText) => {
     this.setState({text:typedText});
   }

   handleIcon(iconStyle, iconName, iconSize, iconColor) {
    switch (iconStyle) {
      case 'Icon':
        return (
          <Icon name={iconName}
            size={iconSize || null}
            color={iconColor || null}
           />
        );
      case 'MCIcon':
        return (
          <MCIcon
            name={iconName}
            size={iconSize || null}
            color={iconColor || null}
          />
        );
      }
  }

  render()
  {
    return (
        this.state.inputs.map(( phObject, index ) => (
          <Input
            key = {index}
            placeholder = {phObject.placeholder}
            inputContainerStyle = {styles[phObject.inputContainerStyle] || styles.defaultInput}
            inputStyle = {styles[phObject.inputStyle] || styles.text}
            returnKeyType = {phObject.returnKeyType || "next"}
            secureTextEntry = {phObject.secureTextEntry || false}
            ref = {ref => this[index] = ref}
            value = {this.state[phObject.stateLabel] || null}
            onSubmitEditing = {phObject.returnKeyType=="done" ? null : () => this[index+1].focus()}
            onChangeText = {phObject.onChange || this.handleChangeText}
            autoCorrect = {phObject.autoCorrect}
            spellCheck = {phObject.spellCheck}
            autoCapitalize = {phObject.autoCapitalize}
            autoComplete = {phObject.autoComplete}
            spellcheck = {phObject.spellcheck || true}
            leftIcon = {phObject.iconName ? this.handleIcon(
                phObject.iconStyle, phObject.iconName, phObject.iconSize, phObject.iconColor) : null }
          />
        ))
    );
  }
}

const styles = StyleSheet.create(
{
  text:
  {
    fontFamily: 'circular-std-book',
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
  loginInput: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#B8BeC1',
    paddingTop: 16,
    paddingBottom: 14,
  },
  tabsInput: {
    height: 33,
    borderWidth: 1,
    borderColor: '#B8BeC1',
    borderRadius: 10,
    paddingVertical: 11,
    backgroundColor: "#fff"
  },
  createNewPlanInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#7FC4FD',
    borderRadius: 12,
    paddingLeft: 20,
    paddingVertical: 11,
  },
  tabsText: {
    fontSize: 14,
    color: "#2661B2",
    paddingLeft: 5,
  },
  loginText: {
    fontSize: 14,
    color: "#2661B2",
    paddingLeft: 10,
  },
  descriptionInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#B8BeC1',
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 11,
  },
});

export default DynamicInput;
