import React, { PropTypes } from 'react'
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right,Thumbnail,List,ListItem} from 'native-base';
import {postSettings} from '../../../actions/settings';
import {logout} from '../../../actions/auth';
//import RNFetchBlob from 'react-native-fetch-blob'
import CameraRollPicker from 'react-native-camera-roll-picker';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            uri:'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg',
            hideRoll: true
        }
    }
    onImageChange=(r)=>{
        console.log(r,'--image');
        this.setState({uri:r[0].uri,hideRoll:true})
    }
    logout=()=>{
        this.props.logout();
        AsyncStorage.removeItem('auth')
        .then(r=>{
            this.props.navigation.navigate('Login');
        })
        .done();
    }
    handleSubmit(e){
        const {uri}=this.state;
        this.props.postSettings({uri})
        .then(r=>console.log(r));
    }
    render () {
        const {navigation}=this.props;
        const {uri,hideRoll}=this.state;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" style={{color:'#757575'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>this.handleSubmit()}>
                            <Icon name='ios-checkmark' style={{color:'#757575'}} />
                        </Button>
                    </Right>
                </Header>
                <Content style={{backgroundColor:'white'}}>
                    <List>
                        <ListItem itemHeader first>
                            <Text>ACCOUNT</Text>
                        </ListItem>
                        <ListItem>
                            <Button transparent onPress={()=>this.setState({hideRoll:false})}>
                                <Thumbnail source={{uri}} />
                            </Button>
                        </ListItem>
                        <ListItem style={{display:hideRoll?'none':'flex'}}>
                             <CameraRollPicker selectSingleItem={true} callback={(r)=>{this.onImageChange(r)}} />
                        </ListItem>
                        <ListItem>
                            <Text>Horrible Bosses</Text>
                        </ListItem>
                        <ListItem last>
                            <Text>Conjuring</Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text>ACTION</Text>
                        </ListItem>
                        <ListItem>
                            <Button transparent onPress={this.logout}>
                                <Text>Logout</Text>
                            </Button>
                        </ListItem>
                    </List>

                </Content>
            </Container>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth:state.auth._55
    }
}
export default connect(mapStateToProps,{logout,postSettings})(Settings);
