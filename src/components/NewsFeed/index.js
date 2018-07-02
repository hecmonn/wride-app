import React, { PropTypes } from 'react';
import {View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Container,Content,Header,Body,H1,Text} from 'native-base';
import {postAction} from '../../actions/newsfeed';
import Post from './Post';
import isEmpty from 'is-empty';
import Spinner from 'react-native-spinkit';

class NewsFeed extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            postsReceived:false,
            wrides:[],
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.screenProps.wrides!=this.props.screenProps.wrides){
            this.setState({loading:false})
        }
    }

    wridesList=(wrides)=>{
        const {posts,navigation}=wrides;
        const {username,loading_more,has_next_page}=this.props.screenProps;
        return(
            <Content>
                {posts.map((r,i)=><Post auser={username} postAction={this.props.postAction} navigation={this.props.navigation} wride={r} key={i} showModal={this._showModal}/>)}
                {loading_more && <View style={{paddingTop:10,paddingBottom:10,justifyContent:'center',alignItems:'center'}}><Spinner isVisible={loading_more} size={30} type='Arc' color='#757575'/></View>}
                {!has_next_page && <View style={{paddingTop:10,paddingBottom:10,justifyContent:'center',alignItems:'center'}}><H1 style={{fontFamily:'Cochin'}}>Wride.</H1></View>}
            </Content>
    )}
    empty=(
        <Container>
            <Body>
                <H1>There are no posts, yet.</H1>
            </Body>
        </Container>
    );

    render () {
        const {postsReceived,wrides}=this.state;
        const {loading}=this.props.screenProps;
        return(
            <Container>
                <Content>
                    {loading?
                        <View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>: isEmpty(this.props.screenProps.wrides)?this.empty:this.wridesList({posts:this.props.screenProps.wrides})
                    }
                </Content>
            </Container>
        )
    }
}

//Spinner style
let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinner: {
        marginBottom: 50,
        marginTop: 50
    },
});

let mapStateToProps=state=>{
    return {
        newsfeed:state.newsfeed
    }
}
export default connect(mapStateToProps,{postAction})(NewsFeed);
