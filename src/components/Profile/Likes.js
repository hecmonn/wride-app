import React, { PropTypes } from 'react'
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right} from 'native-base';

class Likes extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Content>
                    <Text>Likes</Text>
                </Content>
            </Container>
        )
    }
}

export default Likes;
