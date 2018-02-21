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

    wridesList=(wrides)=>(
        <Content>
            {wrides.map((r,i)=><Post wride={r} key={i} />)}
        </Content>
    )
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
                    {isEmpty(this.props.screenProps)?this.empty:this.wridesList(this.props.screenProps)}
                </Content>
            </Container>
        )
    }
}

export default NewsFeed;
