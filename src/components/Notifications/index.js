import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';


class Notifications extends React.Component {
    render () {
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Notifications</Text>
                </Content>
            </Container>
        )
    }
}

export default Notifications;
