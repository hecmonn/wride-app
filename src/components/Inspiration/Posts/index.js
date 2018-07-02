import React, { PropTypes } from 'react';
import {View} from 'react-native';
import {Container,Text,H1,Left,Body,Right,Card,CardItem,Button,Thumbnail} from 'native-base';
import Post from './Post';
import isEmpty from 'is-empty';

class Posts extends React.Component {
    constructor(props){
        super(props);
    }
    postsList=()=>(
        <Container>
            {this.props.posts.map((r,i)=>(
                <Post navigation={this.props.navigation} post={r} key={i} />
            ))}
        </Container>
    )
    empty=()=>(
        <View style={{flex: 1,alignItems: 'center',marginTop:5}}>
            <Text style={{fontFamily:'Cochin'}}>No results for {this.props.query}</Text>
        </View>
    )
    render () {
        console.log(this.props.posts,'---posts tab');
        const {navigation}=this.props;
        return(
            <Container>
                {isEmpty(this.props.posts)?this.empty():this.postsList()}
            </Container>
        )
    }
}

export default Posts;
/*

<Card>
    <CardItem>
        <Left>
            <Text style={{fontWeight:'bold',fontSize:20}}>A really rally really really stupidly title</Text>
        </Left>
    </CardItem>
    <CardItem cardBody style={{marginBottom: 5}}>
        <Right>
            <Text note>hecmonn</Text>
        </Right>
    </CardItem>
</Card>
<Card>
    <CardItem>
        <Left>
            <Text style={{fontWeight:'bold',fontSize:20}}>A not so long title</Text>
        </Left>
    </CardItem>
    <CardItem cardBody style={{marginBottom: 5}}>
        <Right>
            <Text note>hecmonn</Text>
        </Right>
    </CardItem>
</Card>
<Card>
    <CardItem>
        <Left>
            <Text style={{fontWeight:'bold',fontSize:20}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </Left>
    </CardItem>
    <CardItem cardBody style={{marginBottom: 5}}>
        <Right>
            <Text note>john</Text>
        </Right>
    </CardItem>
</Card>

*/
