import React, { PropTypes } from 'react';
import {Card,CardItem,Thumbnail,Left,Right,Body,Button,Text} from 'native-base';

class Notification extends React.Component {
    render () {
        const {navigation}=this.props;
        const {username,action,title,action_no}=this.props.not;
        let redirect_to=action_no==3?{route:'Profile',param:{username}}:{route:'Post',param:{content:'hey'}};
        return(
            <Card>
                <CardItem button onPress={()=>{navigation.navigate(redirect_to.route,redirect_to.param)}}>
                    <Left>
                        <Button transparent onPress={()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail small source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
                        </Button>
                        <Text>{username} {action}</Text>
                        {action_no!==3 &&<Text style={{fontWeight:'bold'}}>{title}</Text>}
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

export default Notification;
