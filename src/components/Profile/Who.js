import React, { PropTypes } from 'react'
import {Content,Left,Right,Body,Title,Thumbnail,Text,H1,Button,Icon,Container} from 'native-base';
import {Grid,Col,Row} from 'react-native-easy-grid';
import ImageModal from 'react-native-image-view';
import FollowerBtn from './Followers/FollowerBtn';

class Who extends React.Component {
    constructor(props){
        super(props);
        this.state={
            following: this.props.following,
            followLabel: this.props.following?'Following':'Follow',
            unFollowLoading:false,
            image_modal_visible: false,
            path: ''
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.following!==this.props.following){
            this.setState({following:nextProps.following,followLabel:nextProps.following?'Following':'Follow'});
        }
    }
    render () {
        const {navigation,ownProfile,following}=this.props;
        const {name,username,bio,path}=this.props.person;
        const {followLabel,unFollowLoading}=this.state
        let uri=`http://localhost:5005/${this.state.path}`;

        const images=[{source:{uri:`http://localhost:5005/${this.state.path}`}}];
        return(
            <Content style={{padding:10,backgroundColor:'white'}}>
                <ImageModal
                    images={[{source:{uri:`http://localhost:5005/${path}`}}]}
                    imageIndex={0}
                    isVisible={this.state.image_modal_visible}
                />
                <Grid>
                    <Row>
                        <Col size={1}>
                            <Button transparent onPress={()=>this.setState({image_modal_visible:true})}>
                                <Thumbnail style={{borderWidth:1,borderColor: '#969696',marginTop: 15}} large source={{uri: path!==null? `http://localhost:5005/${path}`:'http://localhost:5005/dummy.png'}} />
                            </Button>
                        </Col>
                        <Col size={3}>
                            <H1>{name}</H1>
                            <Text note>{username}</Text>
                            {bio&& <Text style={{fontSize: 13, paddingTop: 2, paddingBottom: 2}}>{bio}</Text> }
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} />
                        <Col size={1}>
                            <FollowerBtn ownProfile={ownProfile} following={this.state.following} navigation={navigation} users={{username:this.props.username,username_param:this.props.person.username}} getUnFollow={this.props.getUnFollow}/>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        )
    }
}

export default Who;
