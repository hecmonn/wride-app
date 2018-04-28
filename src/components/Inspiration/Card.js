import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Card,CardItem,Left,Body,Right,Text} from 'native-base';
import {Image} from 'react-native';
import isEmpty from 'is-empty';
import Modal from '../Modal';
import OptionsModal from '../Modal/Options';
import {postAction} from '../../actions/newsfeed';

class InspirationCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible_modal:false,
            post_visible_modal:false,
        }
    }

    render () {

        console.log('Post: ',this.props.item.item);
        const {anonymous,id,title,post_path,username}=this.props.item.item;
        const modalContent={...this.props.item.item};
        const {post_visible_modal,visible_modal}=this.state;
        const {auser,postAction}=this.props;
        return (
            <Card>
                <OptionsModal opts={{id,own_post:auser==username,username,auser}} visible={visible_modal} hideModal={()=>this.setState({visible_modal:false})}/>
                <Modal content={modalContent} visible={post_visible_modal} actionPost={actionPost} postAction={this.props.postAction} hideModal={()=>this.setState({post_visible_modal:false})} />
                <CardItem button onPress={()=>this.setState({post_visible_modal:true})}>
                    <Left>
                        <Text style={{fontWeight:'bold'}}>{title}</Text>
                    </Left>
                </CardItem>
                <CardItem cardBody button onPress={()=>this.setState({post_visible_modal:true})}>
                    {!isEmpty(post_path) && <Image source={{uri:`http://localhost:5005/${post_path}`}} style={{marginBottom:10,height:200,width:'100%'}} resizeMode='cover' />}
                </CardItem>
                <CardItem>
                    <Left />
                    <Right>
                        <Text note>{anonymous?'GGM':username}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth._55,
        newsfeed: state.newsfeed
    }
}

export default connect(mapStateToProps,{postAction})(InspirationCard);
