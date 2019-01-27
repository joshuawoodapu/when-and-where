import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Connect from '../onboardingScreens/Connect';
import Create from '../onboardingScreens/Create';
import Discover from '../onboardingScreens/Discover';

class OnBoardingScreens extends React.Component {
    render() {
        return (
            <Swiper loop={false} dotColor={'#B0CAED'} activeDotColor={'#2661B2'}>
                <Discover />
                <Create />
                <Connect navigation={this.props.navigation}/>
            </Swiper>
        )
    }
}

export default OnBoardingScreens;