import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import CardStack, { Card } from 'react-native-card-stack-swiper';

export default class RNSwiperTest extends Component {
    render() {
      return (
        <View flex={1}>
          <CardStack
            style={styles.content}
            loop={true}
            ref={swiper => {
              this.swiper = swiper
            }}
            verticalThreshold={8}
            horizontalThreshold={8}
          >
            <Card style={styles.card}><Text style={styles.label}>First Choice</Text></Card>
            <Card style={styles.card}><Text style={styles.label}>Second Choice</Text></Card>
            <Card style={styles.card}><Text style={styles.label}>Third Choice</Text></Card>
            <Card style={styles.card}><Text style={styles.label}>Fourth Choice</Text></Card>
            <Card style={styles.card}><Text style={styles.label}>Fifth Choice</Text></Card>

          </CardStack>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: '#F0F3F7'
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderWidth:4,
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  }
});
