import React, { PropTypes } from 'react'
import {Card,CardItem,Left,Body,Right,Text} from 'native-base';
import {Image} from 'react-native';
class InspirationCard extends React.Component {
    render () {
        const {content}=this.props.item.item;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight:'bold'}}>{content}</Text>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: 'http://localhost:5005/dummy.png'}} style={{height: 150, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left />
                    <Right>
                        <Text note>hecmonn</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default InspirationCard;
