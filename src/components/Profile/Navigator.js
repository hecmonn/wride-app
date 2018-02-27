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
            tabBarIcon: ({focused}) => {
                return(
                    <Container>
                        <Text style={{fontWeight:focused?'bold':'normal'}}>Posts</Text>
                        <Text note>x</Text>
                    </Container>
                )
            }
        }
    },
    Followers:{
        screen: Followers
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Container>
                    <Text style={{fontWeight:focused?'bold':'normal'}}>Followers</Text>
                    <Text note>x</Text>
                </Container>
            )
        }
    },
    Likes:{
        screen: Likes
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <Container>
                    <Text style={{fontWeight:focused?'bold':'normal'}}>Likes</Text>
                    <Text note>x</Text>
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
