import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import {Container,Text} from 'native-base';
import {getStats} from '../../../actions/profile';
class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentWillMount() {
        this.props.getStats()
    }
    render () {
        return(
            <Container>
                <Text style={{fontWeight:focused?'bold':'normal'}}>Posts</Text>
                <Text note>100</Text>
            </Container>
        )
    }
}
let mapStateToProps=state=>{
    return{
        stats:state.stats
    }
}

export default connect(mapStateToProps,{getStats})(Tab);
