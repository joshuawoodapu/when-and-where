import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class Create extends Component {
  render() {
    return (
      <View flex={1} flexDirection={'column'}>
        <View style={styles.onboardingBG1} />
        <View style={styles.onboardingBG2} />

        <View style={styles.onboardingFG1}>
          <Text style={styles.wordText}>Create</Text>
          <Text style={styles.lineText}>your ideal day!</Text>
        </View>
        <View style={styles.onboardingFG2}>
          <Image
            style={styles.imageStyle}
            source={require('../onboardingArt/2_beagles.png')}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  onboardingBG1: {
    zIndex: 0,
    backgroundColor: '#F0F3F7',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '33%'
  },
  onboardingBG2: {
    zIndex: 0,
    flex: 2,
    position: 'absolute',
    width: '100%',
    height: '66%'
  },
  onboardingFG1: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  onboardingFG2: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: 'transparent',
  },
  imageStyle: {
    width: '95%',
    height: '55%',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
});

export default Create;
