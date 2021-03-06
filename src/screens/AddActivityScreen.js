import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import AATabs from '../components/AATabs';

class AddActivityScreen extends Component {
    static navigationOptions = {
        title: 'ADD A NEW ACTIVITY',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    state = {
        search: '',
        location: ''
    };

    render() {
      const { navigation } = this.props;
      const addAction = navigation.getParam('addAction');
      const newActivityIndex = navigation.getParam('newActivityIndex');

        return (
            <View flex={1}>
                <AATabs
                  navigation={this.props.navigation}
                  handleLocation={this.handleLocationChange}
                  customActivityData={this.props.user.customActivities}
                  addAction={addAction}
                  newActInd={newActivityIndex}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(AddActivityScreen);
