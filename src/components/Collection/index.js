import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Container,Header,Left,Body,Right,Button,Icon,Text,H1} from 'native-base';


class Collection extends React.Component {
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
                        <Text>Collections</Text>
                    </Body>
                    <Right />
                </Header>
                <H1>Here will go the Collection</H1>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        collection: state.collection //to add
    }
}

export default Collection;
