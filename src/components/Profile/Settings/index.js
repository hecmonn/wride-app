import React, { PropTypes } from 'react'
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right} from 'native-base';

class Settings extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Text>Settings</Text>
                </Content>
            </Container>
        )
    }
}

export default Settings;
