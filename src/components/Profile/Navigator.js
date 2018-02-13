import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon,Text,Container} from 'native-base';
import Who from './Who';
import About from './About';
import NewsFeed from '../NewsFeed';
import Followers from './Followers';
import Likes from './Likes';

const ProfileNavigator=TabNavigator({
    NewsFeed:{
        screen: NewsFeed
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                /*<Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />*/
                <Container>
                    <Text style={{fontWeight:focused?'bold':'normal'}}>Posts</Text>
                    <Text note>100</Text>
                </Container>
            )
        }
    },
    Followers:{
        screen: Followers
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                /*<Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />*/
                <Container>
                    <Text style={{fontWeight:focused?'bold':'normal'}}>Followers</Text>
                    <Text note>543</Text>
                </Container>
            )
        }
    },
    Likes:{
        screen: Likes
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                /*<Icon
                    name={focused?'ios-home':'ios-home-outline'}
                    style={{color:'#464646'}}
                    size={16}
                />*/
                <Container>
                    <Text style={{fontWeight:focused?'bold':'normal'}}>Likes</Text>
                    <Text note>32</Text>
                </Container>
            )
        }
    },
    /*About:{
        screen: About
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Text style={{fontWeight:focused?'bold':'normal'}}>About</Text>
            )
        }
    },*/
},
{
    tabBarPosition:'top',
    tabBarOptions:{
        showLabel:false,
        style:{
            height:10,
            backgroundColor:'white'
        }
    }
});

export default ProfileNavigator;
