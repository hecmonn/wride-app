import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';


class Profile extends React.Component {
    render () {
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Profile</Text>
                </Content>
            </Container>
        )
    }
}

export default Profile;
