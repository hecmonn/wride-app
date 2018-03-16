import React, { PropTypes } from 'react';
import {prettyName} from '../../../../lib/helpers';
import {List,ListItem,Left,Body,Right,Thumbnail,Text} from 'native-base';
class Person extends React.Component {
    render () {
        const {fname,lname,username}=this.props.person;
        const name=prettyName(fname,lname);
        const {navigation}=this.props;
        return(
            <List>
                <ListItem button onPress={()=>navigation.navigate('Profile',{username})} avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg' }} />
                    </Left>
                    <Body>
                        <Text>{name}</Text>
                        <Text note>{username}</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>
            </List>
        )
    }
}

export default Person;
