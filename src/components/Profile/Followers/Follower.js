import React, { PropTypes } from 'react'
import {ListItem,Left,Right,Body,Button,Text,Thumbnail} from 'native-base';
import {prettyName} from '../../../../lib/helpers';
class Follower extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        const {fname,lname,username}=this.props.person;
        const name=prettyName(fname,lname);
        return(
            <ListItem avatar>
                <Left>
                    <Thumbnail small source={{ uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg' }} />
                </Left>
                <Body>
                    <Text>{name}</Text>
                    <Text note>{username}</Text>
                </Body>
                <Right>
                    <Button small style={{backgroundColor:'white',borderColor: '#181818',borderWidth:1,borderRadius:5}} onPress={()=>{console.log('follow')}}>
                        <Text style={{color:'black'}}>Follow</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}

export default Follower;
