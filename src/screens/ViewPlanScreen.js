import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import VPActivityCard from '../components/VPActivityCard';
import SwitchToggle from "../components/common/Switch.js";
import RHeader from "../components/common/RHeader.js";
import { Icon } from 'react-native-elements'

export default class ViewPlanScreen extends Component {
  static navigationOptions = ({navigation}) => ({
        headerTitle: 'VIEW PLAN',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold',
        },
        headerRight: (
          <Icon
            name="more-vert"
            size={30}
            color="#B8BEC1"
            onPress={()=>{ navigation.navigate('PlanOptions'); }}
          />
        )
    });

    onAddPress() {
        this.props.navigation.navigate('AddActivity');
    }

    onPressViewComments() {
        this.props.navigation.navigate('CommentsView');
    }

    onPiePress() {
        this.props.navigation.navigate('VotingView')
    }

    onSharePress() {
        /* Right now, leads to dead-end sharing modal lol */
        this.props.navigation.navigate('PlanShare')
    }

    onRActivityCardPress() {
        this.props.navigation.navigate('Activity');
    };

    iterate(aList) {
      var arrayLength = aList.length;

      for (var i = 0; i < arrayLength; i++) {
        return (
          <View flex={1}>
            <FlatList
              data={aList[i]}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) =>
                <VPActivityCard
                  key={item.id}
                  onCardPress={this.onRActivityCardPress.bind(this)}
                  title={item.title}
                  text={item.title}
                  address={item.address}
                  yesVote={item.yVote}
                  noVote={item.nVote}
                  startTime={item.startTime}
                  index={index}
                  totalSlots={arrayLength-1}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      }
    };


    render() {
      var activities = [[{title: 'Molino Metro', address: '1016 N El Molino Ave, Pasadena, CA 91104', yVote: true},
          {title: 'Azusa Pacific University', address: '701 E. Foothill Blvd, Azusa, CA 91702'},
          {title: 'Popeyes Chicken', address: '994 E Alosta Ave, Azusa, CA 91702', nVote: true},
          {title: 'Joseph\'s House', address: '2310 N Cherry St, Pasadena, CA 91820', yVote: true},
        ],
        [
          {title: 'Halloween Horror Nights', address: '100 Universal City Plaza, Universal City, CA 91608'},
          {title: 'Cold Stone Creamery', address: '3730 S Figueroa St, Los Angeles, CA 90007', nVote: true},
        ]];

        return (
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <View flexDirection="row" padding={15} alignItems="center">
                <RHeader>Halloween Night</RHeader>
                <Icon
                  name="share"
                  size={30}
                  color="#B8BEC1"
                  onPress={this.onSharePress.bind(this)}
                />
              </View>

              <View flex={1} paddingRight={20}>
                  <View flex={1}>
                    {this.iterate(activities)}
                  </View>

                  <View flex={1}>
                    <TouchableOpacity onPress={this.onPressViewComments.bind(this)}>
                      <View paddingLeft={145} flexDirection='row' alignItems='center'>
                        <Icon
                          name='chat-bubble'
                          color='#B0CAED'
                          size={16}
                        />
                        <View paddingLeft={6}>
                          <Text style={styles.viewCommentsText}>View Comments…</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View flex={1} paddingTop={38}>
                    <TouchableOpacity onPress={this.onAddPress.bind(this)}>
                      <View paddingLeft={80} flexDirection='row' alignItems='center'>
                        <Icon
                          name='add-circle'
                          color='#0E91D6'
                          size={31}
                        />
                        <View paddingLeft={35}>
                          <Text style={styles.addActivityText}>Add a New Activity</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 25,
    },
    headerTextStyle: {
        fontSize: 30,
        color: '#605985',
        fontWeight: 'bold',
    },
    addActivityText: {
      fontSize: 12,
      color: '#2661B2',
      fontFamily: 'circular-std-book'
    },
    viewCommentsText: {
      fontSize: 10,
      color: '#B0CAED',
      fontFamily: 'circular-std-book'
    },
});
