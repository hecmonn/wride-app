import React, { PropTypes } from 'react'
import {Container,Header,Body,Title,Text,Right,Left,Button,Icon,H1} from 'native-base';
import NewsFeed from '../NewsFeed';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {getHomePosts} from '../../actions/newsfeed';
import isEmpty from 'is-empty';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            wrides:[],
            loading:true
        }
    }
    componentWillMount() {
        const {isLogged,username} =this.props.auth;
        this.setState({username});
        if(!isLogged) {
            this.props.navigation.navigate('Login');
        }

    }
    componentDidMount() {
        const{username}=this.props.auth;
        this.props.getHomePosts(username)
        .then(r=>this.setState({wrides:r.data.wrides,loading:false}));
    }
    render () {
        const {navigation}=this.props;
        const {wrides,loading,username}=this.state;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Left/>
                    <Body>
                        <Title>W</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>navigation.navigate('Profile',{username})}>
                            <Icon style={{color:'#757575'}} name='ios-person-outline'/>
                        </Button>
                        <Button transparent onPress={()=>navigation.navigate('Editor')}>
                            <Icon style={{color:'#757575'}} name='ios-leaf-outline'/>
                        </Button>
                    </Right>
                </Header>
                {loading?<H1>loading..</H1>:<NewsFeed navigation={this.props.navigation} username={username} screenProps={wrides}/>}
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        newsfeed: state.newsfeed
    }
}

export default connect(mapStateToProps,{getHomePosts})(Home);
