import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';
import Who from './Who';
import {getOwnPosts} from '../../actions/newsfeed';
import {getProfile} from '../../actions/profile';
import Navigator from './Navigator';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            wrides:[],
            username_param:null,
            username:'',
            own_profile:false,
            name:'',
            user_profile:{}
        }
    }
    componentWillMount() {
        const {username,name,email}=this.props.auth;
        console.log(this.props.auth,'---cwm');
        this.setState({username,name,email,loading:true,user_profile:this.props.auth});
        this.props.getOwnPosts(username)
        .then(r=>{
            this.setState({loading:false,wrides:r.data.wrides})
        });
    }

    componentDidMount() {
        const {username,username_param}=this.state;
        console.log(username,username_param);
        if(username!==username_param){
            this.props.getProfile(username_param)
            .then(r=>{
                console.log(r.data,'---us profile');
                this.setState({user_profile:r.data.user});
                this.props.getOwnPosts(username_param)
                .then(r=>{
                    this.setState({wrides:r.data.wrides});
                })
            })
            console.log('not equal profile')
            this.setState({search:true})
        }
    }
    componentWillReceiveProps(nextProps){
        const {username}=this.state;
        console.log(username,'--cwrp');
        if(typeof nextProps.navigation.state.params!=='undefined'){
            let username_param=nextProps.navigation.state.params.username
            //console.log(this.props.auth,'----cwrp');
            console.log(username_param,'---us par')
            /*if(username!==username_param){
                this.props.getProfile(username_param)
                .then(r=>{
                    console.log(r.data,'---us profile');
                    this.setState({user_profile:r.data.user});
                    this.props.getOwnPosts(username_param)
                    .then(r=>{
                        this.setState({wrides:r.data.wrides});
                    })
                })
                console.log('not equal profile')
                this.setState({search:true})
            }*/
        }
    }
    render () {
        const {navigation}=this.props;
        const {loading,wrides,username_param,username,name,email,user_profile}=this.state;
        //if(username_param!==null &&username!==username_param) {
        //    user_profile={search:true}
        //    this.props.getProfile(username_param)
        //    .then(r=>console.log(r))
        //}
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Who person={user_profile} navigation={navigation} />
                    <Navigator screenProps={wrides}/>
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

export default connect(mapStateToProps,{getOwnPosts,getProfile})(Profile);
