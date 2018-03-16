import React, { PropTypes } from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Container,Content,Header,Body,H1,Text} from 'native-base';
import {postAction} from '../../actions/newsfeed';
import Post from './Post';
import isEmpty from 'is-empty';
class NewsFeed extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            postsReceived:false,
            wrides:[]
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.screenProps.wrides!=this.props.screenProps.wrides){
            this.setState({loading:false})
        }
    }
    wridesList=(wrides)=>{
        const {posts,navigation}=wrides;
        const {username}=this.props;
        return(
            <Content>
                {posts.map((r,i)=><Post auser={username} postAction={this.props.postAction} navigation={this.props.navigation} wride={r} key={i} />)}
            </Content>
    )}
    empty=(
        <Container>
            <Body>
                <H1>There are no posts, yet.</H1>
            </Body>
        </Container>
    );
    render () {
        const {postsReceived,wrides}=this.state;
        const {loading}=this.props.screenProps;
        return(
            <Container>
                <Content>
                    {loading?
                        <H1>loading from nf...</H1>: isEmpty(this.props.screenProps.wrides)?this.empty:this.wridesList({posts:this.props.screenProps.wrides})
                    }
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return {
        newsfeed:state.newsfeed
    }
}
export default connect(mapStateToProps,{postAction})(NewsFeed);
