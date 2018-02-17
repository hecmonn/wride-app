import React, { PropTypes } from 'react'
import {Container,Header,Body,Title,Text,Right,Left,Button,Icon,H1} from 'native-base';
import NewsFeed from '../NewsFeed';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            token:''
        }
    }
    componentWillMount() {
        const {isLogged,username} =this.props.auth;
        if(!isLogged) this.props.navigation.navigate('Login');
    }
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Left/>
                    <Body>
                        <Title>W</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>navigation.navigate('Editor')}>
                            <Icon name='ios-leaf-outline'/>
                        </Button>
                    </Right>
                </Header>
                <NewsFeed />
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55
    }
}

export default connect(mapStateToProps,{})(Home);
