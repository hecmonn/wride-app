import React, { PropTypes } from 'react';
import {prettyName} from '../../../../lib/helpers';
import {List,ListItem,Left,Body,Right,Thumbnail,Text} from 'native-base';
class Person extends React.Component {
    render () {
        const {fname,lname,username,path}=this.props.person;
        const name=prettyName(fname,lname);
        const {navigation}=this.props;
        return(
            <List>
                <ListItem button onPress={()=>navigation.navigate('Profile',{username})} avatar>
                    <Left>
                        <Thumbnail small source={{ uri:path!==null? `http://localhost:5005/${path}`:'http:localhost:5005/dummy.png' }} />
                </Left>
                    <Body>
                        <Text style={{fontWeight:'bold'}}>{username}</Text>
                        <Text note>{name}</Text>
                    </Body>
                    <Right />
                </ListItem>
            </List>
        )
    }
}

export default Person;
