import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Text,Container} from 'native-base';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
            followers:0
        }
    }
    componentWillReceiveProps(nextProps){
        if(typeof nextProps.profile.user!=='undefined' && nextProps.profile.user!==this.props.profile.followers){
            this.setState({followers:nextProps.profile.user.followers});
        }
    }
    render () {
        const {focused}=this.props;
        const {followers}=this.state;
        return(
            <Container>
                <Text style={{fontWeight:focused?'bold':'normal'}}>Followers</Text>
                <Text note>{followers}</Text>
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
