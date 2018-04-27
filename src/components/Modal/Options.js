import React, { PropTypes } from 'react'
import {View,Modal,TouchableHighlight} from 'react-native';
import {List,ListItem,Left,Body,Right,Thumbnail,Text,Icon,Header} from 'native-base';

class ModalOptions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            own_post:false
        }
    }
    componentWillMount() {
        const {own_post,username,auser,id}=this.props.opts;
        this.setState({own_post:this.props.op})
    }
    componentWillReceiveProps(nextProps){
        if(this.props.ownPost!==nextProps.ownPost){
            console.log(nextProps);
        }
    }
    render () {
        const {own_post,username,auser,id}=this.props.opts;
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.6)'}}>
                        <Header style={{backgroundColor:'transparent'}}>
                            <Left />
                            <Body />
                            <Right>
                                <TouchableHighlight transparent onPress={() => {this.props.hideModal()}} style={{backgroundColor:'white',borderRadius:100,width:50,height:50,alignItems:'center',justifyContent:'center'}}>
                                    <Icon name='ios-close' style={{color:'black'}} />
                                </TouchableHighlight>
                            </Right>
                        </Header>
                        <List style={{backgroundColor:'white'}}>
                            {own_post &&
                                <ListItem button onPress={()=>conosole.log('clicked delete')} avatar>
                                    <Left>
                                        <Icon name='ios-close' style={{color:'#757575'}} />
                                    </Left>
                                    <Body>
                                        <Text>Delete</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                            }
                            <ListItem button onPress={()=>console.log('clciked second options')} avatar>
                                <Left>
                                    <Icon name='ios-close' style={{color:'#757575'}} />
                                </Left>
                                <Body>
                                    <Text>Delete2</Text>
                                </Body>
                                <Right />
                            </ListItem>
                            <ListItem button onPress={()=>console.log('clciked second options')} avatar>
                                <Left>
                                    <Icon name='ios-close' style={{color:'#757575'}} />
                                </Left>
                                <Body>
                                    <Text>Report</Text>
                                </Body>
                                <Right />
                            </ListItem>
                            <ListItem button onPress={()=>console.log('clciked second options')} avatar>
                                <Left>
                                    <Icon name='ios-close' style={{color:'#757575'}} />
                                </Left>
                                <Body>
                                    <Text>Block user</Text>
                                </Body>
                                <Right />
                            </ListItem>
                            <ListItem button onPress={()=>console.log('clciked second options')} avatar>
                                <Left>
                                    <Icon name='ios-close' style={{color:'#757575'}} />
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

export default ModalOptions;
