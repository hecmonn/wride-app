import React, { PropTypes } from 'react'
import {ListItem,Left,Right,Body,Button,Text,Thumbnail} from 'native-base';
import {prettyName} from '../../../../lib/helpers';
import FollowerBtn from './FollowerBtn';
class Follower extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        const {fname,lname,username,following,path,own_profile}=this.props.person;
        const name=prettyName(fname,lname);
        return(
            <ListItem avatar>
                <Left>
                    <Thumbnail small source={{ uri: path!==null?`http://localhost:5005/${path}`:'http://localhost:5005/dummy.png' }} />
                </Left>
                <Body>
                    <Text>{name}</Text>
                    <Text note>{username}</Text>
                </Body>
                <Right>
                    <FollowerBtn fromList={true} ownProfile={own_profile} following={following} users={{username:this.props.users.username,username_param:username}} getUnFollow={this.props.getUnFollow}/>
                </Right>
            </ListItem>
        )
    }
}

export default Follower;
