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
                <Header>
                    <Left/>
                    <Body>
                        <Title>W</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>navigation.navigate('Write')}>
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
