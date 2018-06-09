import React, { PropTypes } from 'react';
import {Card,CardItem,Title,Body,Text,Right,Left} from 'native-base';

class CollectionCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post_visible_modal:false
        }
    }
    render () {
        const {content,title,username,id}=this.props.info;
        const {navigation}=this.props;
        //const {post_visible_modal}=this.state;
        //const modalContent={title,content,username,created_date,path,likes_cnt,shares_cnt,saved,liked,shared,auser,id,post_path};
        return(
            <Card>
                <CardItem header>
                    <Title>{title} </Title>
                </CardItem>
                <CardItem button onPress={()=>{console.log('clicked post:',id)}}>
                    <Body>
                        <Text>
                            {content}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer button onPress={()=>{console.log('clicked post:',id)}}>
                    <Left />
                    <Body />
                    <Right>
                        <Text>{username}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default CollectionCard;
