import React, { PropTypes } from 'react'
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right} from 'native-base';

class Followers extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Content>
                    <Text>Followers</Text>
                </Content>
            </Container>
        )
    }
}

export default Followers;
