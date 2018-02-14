import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title,Icon,Input,Right,Left,Button,Item,Label,Form} from 'native-base';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fname:'',
            lname:'',
            email:'',
            username:'',
            password:'',
            confirm_password:''
        }
    }
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
                    <Form>
                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Last Name</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Confirm password</Label>
                            <Input />
                        </Item>
                        <Button full transparent style={{borderWidth:1,borderColor:'#a8a8a8'}}>
                            <Text style={{color:'#757575'}}>Register</Text>
                        </Button>
                    </Form>

                </Content>
            </Container>
        )
    }
}

export default Register;
