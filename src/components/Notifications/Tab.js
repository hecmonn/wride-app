import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {getUnreadNotifications,clearNotifications} from '../../actions/notifications';
import {Icon,Text,Container,Content,Badge} from 'native-base';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notifications:0
        }
    }
    componentWillMount() {
        //console.log(this.props.auth,'---tab not')
        //const {username}=this.props.auth;
        //this.props.getNotifications(username)
        //.then(r=>{
        //    this.setState({notifications:r.data.notifications});
        //});
    }
    componentDidMount() {
        const {username}=this.props.auth;
        this.props.getUnreadNotifications(username)
        .then(r=>{
            this.setState({notifications:r.data.notifications.length});
            //this.props.clearNotifications(username)
            //.then(r=>{this.setState({notifications: 0})})
        });
    }
    componentDidFocus(){
        console.log('focused')
    }
    render () {
        const {focused}=this.props;
        const {notifications}=this.state;
        return(
                <Icon
                    name={focused?'ios-notifications':'ios-notifications-outline'}
                    style={{color:notifications>0?'red':'#464646'}}
                    size={16}
                />
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth._55,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps,{getUnreadNotifications,clearNotifications})(Tab);
/*
<Icon
    name={notifications>0||focused?'ios-notifications':'ios-notifications-outline'}
    style={{color:!focused&&notifications>0?'red':'#464646'}}
    size={16}
/>

{notifications>0&&
    <Badge size={40}>
        <Text>{notifications}</Text>
    </Badge>
}
*/
