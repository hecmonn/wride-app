import React, { PropTypes } from 'react'
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right} from 'native-base';
import {elapsed} from '../../../lib/helpers';
class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={};
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
                        <Title>Post Title</Title>
                    </Body>
                    <Right/>

                </Header>
                <Content>
                    <Text>Post content goes here</Text>
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
export default connect(mapStateToProps,null)(Settings);
