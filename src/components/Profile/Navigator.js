import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon,Text,Container} from 'native-base';
import Who from './Who';
import About from './About';
import NewsFeed from '../NewsFeed';
import Followers from './Followers';
import Likes from './Likes';
import TabFollowers from './Followers/Tab';
import TabLikes from './Likes/Tab';
import TabPosts from './Tab';

const ProfileNavigator=TabNavigator({
    NewsFeed:{
        screen: NewsFeed
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <TabPosts focused={focused} />
            )
        }
    },
    Followers:{
        screen: Followers
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <TabFollowers focused={focused} />
            )
        }
    },
    Likes:{
        screen: Likes
        ,navigationOptions:{
            tabBarIcon: ({focused}) => (
                <TabLikes focused={focused} />
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
