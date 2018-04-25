import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,RefreshControl,View} from 'react-native';
import {Container,Header,Content,H1,Text,Body,Title,Left,Button,Icon,Right} from 'native-base';
import Who from './Who';
import {getOwnPosts,getOwnPostsCnt} from '../../actions/newsfeed';
import {getProfile} from '../../actions/profile';
import {getFollowing,getUnFollow} from '../../actions/follow';
import Navigator from './Navigator';
import InfiniteScroll from 'react-native-infinite-scroll';
import {pagination} from '../../../lib/helpers';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            wrides:[],
            username:'',
            own_profile: true,
            user_profile:{},
            following:'',
            refreshing:false,
            username_param:'',
            posts_cnt:0,
            page:1,
            loading_more:false,
            has_next_page: true,
        }
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }
    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username,username_param}=this.state;
        this.props.getFollowing({username,username_param})
        .then(r=>{
            this.setState({following:r.data.following,own_profile:username==username_param,username});
            this.props.getOwnPosts({username:username_param,offset:0,auser:username})
            .then(r=>{
                this.setState({refreshing:false, wrides:r.data.wrides})
            });
        });
    }

    _onLoadMore=()=>{
        if(this.state.has_next_page){
            const {page,posts_cnt,username}=this.state;
            let pages=pagination(limit=5,page+1,posts_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username_param}=this.state;
            this.props.getOwnPosts({username:username_param,offset:pages.nextOffset,auser:username})
            .then(r=>{
                let rows=this.state.wrides;
                rows.push.apply(rows,r.data.wrides);
                this.setState({wrides:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    componentWillMount() {
        const {username,name,email}=this.props.auth;
        let username_param=this.props.navigation.state.params.username;
        this.setState({username_param});
        this.props.getFollowing({username,username_param})
        .then(r=>{
            this.setState({following:r.data.following,own_profile:username==username_param,username})
            this.props.getProfile(username_param)
            .then(r=>{
                this.setState({user_profile:r.data.user})
                this.props.getOwnPosts({username:username_param,offset:0,auser:username})
                .then(r=>{
                    this.setState({wrides:r.data.wrides})
                    this.props.getOwnPostsCnt(username_param)
                    .then(r=>{
                        this.setState({loading:false,posts_cnt:r.data.wrides_cnt});
                    })
                });
            });
        });
    }

    render () {
        const {navigation}=this.props;
        const {loading,username,own_profile,user_profile,wrides,following,refreshing,loading_more,has_next_page}=this.state;
        const username_param=this.props.navigation.state.params.username;
        return(
            <View>
                <Header style={{backgroundColor:'white',shadowOffset:{width:5,height: 5},shadowColor:'#636363',shadowOpacity:0.05}}>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" style={{color:'#757575'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{username_param}</Title>
                    </Body>
                    <Right/>
                </Header>

                <InfiniteScroll
                    horizontal={false}
                    onLoadMoreAsync={this._onLoadMore}
                    distanceFromEnd={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >

                    <Who getUnFollow={this.props.getUnFollow} ownProfile={own_profile} following={following} username={username}  person={user_profile} navigation={navigation} />
                    <Navigator screenProps={{wrides,username_param,username,getUnFollow,loading,loading_more,has_next_page,getUnFollow:this.props.getUnFollow}}/>
                </InfiniteScroll>
            </View>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        newsfeed: state.newsfeed
    }
}

export default connect(mapStateToProps,{getOwnPosts,getProfile,getFollowing,getUnFollow,getOwnPostsCnt})(Profile);
