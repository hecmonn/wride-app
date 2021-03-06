import React, { PropTypes } from 'react';
import {Image} from 'react-native';
import {Content,Left,Right,Body,Title,Icon,Text,Card,CardItem,Thumbnail,Button,H3} from 'native-base';
import {prettyName,elapsedTime} from '../../../../lib/helpers';
import OptionsModal from '../../Modal/Options';
import Modal from '../../Modal';
import isEmpty from 'is-empty';
class Post extends React.Component {
    constructor(props){
        super(props);
        this.state={
            liked: this.props.wride.is_liked,
            shared: this.props.wride.is_shared,
            saved: this.props.wride.is_saved,
            likes_cnt: this.props.wride.likes_cnt,
            shares_cnt: this.props.wride.shares_cnt,
            visible_modal:false,
            post_visible_modal:false
        }
    }

    actionPost=(action)=>{
        const {id,username}=this.props.wride;
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
        const {content,title,fname,lname,username,created_date,id,path,post_path,anonymous}=this.props.wride;
        const {liked,shared,saved,shares_cnt,likes_cnt,visible_modal,post_visible_modal}=this.state;
        const {navigation,auser}=this.props;
        const modalContent={title,content,name,username,created_date,path,likes_cnt,shares_cnt,saved,liked,shared,auser,id,post_path};
        const elapsed=elapsedTime(created_date);
        const name=prettyName(fname,lname);
        return(
            <Card>
                <OptionsModal opts={{id,own_post:auser==username,username,auser}} visible={visible_modal} hideModal={()=>this.setState({visible_modal:false})}/>
                <Modal content={modalContent} visible={post_visible_modal} actionPost={this.actionPost} postAction={this.props.postAction} hideModal={()=>this.setState({post_visible_modal:false})} />
                <CardItem>
                    <Left>
                        <Button transparent onPress={anonymous? null: ()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail small source={{uri:path!==null&&!anonymous ? `http://localhost:5005/${path}`:'http://localhost:5005/dummy.png'}} />
                        </Button>
                        <Body>
                            <Text style={{fontFamily:'Cochin'}}>{anonymous?'Garcia Marquez':name}</Text>
                            <Text style={{fontFamily:'Cochin'}} note>{anonymous?null:`${username} · `}{elapsed}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={()=>this.setState({visible_modal:true})}>
                                <Icon name='ios-arrow-down' style={{color:'#757575'}} />
                            </Button>
                        </Right>
                    </Left>
                </CardItem>
                <CardItem button onPress={()=>this.setState({post_visible_modal:true})} cardBody>
                    <Content>
                        <Text style={{fontWeight:'bold',fontSize:18,margin:5,fontFamily:'Cochin'}}>{title}</Text>
                        {!isEmpty(post_path) && <Image source={{uri:`http://localhost:5005/${post_path}`}} style={{height:250,marginTop:5,marginBottom:5}} resizeMode='cover' />}
                        <Text style={{fontSize:16, margin: 7, lineHeight: 22,fontFamily:'Cochin'}}>{content}</Text>
                    </Content>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent onPress={()=>{this.actionPost(1)}}>
                            <Icon style={{color:'#757575'}} name={liked?'ios-heart':'ios-heart-outline'} />
                            <Text style={{fontWeight:liked?'bold':'normal',color:'#757575'}}>{likes_cnt>0 && likes_cnt} </Text>
                        </Button>
                        <Button transparent onPress={()=>{this.actionPost(2)}}>
                            <Icon style={{color:'#757575'}}name={liked?'ios-swap':'ios-swap-outline'} />
                            <Text style={{fontWeight:shared?'bold':'normal',color:'#757575'}}>{shares_cnt>0 && shares_cnt} </Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={()=>this.actionPost(3)}>
                            <Icon name={saved?'ios-bookmark':'ios-bookmark-outline'} style={{color:'#757575'}} />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default Post;
