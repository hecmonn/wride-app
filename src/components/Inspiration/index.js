import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,View,FlatList,RefreshControl} from 'react-native';
import {Container,Header,Content,Text,Title,Icon,Item,Input,H1} from 'native-base';
import {getSearch,getInspiration,getInspirationCnt} from '../../actions/search';
import isEmpty from 'is-empty';
import Tabs from './Tabs';
import InfiniteScroll from 'react-native-infinite-scroll';
import MasonryList from '@appandflow/masonry-list';
import InspirationCard from './Card';

class Inspiration extends React.Component {
    constructor(props){
        super(props);
        this.state={
            query:null,
            username:null,
            people:[],
            posts:[],
            wrides:[],
            posts_cnt: null,
            refreshing: false
        }
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }
    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({username});
        this.props.getInspiration({username,offset:0})
        .then(r=>{
            this.setState({wrides:r.data.wrides});
            this.props.getInspirationCnt({username})
            .then(r=>{
                this.setState({loading:false,posts_cnt:r.data.wrides_cnt})
            });
        });
    }
    onQueryChange=(query)=>{
        const {username}=this.state;
        this.setState({query});
        this.props.getSearch({query,username})
        .then(r=>this.setState({posts:r.data.result_posts,people:r.data.result_people}));
    }

    _onRefresh=()=> {
        this.setState({refreshing: true});
        console.log('Refreshing...');
        const{username}=this.state;
        this.props.getInspiration({username,offset:0})
        .then(r=>{
            this.setState({wrides:r.data.wrides,refreshing: false})
        });
    }

    _onLoadMore=()=>{
        console.log('Loading more...')
        if(this.state.has_next_page){
            const {page,posts_cnt}=this.state;
            let pages=pagination(limit=5,page+1,posts_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username}=this.state;
            this.props.getInspiration({username,offset:pages.nextOffset})
            .then(r=>{
                let rows=this.state.wrides;
                rows.push.apply(rows,r.data.wrides);
                this.setState({wrides:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    _keyExtractor = (item, index) => item.title;
    inspiration=()=>{
        return (
            <MasonryList
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
                horizontal={false}
                onEndReached={this._onLoadMore}
                keyExtractor={this._keyExtractor}
                numColumns={2}
                getHeightForItem={() => 1}
                data={this.state.wrides}
                renderItem={(item)=><InspirationCard auser={this.state.username} item={item}/>}
            />
        )
    }
    render () {
        const {query,people,posts,refreshing}=this.state;
        const {navigation}=this.props;
        console.log('Refresh: ',refreshing);
        return(
            <Container>
                <Header searchBar style={{backgroundColor:'white',shadowOffset:{width:5,height: 5},shadowColor:'#636363',shadowOpacity:0.05}}>
                    <Item style={{backgroundColor:'transparent'}}>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search"
                            onChangeText={(query)=>this.onQueryChange(query)}
                            value={query}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                        {!isEmpty(query) && <Icon name='ios-close' onPress={()=>this.setState({query:''})}/>}
                    </Item>
                </Header>
                <Content>
                    {isEmpty(query)?
                        this.inspiration():
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

export default connect(mapStateToProps,{getSearch,getInspiration,getInspirationCnt})(Inspiration);
