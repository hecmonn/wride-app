import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
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
            loading:false,
            wrides:[],
            username:'',
            own_profile: true,
            user_profile:{},
            following:'',
        }
    }
    componentWillMount() {
        const {username,name,email}=this.props.auth;
        let username_param=this.props.navigation.state.params.username;
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
        const {loading,username,own_profile,user_profile,wrides,following}=this.state;
        const username_param=this.props.navigation.state.params.username;

        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{username_param}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Who getUnFollow={this.props.getUnFollow} ownProfile={own_profile} following={following} username={username}  person={user_profile} navigation={navigation} />
                    <Navigator screenProps={{wrides,username_param,username,getUnFollow}}/>
                </Content>
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
