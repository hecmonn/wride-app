import React from 'react';
import {TabNavigator,TabBarBottom} from 'react-navigation';
import {Icon} from 'native-base';
import Home from './Home';
import Profile from './Profile';
import Inspiration from './Inspiration';
import Notifications from './Notifications';
import TabNotifications from './Notifications/Tab';
const RootNavigator=TabNavigator({
    Home:{
        screen: Home
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={12}
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
                    size={12}
                />
            )
        }
    },
    Notifications:{
        screen: Notifications
        ,navigationOptions:({navigation})=>({
            tabBarIcon: ({focused}) => {
                return(
                    <TabNotifications navigation={navigation} focused={focused} />
                )
            }
        })
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
        activeTintColor: 'black',
    },
    iconStyle:{
        height: 20,
        width: 15
    }
});

// Remove the listener when you are done
//didBlurSubscription.remove();


export default RootNavigator;
