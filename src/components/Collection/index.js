import React, { PropTypes } from 'react';
import {View,StyleSheet,RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Left,Body,Right,Button,Icon,Text,H1} from 'native-base';
import {getCollection,getCollectionCnt} from '../../actions/collection';
import Spinner from 'react-native-spinkit';
import {pagination} from '../../../lib/helpers';
import InfiniteScroll from 'react-native-infinite-scroll';
import isEmpty from 'is-empty';
import CollectionCard from './Card';

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            collection:[],
            refreshing: false,
            loading_more: false,
            has_next_page: true,
        };
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }

    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({loading:true,username});
        this.props.getCollection({username,offset:0})
        .then(r=>{
            this.setState({collection:r.data.collection})
            this.props.getCollectionCnt({username})
            .then(r=>{
                this.setState({post_cnt:r.data.post_cnt,loading:false});
            })
        })
    }

    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username}=this.state;
        this.props.getCollection({username,offset:0})
        .then(r=>{
            this.setState({collection:r.data.collection})
            this.props.getCollectionCnt({username})
            .then(r=>{
                this.setState({post_cnt:r.data.post_cnt,refreshing:false});
            })
        })
    }

    _onLoadMore=()=>{
        if(this.state.has_next_page && this.state.post_cnt>5){
            const {page,posts_cnt}=this.state;
            let pages=pagination(limit=5,page+1,posts_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username}=this.state;
            this.props.getCollection({username,offset:pages.nextOffset})
            .then(r=>{
                let rows=this.state.collection;
                rows.push.apply(rows,r.data.collection);
                this.setState({collection:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    empty=(
        <View style={styles.container}>
            <Text>Whenever you save a wride, it will appear here</Text>
        </View>
    )
    collection=()=>{
        const {collection}=this.state
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
                {collection.map((r,i)=><CollectionCard info={r} key={i}/>)}
            </InfiniteScroll>
        )
    }


    render () {
        const {navigation}=this.props;
        const {loading,collection}=this.state;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>navigation.goBack()}>
                            <Icon name='ios-arrow-back' style={{color:'#757575'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Collections</Text>
                    </Body>
                    <Right />
                </Header>
                {loading?<View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>: isEmpty(collection)?this.empty:this.collection()}
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth._55,
        collection: state.collection
    }
}

//Spinner stylesheet
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

export default connect(mapStateToProps,{getCollection,getCollectionCnt})(Collection);
