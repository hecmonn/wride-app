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
            shared:this.props.item.item.shared,
            liked:this.props.item.item.liked,
            saved:this.props.item.item.saved,
            likes_cnt:this.props.item.item.likes_cnt,
            shares_cnt:this.props.item.item.shares_cnt
        }
    }

    actionPost=(action)=>{
        const {id,username}=this.props.item.item;
        const {auser}=this.props;
        const{liked,shared,likes_cnt,shares_cnt,saved}=this.state;
        this.props.postAction({id,auser,action,liked,shared,saved})
        .then(r=>{
            switch(r.data.wydn){
                case 'liked':
                    this.setState({liked:1,likes_cnt:likes_cnt+1});
                    break;
                case 'shared':
                    this.setState({shared:1,shares_cnt:shares_cnt+1});
                    break;
                case 'saved':
                    this.setState({saved:1});
                    break;
                case 'unliked':
                    this.setState({liked:0,likes_cnt:likes_cnt-1});
                    break;
                case 'unshared':
                    this.setState({shared:0,shares_cnt:shares_cnt-1});
                    break;

                case 'unsaved':
                    this.setState({saved:0});
                    break;
                default: this.setState({liked,shared,saved});
            }
        });
    }

    render () {
        const {anonymous,id,title,post_path,username}=this.props.item.item;
        const {post_visible_modal,visible_modal,liked,shared,saved,likes_cnt,shares_cnt}=this.state;
        const modalContent={id,title,post_path,username,anonymous,liked,shared,saved,likes_cnt,shares_cnt};
        const {auser}=this.props;
        return (
            <Card>
                <OptionsModal opts={{id,own_post:auser==username,username,auser}} visible={visible_modal} hideModal={()=>this.setState({visible_modal:false})}/>
                <Modal content={modalContent} visible={post_visible_modal} actionPost={this.actionPost} postAction={this.props.postAction} hideModal={()=>this.setState({post_visible_modal:false})} />
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
