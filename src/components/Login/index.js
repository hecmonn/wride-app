import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Button,Icon,Text,Body } from 'native-base';
import LoginForm from './form.js';
class Login extends Component {
    async componentWillMount() {
        await AsyncStorage.getItem('auth')
        .then(r=>{
            if(r!==null) this.props.navigation.navigate('Root');
        })
        .done();
    }
    render() {

        const {navigation}=this.props;
        return (
            <Container style={{backgroundColor:'white'}}>
                <Header style={{backgroundColor:'white'}}/>
                <Content>
                        <Text style={{color:'#757575',fontWeight:'bold',fontSize:100}}>Wride.</Text>
                        <LoginForm navigation={navigation}/>

                </Content>
            </Container>
        );
    }
}

export default Login;
