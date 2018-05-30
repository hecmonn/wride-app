import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {View,StyleSheet} from 'react-native';
import {getBlocked,unblock} from '../../../../actions/options';
import {Header,Title,Left,Body,Right,Icon,Button,List,Text,Container} from 'native-base';
import Spinner from 'react-native-spinkit';
import isEmpty from 'is-empty';
import BlockedUser from './BlockedUser';

class Blocked extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            blocked_users: null
        }
    }
    componentWillMount() {
        let username=this.props.navigation.state.params.username;
        this.props.getBlocked({username})
        .then(r=>{
            console.log('Blocked res:', r);
            this.setState({loading:false,blocked_users:r.data.response})
        })
    }

    blockedUsers=()=>{
        let username=this.props.navigation.state.params.username;
        const {blocked_users}=this.state;
        if (isEmpty(blocked_users)){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: 18, fontWeight:'bold'}}>No blocked users</Text>
                </View>
            )
        } else {
            return (
                <List>
                    {blocked_users.map((r,i)=><BlockedUser props={r} auser={username} unblock={this.props.unblock} key={i} />)}
                </List>
            )
        }
    }

    render () {
        const {navigation}=this.props;
        const {loading}=this.state;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" style={{color:'#757575'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Blocked Users</Title>
                    </Body>
                    <Right />
                </Header>
                {loading?<View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>: this.blockedUsers()}
            </Container>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinner: {
        marginBottom: 50
    },
});


let mapStateToProps=state=>{
    return {
        options: state.options
    }
}

export default connect (mapStateToProps,{getBlocked,unblock})(Blocked);
