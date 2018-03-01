import React, { PropTypes } from 'react';
import {Card,CardItem,Thumbnail,Left,Right,Body,Button,Text} from 'native-base';

class Notification extends React.Component {
    render () {
        const {navigation}=this.props;
        const {username,action,title}=this.props.not;
        return(
            <Card>
                <CardItem button onPress={()=>{console.log('hey not')}}>
                    <Left>
                        <Button transparent onPress={()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail small source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
                        </Button>
                        <Text>{username} has {action}</Text>
                        <Text style={{fontWeight:'bold'}}>{title}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

export default Notification;
