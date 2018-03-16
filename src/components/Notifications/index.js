import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,RefreshControl} from 'react-native';
import {getNotifications,clearNotifications} from '../../actions/notifications';
import {Container,Header,Content,H1,Text,Body,Title,Grid,Row} from 'native-base';
import Notification from './Notification';


class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notifications:[],
            cleared: 0,
            refreshing: false,
            username: ''
        }
        this._onRefresh=this._onRefresh.bind(this);
    }
    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({username});
        this.props.getNotifications(username)
        .then(r=>{
            this.setState({notifications:r.data.notifications});
        });
    }
    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username}=this.state;
        this.props.getNotifications(username)
        .then(r=>{
            this.setState({notifications:r.data.notifications,refreshing: false});
        });
    }
    componentDidMount(){
        const {username}=this.props.auth;
        //console.log(username,'---notificaitons did mount')
        //console.log('already mount');
        //this.props.clearNotifications(username)
        //.then(r=>this.setState({cleared:1}));
    }
    empty=(
        <Body>
            <Text>No notiications, yet.</Text>
        </Body>
    )
    notificationsList=(nots)=>{
        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                {nots.map((r,i)=><Notification not={r} key={i} navigation={this.props.navigation} />)}
            </ScrollView>
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

export default connect(mapStateToProps,{getNotifications,clearNotifications})(Notifications);
