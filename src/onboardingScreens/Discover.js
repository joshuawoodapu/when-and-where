import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class Discover extends Component {
  render() {
    return (
      <View style={styles.onboardingScreen}>
        <View style={styles.textView}>
          <Text style={styles.wordText}>Discover</Text>
          <Text style={styles.lineText}>new places with friends!</Text>
        </View>
        <Image
          style={styles.imageStyle}
          source={require('../onboardingArt/BriSample.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  onboardingScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0F3F7',
    paddingTop: 70,
    paddingBottom: 70,
  },
  imageStyle: {
    height: null,
    flex: 1,
    width: null,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  wordText: {
    color: '#ED7248',
    fontSize: 67,
    fontWeight: 'bold',
  },
  lineText: {
    color: '#ED7248',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Discover;
