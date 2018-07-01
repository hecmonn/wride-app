import React, { PropTypes } from 'react';
import {Card,CardItem,Thumbnail,Left,Right,Body,Button,Text} from 'native-base';
import {elapsedTime} from '../../../lib/helpers';

class Notification extends React.Component {
    render () {
        const {navigation}=this.props;
        const {username,action,title,action_no,created_date,path}=this.props.not;
        const elapsed=elapsedTime(created_date);
        let redirect_to=action_no==3?{route:'Profile',param:{username}}:{route:'Post',param:{content:'hey'}};
        return(
            <Card>
                <CardItem button onPress={()=>{navigation.navigate(redirect_to.route,redirect_to.param)}}>
                    <Left>
                        <Button transparent onPress={()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail small source={{uri:path!==null? `http://localhost:5005/${path}`:'http:localhost:5005/dummy.png'}} />
                        </Button>
                        <Text>{username} {action} {action_no!==3 &&<Text style={{fontWeight:'bold'}}>{title}</Text>}</Text>


                    </Left>
                    <Right>
                        <Text note>{elapsed}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default Notification;
