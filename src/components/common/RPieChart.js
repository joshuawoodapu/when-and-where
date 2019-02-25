import React, { Component, Fragment} from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class RPieChart extends Component
{
  constructor( props )
  {
    super(props);

    const sliceColors = ['#F7D055', '#F387B8', '#6A6789', '#A0C1ED', '#EC7248'];

    const inputs = props.placeholderList;

    this.state = { inputs };
  }

  render()
  {
    return (
        this.state.inputs.map(( phObject, index ) => (
          <PieChart
              style={{ marginBottom: 25 }}
              chart_wh={225}
              series={voteNums}
              sliceColor={sliceColors}
          />
        ))
    );
  }
}

const styles = StyleSheet.create(
{

});

export default RPieChart;
