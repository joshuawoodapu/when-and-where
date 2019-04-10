import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as actions from '../redux/actions';

class AppLoading extends Component {


    state = {fontLoaded: false}

    async componentDidMount() {
        await Font.loadAsync({
            'circular-std-black': require('../../assets/fonts/CircularStd-Black.otf'),
            'circular-std-black-italic': require('../../assets/fonts/CircularStd-BlackItalic.otf'),
            'circular-std-book': require('../../assets/fonts/CircularStd-Book.otf'),
            'circular-std-book-italic': require('../../assets/fonts/CircularStd-BookItalic.otf'),
            'circular-std-bold': require('../../assets/fonts/CircularStd-Bold.otf'),
            'circular-std-bold-italic': require('../../assets/fonts/CircularStd-BoldItalic.otf'),
            'circular-std-medium': require('../../assets/fonts/CircularStd-Medium.otf'),
            'circular-std-medium-italic': require('../../assets/fonts/CircularStd-MediumItalic.otf'),

          });
        this.setState({ fontLoaded:true })

        // Change to false once you have left development!
        const development = true;


        if (development)
        {
            await firebase.auth().signInWithEmailAndPassword("plantest@test.com", "plantest")
                .catch((error) => {
                    this.setState({ error: error, loading: false });
            });
            let user = await firebase.auth().currentUser;
            await this.props.userLoad(user);
            await this.props.plansLoad(user);
            await this.props.customActivitiesLoad(user);
            this.props.navigation.navigate('App');

        }

        else {
            let user = await firebase.auth().currentUser;
            const logged = (user !== null);

            const onBoarded = await AsyncStorage.getItem('onBoarded');

            if (logged)
                this.props.userLoad(user);

            if (logged && onBoarded)
                this.props.navigation.navigate('App');
            else if (onBoarded)
                this.props.navigation.navigate('Login');
            else
                this.props.navigation.navigate(logged ? 'App' : 'Auth');

        }

      }
    render() {
        return (
            <View>
                <Image
                    source={require('../../assets/splash.png')}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user, plan: state.plan };
}

export default connect(mapStateToProps, actions)(AppLoading);
