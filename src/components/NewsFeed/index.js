import React, { PropTypes } from 'react'
import {Container,Content,Header} from 'native-base';
import Post from './Post';
class NewsFeed extends React.Component {
    render () {
        return(
            <Container>
                <Content>
                    <Post />
                    <Post />
                </Content>
            </Container>
        )
    }
}

export default NewsFeed;
