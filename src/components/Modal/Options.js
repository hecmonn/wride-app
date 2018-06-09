import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {View,Modal,TouchableHighlight} from 'react-native';
import {List,ListItem,Left,Body,Right,Thumbnail,Text,Icon,Header,Toast} from 'native-base';
import {blockUser,deletePost,reportPost} from '../../actions/options';


class ModalOptions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            own_post:false
        }
    }
    blockUser=()=>{
        const {username,auser,id}=this.props.opts;
        this.props.blockUser({username,auser,id})
        .then(r=>{
            Toast.show({
                text:'User blocked succesfully',
                position:'bottom',
                buttonText:'Okay'
            });
        })
    }
    deletePost=()=>{
        const {id}=this.props.opts;
        this.props.deletePost({id})
        .then(r=>{
            Toast.show({
                text:'Post deleted succesfully',
                position:'bottom',
                buttonText:'Okay'
            });
        })
    }
    reportPost=()=>{
        const {id,auser}=this.props.opts;
        this.props.reportPost({id,auser})
        .then(r=>{
            console.log('Report res: ',r);
            Toast.show({
                text:'Thanks! We will take a look',
                position:'bottom',
                buttonText:'Okay'
            });
        })
    }
    componentWillMount() {
        const {own_post,username,auser,id}=this.props.opts;
        this.setState({own_post:this.props.op});
    }
    componentWillReceiveProps(nextProps){
        if(this.props.ownPost!==nextProps.ownPost){
            console.log(nextProps);
        }
    }
    render () {
        const {own_post,username,auser,id}=this.props.opts;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{flex:1,justifyContent:'center', backgroundColor:'rgba(0, 0, 0, 0.6)'}}>
                        <Header style={{backgroundColor:'transparent'}}>
                            <Left />
                            <Body />
                            <Right>
                                <TouchableHighlight transparent onPress={() => {this.props.hideModal()}} style={{alignItems:'center',justifyContent:'center'}}>
                                    <Icon name='ios-close' style={{color:'white'}} />
                                </TouchableHighlight>
                            </Right>
                        </Header>
                        <List style={{backgroundColor:'white'}}>
                            {own_post &&
                                <ListItem button onPress={()=>this.deletePost()} avatar>
                                    <Left>
                                        <Icon name='ios-trash-outline' style={{color:'#757575'}} />
                                    </Left>
                                    <Body>
                                        <Text>Delete</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                            }
                            {!own_post &&
                                <ListItem button onPress={()=>this.reportPost()} avatar>
                                    <Left>
                                        <Icon name='ios-warning-outline' style={{color:'#757575'}} />
                                    </Left>
                                    <Body>
                                        <Text>Report</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                            }
                            {!own_post &&
                                <ListItem button onPress={()=>this.blockUser()} avatar>
                                    <Left>
                                        <Icon name='ios-close-circle-outline' style={{color:'#757575'}} />
                                    </Left>
                                    <Body>
                                        <Text>Block user</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                            }
                            <ListItem button onPress={()=>console.log('clciked second options')} avatar>
                                <Left>
                                    <Icon name='ios-thumbs-up-outline' style={{color:'#757575'}} />
                                </Left>
                                <Body>
                                    <Text>More like this</Text>
                                </Body>
                                <Right />
                            </ListItem>
                        </List>
                    </View>
                </Modal>
            </View>
        )
    }
}

let mapStateToProps=state=>{
    return{
        options: state.options,
        auth: state.auth._55
    }
}

export default connect(mapStateToProps,{blockUser,deletePost,reportPost})(ModalOptions);
