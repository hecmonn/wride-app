import React, { Component } from 'react';
import {AsyncStorage,View,StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Button,Icon,Text,Body,List,ListItem } from 'native-base';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import {login,validateAuth} from '../../actions/auth';
import {getUserInfo} from '../../actions/fb';
import {loginValidator} from '../../../lib/validations';
import FBLoginBtn from './FBLogin';
import {LoginManager,AccessToken} from 'react-native-fbsdk';
import Video from 'react-native-video';
import bgVideo from '../../../lib/videoplayback.mp4';
import isEmpty from 'is-empty';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:null,
            password:null,
            isLoading:false,
            errors:{},
            fbToken:null,
            loginBtnDisabled:true
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    _callGraph=()=>{
        let fbLink=`https://graph.facebook.com/me?access_token=${this.state.fbToken}&fields=id,name,email,about,picture`
        this.props.getUserInfo({fbLink})
        .then(r=>{
            console.log('FB Response: ',r);
        });
    }

    _fbAuth=async ()=>{
        await LoginManager.logInWithReadPermissions(['public_profile','email','user_friends']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    console.log('Result from fb call: ',result);
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
        await AccessToken.getCurrentAccessToken().then(
            (data) => {
                const fbToken=data.accessToken.toString();
                this.setState({fbToken})
                this._callGraph(fbToken);
            }
        );
        if(this.state.fbToken!==null){
            this._callGraph();
        }
    }

    _checkInputs=async (value,type)=>{
        if(type==1){
            await this.setState({username:value})
        } else if(type==2){
            await this.setState({password: value})
        }
        if(!isEmpty(this.state.username) && !isEmpty(this.state.password)){
            this.setState({loginBtnDisabled:false})
        } else {
            this.setState({loginBtnDisabled:true})
        }
    }
    handleSubmit=async ()=>{
        const {username,password}=this.state;
        this.setState({isLoading:true});
        const errors=loginValidator({username,password});
        if(errors.valid){
            this.props.login({identifier:username,password})
            .then(
                async r=>{
                    if(r.data.isLogged){
                        const decodedToken=jwtDecode(r.data.token);
                        await AsyncStorage.setItem('auth',r.data.token)
                        .then(this.props.validateAuth(decodedToken))
                        .then(this.props.navigation.navigate('Home',{isLogged:true}))
                        .done();
                    }
                    else{
                        this.setState({errors:r.data.errors.form});
                    }
                }
            );
        } else {
            this.setState({errors});
        }
        this.setState({isLoading:false})
    }
    render() {
        const {username,password,isLoading,errors,loginBtnDisabled}=this.state
        const {navigation}=this.props;
        return (
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
                <Video repeat source={bgVideo} volume={0} resizeMode="cover" style={StyleSheet.absoluteFill} />
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.4)',justifyContent:'center',alignItems:'center',margin:15}}>
                    <Text style={{color:'#eeeeee',fontWeight:'bold',fontSize:100}}>Wride.</Text>
                    <Form>
                        <List>
                            <ListItem>
                                <Item floatingLabel>
                                    <Label style={{color:'#eeeeee'}}>Username</Label>
                                    <Input
                                        value={username}
            							onChangeText={(username) => this._checkInputs(username,1)}
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
            							onChangeText={(password) => this._checkInputs(password,2)}
                                        secureTextEntry={true}
                                        style={{color:'#eeeeee'}}
                                    />
                                </Item>
                            </ListItem>
                        </List>
                    </Form>
                    <Button full onPress={this.handleSubmit} style={{backgroundColor:'rgba(0, 0, 0, 0.4)'}} disabled={loginBtnDisabled}>
                        <Text style={{color:loginBtnDisabled?'#757575':'#eeeeee'}}>{isLoading?'Loading...':'Log In'}</Text>
                    </Button>
                    <Button full style={{marginBottom:10}} onPress={()=>this._fbAuth()}>
                        <Icon name='logo-facebook' />
                        <Text style={{color:'#eeeeee'}}>Continue With Facebook</Text>
                    </Button>
                    {/*<FBLoginBtn />*/}
                    <Text
                        onPress={()=>{navigation.navigate('Register')}}
                        style={{color:'white',fontSize:16,paddingTop:5,paddingBottom:5}}>
                        Do not have an account?
                    </Text>
                </View>
            </View>
        );
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth._55,
        fb: state.fb
    }
}

export default connect(mapStateToProps,{login,validateAuth,getUserInfo})(Login);
