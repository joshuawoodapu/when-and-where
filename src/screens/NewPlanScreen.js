import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements';


class NewPlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleVotingModal: true,
            renderedActivityGroup: null
        }
    }

    _toggleVotingModal = () =>
        this.setState({ visibleVotingModal: !this.state.visibleVotingModal });

    /* should take in an activitySlot as a param */
    renderPieChart = (voteNums) => (
        <View style={styles.container}>
            <View style={styles.modalContent}>

                <View style={styles.closeButton}>
                    <Icon
                        name='clear'
                        color='#2661B2'
                        size={30}
                        onPress={this._toggleVotingModal}
                    />
                </View>

                <View style={styles.centered}>
                    <Text style={styles.header}> Voting Results </Text>
                    <PieChart
                        style={{ marginBottom: 25 }}
                        chart_wh={225}
                        series={voteNums}
                        sliceColor={sliceColors}
                    />
                </View>

                <View style={styles.votingLegendContainer}>
                    {activityGroup1.map((activity, index) =>
                        <View style={styles.keyContainer} key={activity.activityName}>
                            <View style={{ width: 20, height: 20, borderRadius: 100 / 2, backgroundColor: sliceColors[index], marginRight: 7 }} />
                            <Text style={styles.actName}>{activity.activityName}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    render() {
        // TODO: need to put this somewhere else
        let voteNums = [];
        activityGroup1.map((activity) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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

const sliceColors = ['#F7D055', '#F387B8', '#6A6789', '#A0C1ED', '#EC7248'];


export default NewPlanScreen;