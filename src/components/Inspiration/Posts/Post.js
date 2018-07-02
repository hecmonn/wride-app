import React, { PropTypes } from 'react';
import {Card,CardItem,Title,Body,Text,Right,Left,Thumbnail,Button} from 'native-base';
import {prettyName} from '../../../../lib/helpers';

class CollectionCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post_visible_modal:false
        }
    }
    render () {
        const {content,title,username,id,path,fname,lname,anonymous}=this.props.post;
        const {navigation}=this.props;
        const name=prettyName(fname,lname);
        //const {post_visible_modal}=this.state;
        //const modalContent={title,content,username,created_date,path,likes_cnt,shares_cnt,saved,liked,shared,auser,id,post_path};
        return(
            <Card style={{marginBottom: 5,overflow:'hidden'}}>
                <CardItem>
                    <Left>
                        <Button transparent onPress={anonymous? null: ()=>navigation.navigate('Profile',{username})}>
                            <Thumbnail small source={{uri:path!==null&&!anonymous ? `http://localhost:5005/${path}`:'http://localhost:5005/dummy.png'}} />
                        </Button>
                        <Body>
                            <Text style={{fontFamily:'Cochin'}}>{username}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem button onPress={()=>{console.log('clicked post:',id)}}>
                    <Body>
                        <Text style={{fontWeight:'bold',fontSize:18,margin:5,fontFamily:'Cochin'}}>{title}</Text>
                        <Text style={{fontSize:16, margin: 7, lineHeight: 22,fontFamily:'Cochin'}}>{content}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

export default CollectionCard;
