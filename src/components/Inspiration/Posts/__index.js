import React, { PropTypes } from 'react';
import {Container,Text,H1,Left,Body,Right,Card,CardItem,Button,Thumbnail} from 'native-base';
import Masonry from 'react-native-masonry'


class Posts extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        console.log(this.props.posts,'---posts tab');
        const {navigation}=this.props;
        return(
            <Masonry
                sorted
                columns={2}
                bricks={[
                    {
                        data: {
                            caption: 'Some really really really really long title',
                            username:'hecmonn',
                            created_date: '05/06'
                        },
                        uri: 'https://en.wikipedia.org/wiki/Food#/media/File:Good_Food_Display_-_NCI_Visuals_Online.jpg',
                        renderFooter: (data) => {
                            return (
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontWeight:'bold',fontSize:20}}>{data.caption}</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody style={{marginBottom: 5}}>
                                        <Right>
                                            <Text note>{data.username}</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        },
                    },
                    {
                        data: {
                            caption: 'Some really extremely insanely really really really long title',
                            username:'hecmonn',
                            created_date: '05/06'
                        },
                        uri: 'https://en.wikipedia.org/wiki/Food#/media/File:Good_Food_Display_-_NCI_Visuals_Online.jpg',
                        renderFooter: (data) => {
                            return (
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontWeight:'bold',fontSize:20}}>{data.caption}</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody style={{marginBottom: 5}}>
                                        <Right>
                                            <Text note>{data.username}</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        },
                    },
                    {
                        data: {
                            caption: 'Some not so long title',
                            username:'hecmonn',
                            created_date: '05/06'
                        },
                        renderHeader: (data) => {
                            return (
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontWeight:'bold',fontSize:20}}>{data.caption}</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody style={{marginBottom: 5}}>
                                        <Right>
                                            <Text note>{data.username}</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        },
                    },
                ]}
            />
        )
    }
}

export default Posts;
