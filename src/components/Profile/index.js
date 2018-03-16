import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,RefreshControl} from 'react-native';
import {Container,Header,Content,H1,Text,Body,Title,Left,Button,Icon,Right} from 'native-base';
import Who from './Who';
import {getOwnPosts} from '../../actions/newsfeed';
import {getProfile} from '../../actions/profile';
import {getFollowing,getUnFollow} from '../../actions/follow';
import Navigator from './Navigator';

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
            username_param:''
        }
    }
    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username,username_param}=this.state;
        this.props.getFollowing({username,username_param})
        .then(r=>{
            this.setState({following:r.data.following,own_profile:username==username_param,username});
            this.props.getOwnPosts(username_param)
            .then(r=>{
                this.setState({refreshing:false, wrides:r.data.wrides})
            });
        });
    }

    componentWillMount() {
        const {username,name,email}=this.props.auth;
        let username_param=this.props.navigation.state.params.username;
        this.setState({username_param})
        this.props.getFollowing({username,username_param})
        .then(r=>{
            this.setState({following:r.data.following,own_profile:username==username_param,username})
            this.props.getProfile(username_param)
            .then(r=>{
                this.setState({user_profile:r.data.user})
                this.props.getOwnPosts(username_param)
                .then(r=>{
                    this.setState({loading:false,wrides:r.data.wrides})
                });
            });
        });
    }

    render () {
        const {navigation}=this.props;
        const {loading,username,own_profile,user_profile,wrides,following,refreshing}=this.state;
        const username_param=this.props.navigation.state.params.username;
        console.log(loading,'---loading profile');
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
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

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <Who getUnFollow={this.props.getUnFollow} ownProfile={own_profile} following={following} username={username}  person={user_profile} navigation={navigation} />
                    <Navigator screenProps={{wrides,username_param,username,getUnFollow,loading}}/>
                </ScrollView>
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

export default connect(mapStateToProps,{getOwnPosts,getProfile,getFollowing,getUnFollow})(Profile);
