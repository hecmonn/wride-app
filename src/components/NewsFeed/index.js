import React, { PropTypes } from 'react';
import {FlatList} from 'react-native';
import {Container,Content,Header,Body,H1,Text} from 'native-base';
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
        if(nextProps.screenProps){
            this.setState({loading:false})
        }
    }
    wridesList=(wrides)=>{
        const {posts,navigation}=wrides;
        return(
            <Content>
                {posts.map((r,i)=><Post navigation={this.props.navigation} wride={r} key={i} />)}
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

        const {loading,postsReceived,wrides}=this.state;
        return(
            <Container>
                <Content>
                    {isEmpty(this.props.screenProps)?this.empty:this.wridesList({posts:this.props.screenProps,navigation:this.props.navigation})}
                </Content>
            </Container>
        )
    }
}

export default NewsFeed;
