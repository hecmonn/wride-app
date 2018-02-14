import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title,Icon,Input,Right,Left,Button} from 'native-base';

class Register extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}} noShadow>
                    <Left>
                        <Button transparent onPress={()=>{navigation.goBack()}}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Registration</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>Inspiration</Text>
                </Content>
            </Container>
        )
    }
}

export default Register;
