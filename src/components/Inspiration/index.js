import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,View} from 'react-native';
import {Container,Header,Content,Text,Title,Icon,Item,Input,H1} from 'native-base';
import {getSearch} from '../../actions/search';
import isEmpty from 'is-empty';
import Tabs from './Tabs';

class Inspiration extends React.Component {
    constructor(props){
        super(props);
        this.state={
            query:'',
            username:'',
            people:[],
            posts:[]
        }
    }
    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({username});
    }
    onQueryChange=(query)=>{
        const {username}=this.state;
        this.setState({query});
        this.props.getSearch({query,username})
        .then(r=>this.setState({posts:r.data.result_posts,people:r.data.result_people}));
    }

    inspiration=(
        <ScrollView contentContainerStyle={{display: 'flex',flex:1, flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-around'}}>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>art blakey is a fucking genius</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
            <View style={{width: 176, borderWidth:1,borderColor:'black', marginBottom: 5}}><Text>Hey</Text></View>
        </ScrollView>
    )
    render () {
        const {query,people,posts}=this.state;
        const {navigation}=this.props;
        return(
            <Container>
                <Header searchBar transparent noShadow>
                    <Item style={{backgroundColor:'transparent'}}>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search"
                            onChangeText={(query)=>this.onQueryChange(query)}
                            value={query}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                    </Item>
                </Header>
                <Content>
                    {isEmpty(query)?
                        this.inspiration:
                        <Tabs people={people} posts={posts} query={query} navigation={navigation} />
                    }
                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        search:state.search,
        auth: state.auth._55
    }
}

export default connect(mapStateToProps,{getSearch})(Inspiration);
