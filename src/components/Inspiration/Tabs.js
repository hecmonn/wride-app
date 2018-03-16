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
                    <Tab heading="People">
                        <People navigation={navigation} people={people} query={query} />
                    </Tab>
                    <Tab heading="Posts">
                        <Posts navigation={navigation} posts={posts} query={query} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default TabsSearch;
