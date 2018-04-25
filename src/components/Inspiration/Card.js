import React, { PropTypes } from 'react'
import {Card,CardItem,Left,Body,Right,Text} from 'native-base';
import {Image} from 'react-native';
import isEmpty from 'is-empty';

class InspirationCard extends React.Component {
    render () {
        const {content,post_path,username,title}=this.props.item.item;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight:'bold'}}>{title}</Text>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    {!isEmpty(post_path) && <Image source={{uri:`http://localhost:5005/${post_path}`}} style={{marginBottom:10,height:250}} resizeMode='cover' />}
                </CardItem>
                <CardItem>
                    <Left />
                    <Right>
                        <Text note>{username}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default InspirationCard;
