import React, { PropTypes } from 'react'
import {Container,Tabs,Tab} from 'native-base';
import Posts from './Posts';
import People from './People';

class TabsSearch extends React.Component {
    render () {
        const {navigation,people,posts,query}=this.props;
        return(
            <Container>
                <Tabs initialPage={0}>
                    <Tab heading="People" textStyle={{color:'#757575'}} activeTextStyle={{fontWeight:'bold',color:'#757575'}} tabStyle={{backgroundColor:'white',borderColor:'#757575'}} activeTabStyle={{backgroundColor:'white',borderColor:'#757575'}}>
                        <People navigation={navigation} people={people} query={query} />
                    </Tab>
                    <Tab heading="Posts" textStyle={{color:'#757575'}} activeTextStyle={{fontWeight:'bold',color:'#757575'}} tabStyle={{backgroundColor:'white',borderColor:'#757575'}} activeTabStyle={{backgroundColor:'white',borderColor:'#757575'}}>
                        <Posts navigation={navigation} posts={posts} query={query} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default TabsSearch;
