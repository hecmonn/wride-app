import React, { PropTypes } from 'react';
import {Card,CardItem,Title,Body,Text,Right,Left} from 'native-base';

class CollectionCard extends React.Component {
    render () {
        const {content,title,username,id}=this.props.info;
        const {navigation}=this.props;
        return(
            <Card>
                <CardItem header>
                    <Title style={{fontFamily:'Cochin'}}>{title} </Title>
                </CardItem>
                <CardItem button onPress={()=>{navigation.navigate('Editor',{content,title,id})}}>
                    <Body>
                        <Text style={{fontFamily:'Cochin'}}>
                            {content}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

export default CollectionCard;
