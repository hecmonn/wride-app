import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Text,Container} from 'native-base';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
            posts:0
        }
    }
    componentWillReceiveProps(nextProps){
        if(typeof nextProps.profile.user!=='undefined' && nextProps.profile.user!==this.props.profile.posts){
            this.setState({posts:nextProps.profile.user.posts});
        }
    }
    render () {
        const {focused}=this.props;
        const {posts}=this.state;
        return(
            <Container>
                <Text style={{fontWeight:focused?'bold':'normal'}}>Posts</Text>
                <Text note>{posts}</Text>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth._55,
        profile: state.profile
    }
}

export default connect(mapStateToProps,null)(Tab);
