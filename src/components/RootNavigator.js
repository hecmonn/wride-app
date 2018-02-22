import React from 'react';
import {TabNavigator,TabBarBottom} from 'react-navigation';
import {Icon} from 'native-base';
import Home from './Home';
import Profile from './Profile';
import Inspiration from './Inspiration';
import Notifications from './Notifications';
const RootNavigator=TabNavigator({
    Home:{
        screen: Home
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />
            )
        }
    },
    Inspiration:{
        screen: Inspiration
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-search':'ios-search-outline'}
                    style={{color: '#464646'}}
                    size={16}
                />
            )
        }
    },
    Notifications:{
        screen: Notifications
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-notifications':'ios-notifications-outline'}
                    style={{color: '#464646'}}
                    size={16}
                />
            )
        }
    },
    /*Profile:{
        screen: Profile
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-person':'ios-person-outline'}
                    style={{color: '#464646'}}
                    size={16}
                />
            ),
            tabBarOnPress: ({jumpToIndex,scene})=>{
                //console.log('onPress:', route);
                jumpToIndex(scene.index,{username:'hecmonn'});
            }
        }
    }*/
},{
    tabBarComponent:TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions:{
        showLabel: false,
        activeTintColor: 'black'
    }
});



export default RootNavigator;
