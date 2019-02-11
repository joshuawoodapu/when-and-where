import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
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

    handleSearchChange = (typedText) => {
        this.setState({search:typedText}, () => {
          console.log(typedText);
        });
    }

    handleLocationChange = (typedText) => {
        this.setState({location:typedText}, () => {
          console.log(typedText);
        });
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:"#000"}}>
                <AATabs 
                    navigation={this.props.navigation} 
                    handleSearch={this.handleSearchChange} 
                    handleLocation={this.handleLocationChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        backgroundColor: '#ffffff',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25,
        marginRight: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    },
    locationInput: {
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        marginLeft: 25,
        marginRight: 25,
        borderWidth: 2,
        borderColor: '#B8BeC1',
        borderRadius: 15,
        color: '#B8BeC1',
        paddingHorizontal: 10,
    }


});

export default AddActivityScreen;
