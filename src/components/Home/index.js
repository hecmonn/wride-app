import React, { PropTypes } from 'react'
import {Container,Header,Body,Title,Text,Right,Left,Button,Icon,H1,Drawer} from 'native-base';
import NewsFeed from '../NewsFeed';
import {AsyncStorage,ScrollView,RefreshControl,StyleSheet,View} from 'react-native';
import {connect} from 'react-redux';
import {getHomePosts,getHomePostsCnt} from '../../actions/newsfeed';
import isEmpty from 'is-empty';
import {pagination} from '../../../lib/helpers';
import InfiniteScroll from 'react-native-infinite-scroll';
import Spinner from 'react-native-spinkit';
import SideBar from './SideBar';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:null,
            wrides:[],
            loading:true,
            refreshing: false,
            page: 1,
            loading_more: false,
            has_next_page: true
        }
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }

    componentWillMount(){
        console.log('thisProps not: ',this.props);
        if(!isEmpty(this.props.auth)){
            console.log('Entered...');
            const {username}=this.props.auth;
            this.setState({username});
            this.props.getHomePosts({username,offset:0})
            .then(r=>{
                this.setState({wrides:r.data.wrides});
                this.props.getHomePostsCnt(username)
                .then(r=>{
                    this.setState({loading:false,posts_cnt:r.data.wrides_cnt})
                });
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.auth) || !isEmpty(this.props.auth)){
            console.log('Entered receive props')
            console.log('nextProps not: ',nextProps);
            console.log('thisProps not: ',this.props);
            const {username}=isEmpty(this.props.auth.username)?nextProps.auth:this.props.auth;
            this.setState({username});
            this.props.getHomePosts({username,offset:0})
            .then(r=>{
                this.setState({wrides:r.data.wrides});
                this.props.getHomePostsCnt(username)
                .then(r=>{
                    this.setState({loading:false,posts_cnt:r.data.wrides_cnt})
                });
            });
        }
    }
    async componentDidMount() {
        //console.log('This props: ',this.props)
        /*if(!isEmpty(this.props.auth)){
            console.log('Entered...');
            const {username}=this.props.auth;
            await this.setState({username});
            this.props.getHomePosts({username,offset:0})
            .then(r=>{
                this.setState({wrides:r.data.wrides});
                this.props.getHomePostsCnt(username)
                .then(r=>{
                    console.log('Home response: ',r)
                    this.setState({loading:false,posts_cnt:r.data.wrides_cnt})
                });
            });
        }*/
    }

    _onRefresh=()=> {
        this.setState({refreshing: true});
        const{username}=this.state;
        this.props.getHomePosts({username,offset:0})
        .then(r=>{
            this.setState({wrides:r.data.wrides,refreshing: false})
        });
    }

    _onLoadMore=()=>{
        if(this.state.has_next_page){
            const {page,posts_cnt}=this.state;
            let pages=pagination(limit=30,page+1,posts_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username}=this.state;
            this.props.getHomePosts({username,offset:pages.nextOffset})
            .then(r=>{
                let rows=this.state.wrides;
                rows.push.apply(rows,r.data.wrides);
                this.setState({wrides:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    newsFeedView=()=>{
        const {wrides,loading,username,loading_more,has_next_page}=this.state;
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
                <NewsFeed navigation={this.props.navigation} username={username} screenProps={{wrides,loading,username,loading_more,has_next_page}}/>
            </InfiniteScroll>
        )
    }


    render () {
        const {navigation}=this.props;
        const {wrides,loading,username}=this.state;
        return(
            <Container>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar navigation={navigation} />}
                    onClose={() => this.closeDrawer()} >
                <Header style={{backgroundColor:'white'}}>
                    <Left>
                        <Button transparent onPress={()=>this.openDrawer()}>
                            <Icon style={{color:'#757575'}} name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{fontFamily:'Cochin'}}>W</Title>
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


                    {loading?<View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>:this.newsFeedView()}
                </Drawer>
            </Container>
        )
    }
}

//Spinner stylesheet
let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinner: {
        marginBottom: 50
    },
});

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        newsfeed: state.newsfeed
    }
}

export default connect(mapStateToProps,{getHomePosts,getHomePostsCnt})(Home);
