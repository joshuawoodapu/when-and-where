import React, { Component } from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import PlanCard from '../components/PlanCard';

class MyPlansScreen extends Component {
    static navigationOptions = {
        title: 'MY PLANS',
        headerTitleStyle: {
            color: '#2661B2',
            fontSize: 14,
            fontFamily: 'circular-std-bold'
        }        
    };

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.topSectionView}>
                    <Text style={styles.topSectionText}>
                        My Plans
                    </Text>
                </View>
                <View style={styles.bottomSectionView}>
                    <FlatList
                        data={[
                            {key: 'Janet\'s Birthday'},
                            {key: 'Halloween Party'},
                            {key: 'Galentine\'s Day'}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => 
                                <PlanCard text={item.key}/>
                        }
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    topSectionView: {
        height: 80
    },
    topSectionText: {
        fontFamily: 'circular-std-black',
        fontSize: 30,
        color: '#413C77',
        marginLeft: 40,
        marginTop: 20
    },
    bottomSectionView: {
        flex: 1,
        backgroundColor: '#F0F3F7',
    }
});

export default MyPlansScreen;