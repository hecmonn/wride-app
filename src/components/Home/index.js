import React, { PropTypes } from 'react'
import {Container,Header,Body,Title,Text,Right,Left,Button,Icon,H1} from 'native-base';
import NewsFeed from '../NewsFeed';
import {AsyncStorage,ScrollView,RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {getHomePosts} from '../../actions/newsfeed';
import isEmpty from 'is-empty';
import InfiniteScroll from 'react-native-infinite-scroll';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            wrides:[],
            loading:true,
            refreshing: false,
            page: 1
        }
        this._onRefresh=this._onRefresh.bind(this);
    }
    componentWillMount() {
        const {isLogged,username} =this.props.auth;
        console.log(this.props.auth,'---auth props home');
        this.setState({username});
        if(!isLogged) {
            this.props.navigation.navigate('Login');
        }
    }

    _onRefresh=()=> {
        this.setState({refreshing: true});
        const{username}=this.state;
        this.props.getHomePosts(username)
        .then(r=>this.setState({wrides:r.data.wrides,refreshing: false}));
    }

    _onLoadMore=()=>{
        const {page}=this.state;
        console.log('Pulling page: ',page+1);
        this.setState({page: page+1});
        const {username}=this.state;
        this.props.getHomePosts(username)
        .then(r=>{
            let rows=this.state.wrides;
            rows.push.apply(rows,r.data.wrides);
            this.setState({wrides:rows,refreshing: false});
        });
    }
    newsFeedView=()=>{
        const {wrides,loading,username}=this.state;
        return(
            <InfiniteScroll
                horizontal={false}
                onLoadMoreAsync={this._onLoadMore}
                distanceFromEnd={10}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >

                <NewsFeed navigation={this.props.navigation} username={username} screenProps={{wrides,loading,username}}/>
            </InfiniteScroll>
        )
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
                {loading?<H1>loading..</H1>:this.newsFeedView()}
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
