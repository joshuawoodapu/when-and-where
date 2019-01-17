import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDCp3X_njrJy-_RJYTzUOvWZQrPYdekBak",
      authDomain: "when-and-where-c8a71.firebaseapp.com",
      databaseURL: "https://when-and-where-c8a71.firebaseio.com",
      projectId: "when-and-where-c8a71",
      storageBucket: "when-and-where-c8a71.appspot.com",
      messagingSenderId: "521022677241"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
