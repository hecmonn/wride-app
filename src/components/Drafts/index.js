import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Container,Header,Left,Body,Right,Button,Icon,Text,H1} from 'native-base';


class Drafts extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>navigation.goBack()}>
                            <Icon name='ios-arrow-back' style={{color:'#757575'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Drafts</Text>
                    </Body>
                    <Right />
                </Header>
                <H1>Here will go the drafts</H1>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        drafts: state.drafts //to add
    }
}

export default Drafts;
