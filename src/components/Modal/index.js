import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {View,ScrollView,Modal,TouchableHighlight,Image} from 'react-native';
import {Button,Text,Header,Footer,Icon,Left,Right,Body,Content} from 'native-base';
import isEmpty from 'is-empty';

class ModalPost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:null,
            content:null,
            username:null,
            name:null,
            created_date:null,
            shares_cnt:null,
            likes_cnt:null,
            liked: null,
            shared:null,
            saved: null,
            id:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.content!==nextProps.content) this.setState({...nextProps.content})
    }

    render () {
        const {title,content,username,name,created_date,shares_cnt,likes_cnt,liked,saved,shared,post_path}=this.state;
        return(
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
                        <View>
                            <Header style={{backgroundColor:'transparent'}}>
                                <Left />
                                <Body />
                                <Right>
                                    <TouchableHighlight transparent onPress={() => {this.props.hideModal()}} style={{alignItems:'center',justifyContent:'center'}}>
                                        <Icon name='ios-close' style={{color:'white'}} />
                                    </TouchableHighlight>
                                </Right>
                            </Header>
                            <ScrollView style={{backgroundColor:'white',minHeight:'20%',maxHeight:'80%'}}>
                                <View style={{margin:10}}>
                                    <Text style={{fontSize:30,fontWeight:'bold',marginBottom: 10,fontFamily:'Cochin'}}>{title}</Text>
                                    {!isEmpty(post_path) && <Image source={{uri:`http://localhost:5005/${post_path}`}} style={{marginBottom:10,height:250}} resizeMode='cover' />}
                                    <Text style={{marginBottom: 10,fontFamily:'Cochin'}}>{content}</Text>
                                </View>
                            </ScrollView>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Footer>
                                    <Left>
                                        <Button transparent onPress={()=>{this.props.actionPost(1)}}>
                                            <Icon style={{color:'#757575'}} name={liked?'ios-heart':'ios-heart-outline'} />
                                            <Text style={{fontWeight:liked?'bold':'normal',color:'#757575'}}>{likes_cnt>0 && likes_cnt} </Text>
                                        </Button>
                                    </Left>
                                    <Left>
                                        <Button transparent onPress={()=>{this.props.actionPost(2)}}>
                                            <Icon style={{color:'#757575'}}name={liked?'ios-swap':'ios-swap-outline'} />
                                            <Text style={{fontWeight:shared?'bold':'normal',color:'#757575'}}>{shares_cnt>0 && shares_cnt} </Text>
                                        </Button>
                                    </Left>
                                    <Right>
                                        <Button transparent onPress={()=>this.props.actionPost(3)}>
                                            <Icon name={saved?'ios-bookmark':'ios-bookmark-outline'} style={{color:'#757575'}} />
                                        </Button>
                                    </Right>
                                </Footer>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
let mapStateToProps=state=>{
    return {
        modal: state.modal
    }
}

export default ModalPost;
