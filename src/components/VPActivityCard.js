import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PieChart from 'react-native-pie-chart';
import Modal from "react-native-modal";


export default class VPActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleVotingModal: false,
      renderedActivityGroup: null,
      yesVote: false,
      noVote: false
    }
  }

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

    return (
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

      return (
        <Icon
          key={this.props.keyExtractor + "_yes"}
          name='check'
          color='green'
          size={18}
        />
      );
    }
    else {
      return (
        <Icon
          key={this.props.keyExtractor + "_yes"}
          name='check'
          color='#2699FB'
          size={18}
        />
      );
    }
  }

  renderNo(noVote) {
    if (noVote) {
      return (
        <Icon
          key={this.props.keyExtractor + "_no"}
          name='close'
          color='red'
          size={18}
        />
      );
    }
    else {
      return (
        <Icon
          key={this.props.keyExtractor + "_no"}
          name='close'
          color='#2699FB'
          size={18}
        />
      );
    }
  }

  renderTopLine(ind) {
    if (ind != 0) {
      return (
        <View flex={1}>
          <View flex={3}
            style={{
              borderLeftWidth: 1,
              borderLeftColor: '#B0CAED',
            }}
          />
          <View flex={1} />
        </View>
      );
    }
    else {
      return (<View flex={4} />);
    }
  }

  renderBottomLine(ind) {
    if (ind != this.props.totalSlots) {
      return (
        <View flex={1}>
          <View flex={1} />
          <View flex={3}
            style={{
              borderLeftWidth: 1,
              borderLeftColor: '#B0CAED',
            }}
          />
        </View>
      );
    }
    else {
      return (<View flex={4} />);
    }
  }

  toggleVotingModal = () =>
    this.setState({ visibleVotingModal: !this.state.visibleVotingModal });

  /* should take in an activitySlot as a param */
  renderPieChart = (voteNums) => (
    <View style={votingModalStyles.modalContent}>

      <View style={votingModalStyles.closeButton}>
        <Icon
          name='clear'
          color='#2661B2'
          size={30}
          onPress={this.toggleVotingModal}
        />
      </View>

      <View style={votingModalStyles.centered}>
        <Text style={votingModalStyles.header}> Voting Results </Text>
        <PieChart
          style={{ marginBottom: 25 }}
          chart_wh={225}
          series={voteNums}
          sliceColor={sliceColors}
        />
      </View>

      <View style={votingModalStyles.votingLegendContainer}>
        {activityGroup1.map((activity, index) =>
          <View style={votingModalStyles.keyContainer} key={activity.activityName}>
            <View style={{ width: 20, height: 20, borderRadius: 100 / 2, backgroundColor: sliceColors[index], marginRight: 7 }} />
            <Text style={votingModalStyles.actName}>{activity.activityName}</Text>
          </View>
        )}
      </View>
    </View>
  );


  render() {

    let voteNums = [];
    activityGroup1.map((activity) => {
      voteNums.push(activity.numVotes);
    });

    return (
      <View flex={1} flexDirection="row">
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{this.props.startTime}</Text>
        </View>

        <View flex={1} alignItems='center' justifyContent='center'>
          <View flex={4}>
            {this.renderTopLine(this.props.index)}
          </View>
          <TouchableOpacity onPress={this.toggleVotingModal}>
            <PieChart
              chart_wh={31}
              series={voteNums}
              sliceColor={sliceColors}
            />
          </TouchableOpacity>
          <View flex={4}>
            {this.renderBottomLine(this.props.index)}
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <Card containerStyle={styles.cardStyle}>
            <View flex={5} flexDirection="row">
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

        <Modal isVisible={this.state.visibleVotingModal} backdropOpacity={0.5}>
          {this.renderPieChart(voteNums)}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeView: {
    width: 62,
    justifyContent: 'center',
    paddingLeft: 15,
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

const votingModalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 30,
    color: '#413C77',
    fontWeight: 'bold',
    marginBottom: 20
  },
  actName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2661B2',
  },
  keyContainer: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  votingLegendContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

const sliceColors = ['#F7D055', '#F387B8', '#6A6789', '#A0C1ED', '#EC7248'];

let activityGroup1 = [
  {
    activityName: 'The Broad',
    numVotes: 5
  },
  {
    activityName: 'LACMA',
    numVotes: 3
  },
  {
    activityName: 'California Science Center',
    numVotes: 4
  },
  {
    activityName: 'The Getty',
    numVotes: 7
  },
  {
    activityName: 'MOCA',
    numVotes: 1
  }
];