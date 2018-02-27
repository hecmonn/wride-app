import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {getNotifications} from '../../actions/notifications';
import {Container,Header,Content,H1,Text,Body,Title,Grid,Row} from 'native-base';
import Notification from './Notification';


class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notifications:[]
        }
    }
    componentWillMount() {
        const {username}=this.props.auth;
        this.props.getNotifications(username)
        .then(r=>{
            this.setState({notifications:r.data.notifications});
        });
    }
    empty=(
        <Body>
            <Text>No notiications, yet.</Text>
        </Body>
    )
    notificationsList=(nots)=>{
        return(
            <Content>
                {nots.map((r,i)=><Notification not={r} key={i} navigation={this.props.navigation} />)}
            </Content>
        )
    }
    render () {
        const {navigation}=this.props;
        const {notifications}=this.state;
        return(
            <Container style={{backgroundColor:'white'}}>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                </Header>
                {notifications.length==0?this.empty:this.notificationsList(notifications)}
            </Container>
        )
    }
}
let mapStateToProps=state=>{
    return{
        auth:state.auth._55,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps,{getNotifications})(Notifications);
