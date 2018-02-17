import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';
import Who from './Who';
import Navigator from './Navigator';

class Profile extends React.Component {
    render () {
        const {navigation}=this.props;
        //const p_user=this.props.puser;
        //const a_user=this.props.auth;
        //if(p_user.username===a_user.username) own_profile=true;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Who navigation={navigation} />
                    <Navigator />
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth
    }
}

export default connect(mapStateToProps,null)(Profile);
