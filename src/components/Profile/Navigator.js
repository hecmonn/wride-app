import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon,Text} from 'native-base';
import Who from './Who';
import About from './About';
import NewsFeed from '../NewsFeed';
const ProfileNavigator=TabNavigator({
    /*NewsFeed:{
        screen: NewsFeed
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />
            )
        }
    },*/
    NewsFeed:{
        screen: NewsFeed
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                /*<Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />*/
                <Text>Home</Text>
            )
        }
    },
    About:{
        screen: About
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                /*<Icon
                    name={focused?'ios-person':'ios-person-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />*/
                <Text>About</Text>
            )
        }
    },
},
{
    tabBarPosition:'top',
    tabBarOptions:{
        showLabel:false,
        style:{
            height:10
        }
    }
})

export default ProfileNavigator;
