import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

export default SwitchToggle = (props) => {
   return (
      <View style = {styles.container}>
         <Switch
         onValueChange = {props.toggleSwitch1}
         value = {props.switch1Value}/>
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'flex-start',
      marginTop: 600
   }
   //var styles = StyleSheet.create({
  //listItem: {
  //  flex: 1,
  //  fontSize: 16,
  //  color: 'white',
//  },
//  selectedListItem: {
  //  color: 'green',
//  },
//});
});
