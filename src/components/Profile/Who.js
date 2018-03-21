import React, { PropTypes } from 'react'
import {Content,Left,Right,Body,Title,Thumbnail,Text,H1,Button,Icon,Container} from 'native-base';
import {Grid,Col,Row} from 'react-native-easy-grid';
import ImageModal from 'react-native-image-view';

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

    unFollow=()=>{
        const {username}=this.props;
        const {following}=this.state;

        const username_param=this.props.person.username;
        this.setState({unFollowLoading:true})
        this.props.getUnFollow({username,username_param,following})
        .then(r=>{
            this.setState({followLabel:r.data.action,unFollowLoading:false,following:r.data.following});
        })
    }

    followerBtn=()=>{
        const {following,followLabel,unFollowLoading}=this.state;
        return(
            <Button small style={{backgroundColor:'white',borderColor:following?'#000aff':'#757575',borderWidth:1,borderRadius:5}} onPress={()=>this.unFollow()}>
                <Text style={{color:following?'#000aff':'#757575', fontWeight:'bold'}}>{unFollowLoading?'loading...':followLabel}</Text>
            </Button>
        )
    }
    editBtn=(
        <Button small
            style={{backgroundColor:'white',borderColor: '#181818',borderWidth:1,borderRadius:5}}
            onPress={()=>this.props.navigation.navigate('Settings')}>
                <Text style={{color:'black', fontWeight:'bold'}}>Edit Profile</Text>
        </Button>
    )

    componentWillReceiveProps(nextProps){
        if(nextProps.following!==this.props.following){
            this.setState({following:nextProps.following,followLabel:nextProps.following?'Following':'Follow'});
        }
    }
    render () {
        const {navigation,ownProfile,following}=this.props;
        const {name,username,bio,path}=this.props.person;
        let uri=`http://localhost:5005/${this.state.path}`;

        const images=[{source:{uri:`http://localhost:5005/${this.state.path}`}}];
        console.log(images[0].source.uri,'---image uri')
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
                                <Thumbnail style={{borderWidth:1,borderColor: '#969696',marginTop: 15}} large source={{uri: path!==null? `http://localhost:5005/${path}`:'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png'}} />
                            </Button>
                        </Col>
                        <Col size={3}>
                            <H1>{name}</H1>
                            <Text note>{username}</Text>
                            {bio&& <Text>{bio}</Text> }
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} />
                        <Col size={1}>
                            {ownProfile?this.editBtn: this.followerBtn()}
                        </Col>
                    </Row>
                </Grid>
            </Content>
        )
    }
}

export default Who;
