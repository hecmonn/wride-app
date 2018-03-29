import React, { Component } from 'react';
import {AsyncStorage,View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Button,Icon,Text,Body,List,ListItem } from 'native-base';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import {login,validateAuth} from '../../actions/auth';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:null,
            password:null,
            isLoading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async componentWillMount() {
        await AsyncStorage.getItem('auth')
        .then(r=>{
            if(r!==null) this.props.navigation.navigate('Root');
        })
        .done();
    }

    handleSubmit=async ()=>{
        const {username,password}=this.state;
        this.setState({isLoading:true});
        this.props.login({identifier:username,password})
        .then(
            async r=>{
                this.setState({isLoading:false})
                if(r.data.isLogged){
                    const decodedToken=jwtDecode(r.data.token);
                    await AsyncStorage.setItem('auth',r.data.token)
                    .then(this.props.validateAuth(decodedToken))
                    .then(this.props.navigation.navigate('Home',{isLogged:true}))
                    .done();
                }
                else{
                    this.setState({error:r.data.errors.form});
                }
            }
        );
    }
    render() {
        const {username,password,isLoading}=this.state
        const {navigation}=this.props;
        return (
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.4)',justifyContent:'center',alignItems:'center',margin:15}}>
                    <Text style={{color:'#eeeeee',fontWeight:'bold',fontSize:100}}>Wride.</Text>
                    <Form>
                        <List>
                            <ListItem>
                                <Item floatingLabel>
                                    <Label style={{color:'#eeeeee'}}>Username</Label>
                                    <Input
                                        value={username}
            							onChangeText={(username) => this.setState({username})}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        style={{color:'#eeeeee'}}
                                    />
                                </Item>
                            </ListItem>
                            <ListItem>
                                <Item floatingLabel>
                                    <Label style={{color:'#eeeeee'}}>Password</Label>
                                    <Input
                                        value={password}
            							onChangeText={(password) => this.setState({password})}
                                        secureTextEntry={true}
                                        style={{color:'#eeeeee'}}
                                    />
                                </Item>
                            </ListItem>
                        </List>
                    </Form>
                    <Button full onPress={this.handleSubmit} style={{backgroundColor:'rgba(0, 0, 0, 0.4)'}}>
                        <Text style={{color:'#eeeeee'}}>{isLoading?'Loading...':'Log In'}</Text>
                    </Button>
                    <Button full style={{marginBottom:10}}>
                        <Icon name='logo-facebook' />
                        <Text style={{color:'white'}}>Continue With Facebook</Text>
                    </Button>
                    <Text
                        onPress={()=>{navigation.navigate('Register')}}
                        style={{color:'#757575',fontSize:16,paddingTop:5,paddingBottom:5}}>
                        Do not have an account?
                    </Text>
                </View>
            </View>
        );
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth._55
    }
}

export default connect(mapStateToProps,{login,validateAuth})(Login);
