import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Container,Content,Text,Body,Button,List,H1} from 'native-base';
import {getFollowers} from '../../../actions/follow';
import Follower from './Follower';
import isEmpty from 'is-empty';

class Followers extends React.Component {
    constructor(props){
        super(props);
        this.state={
            followers:[],
            username_param:'',
            username:''
        }
    }

    componentWillMount() {
        const {username,username_param}=this.props.screenProps;
        console.log('ScreenProps: ',this.props.screenProps)
        this.props.getFollowers({username,username_param})
        .then(r=>{
            this.setState({followers:r.data.followers,username_param,username})
        });
    }

    followersList=(followers)=>{
        const {username_param,username}=this.props.screenProps;
        return(
            <List>
                {this.state.followers.map((r,i)=><Follower person={r} key={i} users={{username_param,username}} getUnFollow={this.props.screenProps.getUnFollow} />)}
            </List>
        )
    }

    empty=()=>(
        <Body>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.username_param} has no followers</Text>
        </Body>
    )

    render () {
        const {navigation}=this.props;
        const {followers}=this.state;
        return(
            <Container style={{backgroundColor:'white'}}>
                <Content>
                    {followers.length==0?this.empty():this.followersList()}
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return {
        followers: state.followers,
        auth: state.auth._55
    }
}

export default connect(mapStateToProps,{getFollowers})(Followers);
