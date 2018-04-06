import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {View,TouchableHighlight,AsyncStorage} from 'react-native';
import {getUnreadNotifications,clearNotifications} from '../../actions/notifications';
import {Icon,Text,Container,Content,Badge} from 'native-base';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notifications: 0
        }
    }
    async componentWillMount() {

        //if breaks, pass this to cdm
        await AsyncStorage.getItem('auth');
        const {username}=this.props.auth;
        this.props.getUnreadNotifications(username)
        .then(r=>{
            this.setState({notifications:r.data.notifications.length});
            //this.props.clearNotifications(username)
            //.then(r=>{this.setState({notifications: 0})})
        });
    }
    iconPressed=()=>{
        const {notifications}=this.state;
        if(notifications>0) {
            this.setState({notifications: 0});
        }
        this.props.navigation.navigate('Notifications');
    }

    render () {
        const {focused}=this.props;
        const {notifications}=this.state;
        return(
            <View>
                <Icon
                    name={focused?'ios-notifications':'ios-notifications-outline'}
                    style={{color:notifications>0?'red':'#464646'}}
                    onPress={()=>this.iconPressed()}
                />
            {notifications>0 &&
                <View style={{position:'absolute',zIndex:2,top:2,right:-5 ,borderRadius:50,backgroundColor:'red',width:15,height:15,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>{notifications}</Text>
                </View>
            }

            </View>
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
