import React, { PropTypes } from 'react'
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right} from 'native-base';
import {logout} from '../../../actions/auth';

class Settings extends React.Component {
    logout=()=>{
        this.props.logout();
        AsyncStorage.removeItem('auth')
        .then(r=>{
            this.props.navigation.navigate('Login');
        })
        .done();
    }
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
                    <Button onPress={this.logout}>
                        <Text>Logout</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth._55
    }
}
export default connect(mapStateToProps,{logout})(Settings);
