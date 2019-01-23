import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Header from './src/components/header';

export default class App extends Component {
  render() {
    return (
      <Header />
    );
  }
}

/*
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is supposed to be a registration screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/