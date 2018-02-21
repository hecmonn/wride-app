import React, { PropTypes } from 'react';
import {Image} from 'react-native';
import {Content,Left,Right,Body,Title,Icon,Text,Card,CardItem,Thumbnail,Button,H3} from 'native-base';
import {prettyName} from '../../../../lib/helpers'

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state={
            liked:false,
            shared:false
        }
    }
    render () {
        const {content,title,fname,lname,username,created_date,id,is_liked,is_shared}=this.props.wride;
        const name=prettyName(fname,lname);
        return(
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
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
                        <Button transparent>
                            <Icon style={{color:'#757575'}} name={is_liked?'ios-thumbs-up':'ios-thumbs-up-outline'} />
                            <Text style={{fontWeight:is_liked?'bold':'normal',color:'#757575'}}>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon style={{color:'#757575'}}name={is_shared?'ios-swap':'ios-swap-outline'} />
                            <Text style={{fontWeight:is_shared?'bold':'normal',color:'#757575'}}>Shared</Text>
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
