import React, { PropTypes } from 'react';
import {Button,Text} from 'native-base';
import {View} from 'react-native';

class FollowerBtn extends React.Component {
    constructor(props){
        super(props);
        this.state={
            followLabel: this.props.following?'Following':'Follow',
            unFollowLoading: false,
            following: this.props.following
        }
    }

    followerBtn=()=>{
        const {following,followLabel,unFollowLoading}=this.state;
        return(
            <Button small style={{backgroundColor:'white',borderColor:following?'#000aff':'#757575',borderWidth:1,borderRadius:5}} onPress={()=>this.unFollow()}>
                <Text style={{color:following?'#000aff':'#757575', fontWeight:'bold'}}>{unFollowLoading?'loading...':followLabel}</Text>
            </Button>
        )
    }
    unFollow=()=>{
        const {username,username_param}=this.props.users;
        const {following}=this.state;
        this.setState({unFollowLoading:true})
        this.props.getUnFollow({username,username_param,following})
        .then(r=>{
            this.setState({followLabel:r.data.action,unFollowLoading:false,following:r.data.following});
        })
    }

    editBtn=(
        <Button small
            style={{backgroundColor:'white',borderColor: '#181818',borderWidth:1,borderRadius:5}}
            onPress={()=>this.props.navigation.navigate('Settings')}>
                <Text style={{color:'black', fontWeight:'bold'}}>Edit Profile</Text>
        </Button>
    )

    componentWillReceiveProps(nextProps){
        if(nextProps.following!==this.props.following){
            this.setState({following:nextProps.following,followLabel:nextProps.following?'Following':'Follow'});
        }
    }
    render () {
        const {ownProfile}=this.props;
        return(
            <View>
                {ownProfile? !this.props.fromList && this.editBtn: this.followerBtn()}
            </View>
        )
    }
}

export default FollowerBtn;
