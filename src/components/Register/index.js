import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title,Icon,Input,Right,Left,Button,Item,Label} from 'native-base';
import {View} from 'react-native';
import {connect} from 'react-redux';
import RegistrationForm from './form.js';

class Register extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container style={{backgroundColor:'white'}}>
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
                    <Text style={{color:'#757575',fontSize:40,fontWeight:'bold',margin:10}}>Almost there...</Text>
                    <RegistrationForm handleSubmit={this.handleSubmit}/>
                </Content>
            </Container>
        )
    }
}


export default Register;
