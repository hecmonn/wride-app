import React, { PropTypes } from 'react'
import {Container,Header,Content,H1,Text,Body,Title,Icon,Item,Input} from 'native-base';

class Inspiration extends React.Component {
    render () {
        return(
            <Container>
                <Header searchBar transparent noShadow>
                    <Item style={{backgroundColor:'transparent'}}>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                </Header>
                <Content>
                    <Text>Inspiration</Text>
                </Content>
            </Container>
        )
    }
}

export default Inspiration;
