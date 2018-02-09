import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon} from 'native-base';
import Home from './Home';
import Profile from './Profile';
const RootNavigator=TabNavigator({
    Home:{
        screen: Home
        ,navigationOptions:{
            tabBarLabel: 'Home'
            ,tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />
            )
        }
    },
    Profile:{
        screen: Profile
        ,navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-person':'ios-person-outline'}
                    style={{color: '#464646'}}
                    size={16}
                />
            )
        }
    }
})

export default RootNavigator;
