import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Text,Title,Button} from 'native-base';
import {getLikes} from '../../../actions/likes';
import Like from './Like';


class Likes extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            likes:[]
        }
    }
    componentWillMount() {
        const {username,username_param}=this.props.screenProps;
        this.props.getLikes(username_param)
        .then(r=>{
            this.setState({likes:r.data.likes,loading:false});
        });
    }
    likesList=(likes)=>{
        const {navigation}=this.props;
        return(
            <Content>
                {likes.map((r,i)=><Like info={r} key={i} navigation={navigation} />)}
            </Content>
        )
    }
    empty=()=>{
        const {username_param}=this.props.screenProps;
        return(
            <Content>
                <Body>
                    <Text style={{fontWeight:'bold',fontSize:20}}>{username_param} has not liked anything</Text>
                </Body>
            </Content>
        )
    }
    render () {
        const {navigation}=this.props;
        const {likes}=this.state;
        return(
            <Container>
                {likes.length==0?this.empty():this.likesList(likes)}
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        likes:state.likes
    }
}

export default connect(mapStateToProps,{getLikes})(Likes);
