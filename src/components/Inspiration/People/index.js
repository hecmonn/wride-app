import React, { PropTypes } from 'react';
import {View} from 'react-native';
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
        <View style={{flex: 1,alignItems: 'center',marginTop:5}}>
            <Text style={{fontFamily:'Cochin'}}>No results for {this.props.query}</Text>
        </View>
    )
    render () {
        return(
            <Container>
                {isEmpty(this.props.people)?this.empty():this.peopleList()}
            </Container>
        )
    }
}

export default People;
