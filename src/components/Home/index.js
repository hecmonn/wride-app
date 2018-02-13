import React, { PropTypes } from 'react'
import {Container,Header,Body,Title,Text,Right,Left,Button,Icon,H1} from 'native-base';
import NewsFeed from '../NewsFeed';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render () {
        const {navigation}=this.props;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Left/>
                    <Body>
                        <Title>W</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>navigation.navigate('Editor')}>
                            <Icon name='ios-leaf-outline'/>
                        </Button>
                    </Right>
                </Header>
                <NewsFeed />
            </Container>
        )
    }
}

export default Home;
