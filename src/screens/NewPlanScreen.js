import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements';

class NewPlanScreen extends Component {

    state = {
        visibleVotingModal: false,
        renderedActivityGroup: null
    };     
    
    /* should take in an activitySlot as a param */
    renderPieChart = (voteNums) => (
        <View style={voteResults.modalContent}>
            <Icon name='clear' color='#2661B2' onPress={ this._toggleVotingModal } />
            <Text style={voteResults.header}> Voting Results </Text>
            <PieChart
                style={voteResults.chart}
                chart_wh={225}
                series={voteNums}
                sliceColor={sliceColors}
            />

            <View style={voteResults.votingLegendContainer}>
                {activityGroup1.map((activity, index) => 
                    <View key={activity.activityName}>
                        <View style={{width: 20, height: 20, borderRadius: 100/2, backgroundColor: sliceColors[index]}} />
                        <Text style={voteResults.actName}>{activity.activityName}</Text>
                    </View>
                )}
            </View>

        </View>
    );

    _toggleVotingModal = () =>
        this.setState({ visibleVotingModal: !this.state.visibleVotingModal });
        
        
    render() {

        // TODO: need to put this somewhere else
        let voteNums = [];
        activityGroup1.map( (activity) => {
            voteNums.push(activity.numVotes);
        });

        return (
            <View>
                <Text>NewPlan!!!!</Text>
                <Text>{"\n\n\n"}</Text>
                
                <TouchableOpacity onPress={this._toggleVotingModal}>
                    <Text>Activity 1</Text>
                </TouchableOpacity>

                <Modal isVisible={this.state.visibleVotingModal} backdropOpacity={0.5}>
                    {this.renderPieChart(voteNums)}
                </Modal>
            </View >
        )
    }
}

let activityGroup1 = [
    { 
      activityName: 'The Broad',
      numVotes: 5 
    }, 
    { 
      activityName: 'LACMA',
      numVotes: 1
    },
    { 
      activityName: 'California Science Center',
      numVotes: 3
    },
    { 
      activityName: 'The Getty',
      numVotes: 8
    }
];

const sliceColors = ['#F7D055','#F387B8','#6A6789', '#A0C1ED', '#EC7248'];

const voteResults = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    chart: {
        marginBottom: 25
    },
    header: {
        fontSize: 30,
        color: '#413C77',
        fontWeight: 'bold',
        marginBottom: 25
    },
    actName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2661B2'
    },
    votingLegendContainer: {
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignItems: 'flex-start' 
    },
    // votingLegendItem: {
    //     width: '50%',
    // }
});

export default NewPlanScreen;