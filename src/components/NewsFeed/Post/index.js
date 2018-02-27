import React, { PropTypes } from 'react';
import {Image} from 'react-native';
import {Content,Left,Right,Body,Title,Icon,Text,Card,CardItem,Thumbnail,Button,H3} from 'native-base';
import {prettyName} from '../../../../lib/helpers';


class Post extends React.Component {
    constructor(props){
        super(props);
        this.state={
            liked: this.props.wride.is_liked,
            shared: this.props.wride.is_shared,
            likes_cnt: this.props.wride.likes_cnt,
            shares_cnt: this.props.wride.shares_cnt,
        }
    }
    actionPost=(action)=>{
        const {id,username}=this.props.wride;
        const {auser}=this.props;
        const{liked,shared,likes_cnt,shares_cnt}=this.state;
        this.props.postAction({id,auser,action,liked,shared})
        .then(r=>{
            switch(r.data.wydn){
                case 'liked':
                    this.setState({liked:1,likes_cnt:likes_cnt+1});
                    break;
                case 'shared':
                    this.setState({shared:1,shares_cnt:shares_cnt+1});
                    break;
                case 'unliked':
                    this.setState({liked:0,likes_cnt:likes_cnt-1});
                    break;
                case 'unshared':
                    this.setState({shared:0,shares_cnt:shares_cnt-1});
                    break;
                default: this.setState({liked,shared});
            }
        });
    }
    render () {
        const {content,title,fname,lname,username,created_date,id}=this.props.wride;
        const {liked,shared,shares_cnt,likes_cnt}=this.state;
        const {navigation}=this.props;
        const name=prettyName(fname,lname);
        return(
            <Card>
                <CardItem>
                    <Left>
                        <Button transparent onPress={()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
                        </Button>
                        <Body>
                            <Text>{name}</Text>
                            <Text note>{username}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Content>
                        <Text style={{fontWeight:'bold',fontSize:20,marginBottom:5}}>{title}</Text>
                        <Text>{content}</Text>
                    </Content>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent onPress={()=>{this.actionPost(1)}}>
                            <Icon style={{color:'#757575'}} name={liked?'ios-thumbs-up':'ios-thumbs-up-outline'} />
                            <Text style={{fontWeight:liked?'bold':'normal',color:'#757575'}}>{likes_cnt>0 && likes_cnt} Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent onPress={()=>{this.actionPost(2)}}>
                            <Icon style={{color:'#757575'}}name={liked?'ios-swap':'ios-swap-outline'} />
                            <Text style={{fontWeight:shared?'bold':'normal',color:'#757575'}}>{shares_cnt>0 && shares_cnt} Shares</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text style={{color:'#757575'}}>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default Post;
