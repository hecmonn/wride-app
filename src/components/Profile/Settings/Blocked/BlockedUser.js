import React, { PropTypes } from 'react';
import {ListItem,Thumbnail,Left,Body,Right,Button,Text} from 'native-base';
import {prettyName} from '../../../../../lib/helpers';
import Spinner from 'react-native-spinkit';

class BlockedUser extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading: false,
            label: 'Unblock',
            disabled: false
        }
    }

    unblock=()=>{
        this.setState({loading:true})
        const {auser}=this.props;
        const {username}=this.props.props;
        this.props.unblock({username,auser})
        .then(r=>{
            this.setState({loading:false,label:'Unblocked',disabled:true})
        })
    }
    render () {
        const {label,disabled,loading}=this.state;
        const {fname,lname,username,path}=this.props.props;
        const name=prettyName(fname,lname);
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail small source={{ uri: path!==null?`http://localhost:5005/${path}`:'http://localhost:5005/dummy.png' }} />
                </Left>
                <Body>
                    <Text>{name}</Text>
                    <Text note>{username}</Text>
                </Body>
                <Right>
                    <Button onPress={this.unblock} small style={{backgroundColor:!disabled?'red':'white', borderRadius:5 }} disabled={disabled}>
                        <Text style={{color: !disabled?'white':'black'}}>{loading?<Spinner isVisible={loading} size={20} type='Arc' color='#757575'/>:label}</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}

export default BlockedUser;
