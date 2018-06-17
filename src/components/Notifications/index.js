import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {ScrollView,RefreshControl,View,StyleSheet} from 'react-native';
import {getNotifications,clearNotifications,getNotificationsCnt} from '../../actions/notifications';
import {Container,Header,Content,H1,Text,Body,Title,Grid,Row} from 'native-base';
import Notification from './Notification';
import {pagination} from '../../../lib/helpers';
import InfiniteScroll from 'react-native-infinite-scroll';
import Spinner from 'react-native-spinkit';

class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notifications:[],
            cleared: 0,
            loading: true,
            refreshing: false,
            username: '',
            has_next_page: true,
            loading_more: false,
            page: 1,
            nots_cnt: 0
        }
        this._onRefresh=this._onRefresh.bind(this);
        this._onLoadMore=this._onLoadMore.bind(this);
    }

    componentWillMount() {
        const {username}=this.props.auth;
        this.setState({username});
        this.props.getNotifications({username,offset:0})
        .then(r=>{
            this.setState({notifications:r.data.notifications});
            this.props.getNotificationsCnt(username)
            .then(r=>{
                this.setState({loading:false,nots_cnt:r.data.nots_cnt});
            })
        });

        this.props.navigation.addListener(
            'willBlur',
            payload => {
                const {cleared}=this.state;
                if(!cleared){
                    this.props.clearNotifications(username)
                    .then(r=>this.setState({cleared:1}))
                }
            }
        );
    }
    componentDidMount(){
        //const {username}=this.props.auth;
        //console.log(username,'---notificaitons did mount')
        //console.log('already mount');
        //this.props.clearNotifications(username)
        //.then(r=>this.setState({cleared:1}));
    }

    _onRefresh=()=> {
        this.setState({refreshing:true});
        const {username}=this.state;
        this.props.getNotifications({username,offset:0})
        .then(r=>{
            this.setState({notifications:r.data.notifications,refreshing: false});
        });
    }

    _onLoadMore=()=>{
        //5 is the limit to show
        if(this.state.has_next_page && this.state.nots_cnt>5){
            const {page,nots_cnt}=this.state;
            let pages=pagination(limit=5,page+1,nots_cnt);
            this.setState({page: page+1,loading_more:true});
            const {username,notifications}=this.state;
            this.props.getNotifications({username,offset:pages.nextOffset})
            .then(r=>{
                let rows=notifications;
                console.log('Notificaitons onLoadMore: ',notifications)
                rows.push.apply(rows,r.data.notifications);
                this.setState({wrides:rows,loading_more: false,has_next_page:pages.hasNextPage});
            });
        }
    }

    empty=(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:'Cochin',fontWeight:'bold'}}>No notifications, yet</Text>
        </View>
    )
    notificationsList=(nots)=>{
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
                {nots.map((r,i)=><Notification not={r} key={i} navigation={this.props.navigation} />)}
            </InfiniteScroll>
        )
    }
    render () {
        const {navigation}=this.props;
        const {notifications,loading}=this.state;
        return(
            <Container>
                <Header style={{backgroundColor:'white'}}>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                </Header>
                {loading?
                    <View style={styles.container}><Spinner style={styles.spinner} isVisible={loading} size={50} type='Arc' color='#757575'/></View>:
                    notifications.length==0?this.empty:this.notificationsList(notifications)
                }
            </Container>
        )
    }
}


let mapStateToProps=state=>{
    return{
        auth:state.auth._55,
        notifications: state.notifications
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

export default connect(mapStateToProps,{getNotifications,clearNotifications,getNotificationsCnt})(Notifications);
