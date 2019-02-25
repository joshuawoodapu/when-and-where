import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

export default class VPActivityCard extends Component {
    state = { yesVote: false, noVote: false};

    onYesPress() {
        if (this.state.yesVote == false && this.state.noVote == false) {
          this.setState({ yesVote: true });
        }
        else if (this.state.yesVote == false && this.state.noVote == true) {
          this.setState({ yesVote: true, noVote: false });
        }
        else if (this.state.yesVote == true) {
          this.setState({ yesVote: false });
        }

        this.renderYes(this.yesVote);
        this.renderNo(this.noVote);
    }

    onNoPress() {
        if (this.state.noVote == false && this.state.yesVote == false) {
          this.setState({ noVote: true });
        }
        else if (this.state.noVote == false && this.state.yesVote == true) {
          this.setState({ noVote: true, yesVote: false });
        }
        else if (this.state.noVote == true) {
          this.setState({ noVote: false });
        }
    }

    renderInfo() {
      if (this.props.address.includes(",")) {
        var index = this.props.address.indexOf(",");
        var streetAddress = this.props.address.substr(0, index + 1);
        var cityStateAddress = this.props.address.substr(index + 2);
      }

      return(
        <View flex={3} width="100%">
          <View style={styles.nameRow}>
              <Text style={styles.titleText}>
                {this.props.title}
              </Text>
          </View>

          <View style={styles.addressRow}>
            <Text style={styles.addressText}>
              {streetAddress}
            </Text>
            <Text style={styles.addressText}>
              {cityStateAddress}
            </Text>
          </View>
        </View>
      );
    }

    renderYes(yesVote) {
      if (yesVote) {

        return(
              <Icon
                  key={this.props.keyExtractor + "_yes"}
                  name='check'
                  color='green'
                  size={22}
              />
        );
      }
      else {
        return(
              <Icon
                  key={this.props.keyExtractor + "_yes"}
                  name='check'
                  color='#2699FB'
                  size={22}
              />
        );
      }
    }

    renderNo(noVote) {
      if (noVote) {
        return(
              <Icon
                  key={this.props.keyExtractor + "_no"}
                  name='close'
                  color='red'
                  size={22}
              />
        );
      }
      else {
        return(
              <Icon
                  key={this.props.keyExtractor + "_no"}
                  name='close'
                  color='#2699FB'
                  size={22}
              />
        );
      }
    }

    render() {
        return (
            <View flex={1} flexDirection="row">
                <View style={styles.timeView}>
                    <Text style={styles.timeText}>{this.props.startTime}</Text>
                </View>
                <View style={styles.cardSectionStyle}>
                    <Card containerStyle={styles.cardStyle}>
                      <View flex={1} flexDirection="row">
                        <View flex={1}>
                          <TouchableOpacity onPress={this.props.onCardPress.bind(this)}>
                              <View style={styles.parentView}>
                                  {this.renderInfo()}
                              </View>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.voteContainer}>
                          <View flex={1}>
                              <TouchableOpacity onPress={this.onYesPress.bind(this)}>
                                  <View style={styles.yesView}>
                                      {this.renderYes(this.props.yesVote)}
                                  </View>
                              </TouchableOpacity>
                          </View>
                          <View flex={1}>
                              <TouchableOpacity onPress={this.onNoPress.bind(this)}>
                                  <View style={styles.noView}>
                                      {this.renderNo(this.props.noVote)}
                                  </View>
                              </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Card>
                </View>
            </View>
        );
    }
}

 const styles = StyleSheet.create({
   timeView: {
     flex: 1,
     justifyContent: 'center',
     paddingHorizontal: 15
   },
   timeText: {
     fontSize: 11,
     color: "#0E91D6",
     fontFamily: 'circular-std-bold'
   },
    yesView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    noView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    voteContainer: {
      width: 22,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    cardSectionStyle: {
      flex: 3,
      paddingBottom: 15,
      justifyContent: 'space-between',
    },
    titleText: {
        color: '#2661B2',
        fontWeight: 'bold',
        fontSize: 14
    },
    addressText: {
        color: '#2661B2',
        fontSize: 10,
        paddingVertical: 1
    },
    nameRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
    },
    addressRow: {
        flex: 1,
    },
    cardStyle: {
        borderWidth: 0,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: '#F0F3F7'
    },

});
