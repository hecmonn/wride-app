import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import {Container,Header,Content,H1,Text,Body,Title} from 'native-base';
import Who from './Who';
import {getOwnPosts} from '../../actions/newsfeed';
import Navigator from './Navigator';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            wrides:[]
        }
    }
    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({loading:true});
        this.props.getOwnPosts(username)
        .then(r=>{
            this.setState({loading:false,wrides:r.data.wrides})
        });
    }
    render () {
        const {navigation}=this.props;
        const {loading,wrides}=this.state;

        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Who navigation={navigation} />
                    <Navigator screenProps={wrides}/>
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        newsfeed: state.newsfeed
    }
}

export default connect(mapStateToProps,{getOwnPosts})(Profile);
