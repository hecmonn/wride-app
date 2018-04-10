import React, { PropTypes } from 'react';
import {View,StyleSheet,RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {getDrafts,getDraftsCnt} from '../../actions/drafts';
import {Container,Header,Left,Body,Right,Button,Icon,Text,H1} from 'native-base';
import InfiniteScroll from 'react-native-infinite-scroll';
import Spinner from 'react-native-spinkit';
import DraftCard from './Card';
import isEmpty from 'is-empty';

class Drafts extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            drafts:[],
            refreshing: false,
            loading_more: false,
            has_next_page: true,
        }
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }

    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username}=this.state;
        this.props.getDrafts({username,offset:0})
        .then(r=>{
            this.setState({drafts:r.data.drafts})
            this.props.getDraftsCnt({username})
            .then(r=>{
                this.setState({post_cnt:r.data.post_cnt,refreshing:false});
            })
        })
    }

    empty=(
        <View style={styles.container}>
            <Text style={{margin: 5}}>The old man and the sea was not written in one sit</Text>
        </View>
    )

    _onLoadMore=()=>{
        if(this.state.has_next_page && this.state.post_cnt>5){
            const {page,posts_cnt}=this.state;
            let pages=pagination(limit=5,page+1,posts_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username}=this.state;
            this.props.getDrafts({username,offset:pages.nextOffset})
            .then(r=>{
                let rows=this.state.drafts;
                rows.push.apply(rows,r.data.drafts);
                this.setState({drafts:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    drafts=()=>{
        const {drafts}=this.state
        return(
            <InfiniteScroll
                horizontal={false}
                onLoadMoreAsync={this._onLoadMore}
                distanceFromEnd={10}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }

            >
                {drafts.map((r,i)=><DraftCard info={r} key={i} navigation={this.props.navigation}/>)}
            </InfiniteScroll>
        )
    }

    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({loading:true,username});
        this.props.getDrafts({username,offset:0})
        .then(r=>{
            this.setState({drafts:r.data.drafts})
            this.props.getDraftsCnt({username})
            .then(r=>{
                this.setState({post_cnt:r.data.post_cnt,loading:false});
            })
        })
    }
    render () {
        const {navigation}=this.props;
        const {loading,drafts}=this.state;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>navigation.goBack()}>
                            <Icon name='ios-arrow-back' style={{color:'#757575'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Drafts</Text>
                    </Body>
                    <Right />
                </Header>
                {loading?<View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>: isEmpty(drafts)?this.empty:this.drafts()}
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        drafts: state.drafts //to add
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

export default connect(mapStateToProps,{getDrafts,getDraftsCnt})(Drafts);
