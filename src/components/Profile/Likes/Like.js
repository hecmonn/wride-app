import React, { PropTypes } from 'react';
import {Card,CardItem,Title,Body,Text,Right,Left} from 'native-base';

class Like extends React.Component {
    render () {
        const {content,title,username,id}=this.props.info;
        const {navigation}=this.props;
        return(
            <Card>
                <CardItem header>
                    <Title>{title} </Title>
                </CardItem>
                <CardItem button onPress={()=>{console.log('clicked post:',id)}}>
                    <Body>
                        <Text>
                            {content}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer button onPress={()=>{console.log('clicked post:',id)}}>
                    <Left />
                    <Body />
                    <Right>
                        <Text>{username}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default Like;
