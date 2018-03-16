import React, { PropTypes } from 'react';
import {Container,Text,Content,H1} from 'native-base';
import Person from './Person';
import isEmpty from 'is-empty';
class People extends React.Component {
    constructor(props){
        super(props);
    }
    peopleList=()=>(
        <Container>
            {this.props.people.map((r,i)=>(
                <Person navigation={this.props.navigation} person={r} key={i} />
            ))}
        </Container>
    )
    empty=()=>(
        <Container>
            <Text>No results for {this.props.query}</Text>
        </Container>
    )
    render () {
        return(
            <Content>
                {isEmpty(this.props.people)?this.empty():this.peopleList()}
            </Content>
        )
    }
}

export default People;
