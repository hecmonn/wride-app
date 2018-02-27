import t from 'tcomb-form-native';
import React,{PropTypes} from 'react';
import {Platform,AsyncStorage} from 'react-native';
import {Container,Button,Text,Body,Icon} from 'native-base';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import {login,validateAuth} from '../../actions/auth';
const Form=t.form.Form;

Form.stylesheet.textbox.normal={
    color: 'black',
    fontSize: 17,
    height: 36,
    paddingVertical: Platform.OS === "ios" ? 7 : 0,
    paddingHorizontal: 7,
    marginHorizontal: 10,
    borderBottomColor: '#a8a8a8',
    borderBottomWidth: 1,
    marginBottom: 5
}
Form.stylesheet.textbox.error= {
      color: 'black',
      fontSize: '17',
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderBottomColor: 'red',
      borderBottomWidth: 1,
      marginBottom: 5
}
Form.stylesheet.controlLabel.normal= {
    color: '#757575',
    fontSize: 17,
    marginBottom: 7,
    fontWeight: '500'
}

const loginForm=t.struct({
    identifier:t.String,
    password:t.String
});

const loginFormOpt={
    fields:{
        identifier:{
            autoCorrect:false,
            autoCapitalize:'none'
        },
        password:{
            secureTextEntry: true
        }
    }
}
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit=async ()=>{
        let auth_info=this._form.getValue();
        this.setState({isLoading:true});
        this.props.login(auth_info)
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
    render () {
        const {isLoading,error}=this.state;
        const {navigation}=this.props;
        return (
            <Container>
                <Form
                    ref={c=>this._form=c}
                    type={loginForm}
                    options={loginFormOpt}
                />
                {error&&<Text style={{color:'red'}}>{error}</Text>}
                <Button full transparent onPress={this.handleSubmit} style={{borderWidth:1,borderColor:'#a8a8a8'}}>
                    <Text style={{color:'#757575'}}>{isLoading?'Loading...':'Login'}</Text>
                </Button>
                <Button full style={{marginBottom:10}}>
                    <Icon name='logo-facebook' />
                    <Text style={{color:'white'}}>Continue with facebook</Text>
                </Button>
                <Body>
                    <Text
                        onPress={()=>{navigation.navigate('Register')}}
                        style={{color:'#757575',fontSize:16}}>
                        Do not have an account?
                    </Text>
                </Body>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth._55
    }
}
export default connect(mapStateToProps,{login,validateAuth})(LoginForm);
