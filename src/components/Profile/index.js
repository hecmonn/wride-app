import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';
import Who from './Who';
import Navigator from './Navigator';

class Profile extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Who navigation={navigation} />
                    <Navigator />
                </Content>
            </Container>
        )
    }
}

export default Profile;
