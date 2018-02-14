import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Button,Icon,Text,Body } from 'native-base';

class Login extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <Container style={{backgroundColor:'white'}}>
                <Header style={{backgroundColor:'white'}}/>
                <Content>
                    <Text style={{color:'#757575',fontWeight:'bold',fontSize:100}}>Wride.</Text>
                    <Form style={{marginBottom:10}}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button full transparent style={{borderWidth:1,borderColor:'#a8a8a8'}}>
                        <Text style={{color:'#757575'}}>Login</Text>
                    </Button>
                    <Button full style={{marginBottom:10}}>
                        <Icon name='logo-facebook' />
                        <Text style={{color:'white'}}>Continue with facebook</Text>
                    </Button>
                    <Body>
                        <Text
                            onPress={()=>{navigation.navigate('Register')}}
                            style={{color:'#757575',fontSize:16}}
                        >
                            Do not have an account?
                        </Text>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default Login;
