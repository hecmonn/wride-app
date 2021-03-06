import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Text,Container} from 'native-base';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
            likes:0
        }
    }
    componentWillReceiveProps(nextProps){
        if(typeof nextProps.profile.user!=='undefined' && nextProps.profile.user!==this.props.profile.likes){
            this.setState({likes:nextProps.profile.user.likes});
        }
    }
    render () {
        const {focused}=this.props;
        const {likes}=this.state;
        return(
            <Container>
                <Text style={{fontWeight:focused?'bold':'normal'}}>Likes</Text>
                <Text note>{likes}</Text>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        profile: state.profile
    }
}

export default connect(mapStateToProps,null)(Tab);
