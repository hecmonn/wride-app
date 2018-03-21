import React, { PropTypes } from 'react'
import {AsyncStorage,Image} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right,Thumbnail,List,ListItem,Item,Input,Label,CheckBox} from 'native-base';
import {postSettings} from '../../../actions/settings';
import {logout} from '../../../actions/auth';
import RNFetchBlob from 'react-native-fetch-blob';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-picker';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            uri:'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg',
            hideRoll: true,
            content: '',
            checked: false,
            username: ''
        }
    }
    onImageChange=(r)=>{
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            quality: 0.7,
            allowsEditing: true
        };

        /**
        * The first arg is the options object for customization (it can also be null or omitted for default options),
        * The second arg is the callback which sends object: response (more info below in README)
        */
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    uri: source.uri
                });

            }
        });
    }
    logout=()=>{
        this.props.logout();
        AsyncStorage.removeItem('auth')
        .then(r=>{
            this.props.navigation.navigate('Login');
        })
        .done();
    }
    componentWillMount() {
        this.setState({username:this.props.auth.username});
    }
    handleSubmit(e){
        const {uri,username}=this.state;
        //const {username}=this.props.auth;
        console.log(username,'---from settings')
        this.props.postSettings({uri,username})
        .then(r=>console.log(r));
    }
    render () {
        const {navigation}=this.props;
        const {uri,hideRoll,content,checked}=this.state;
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
                            <Left />
                            <Body>
                                <Button rounded onPress={()=>this.onImageChange()}>
                                    <Thumbnail source={{uri}} />
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem style={{display:hideRoll?'none':'flex'}}>
                            <Text note>holder</Text>
                        </ListItem>
                        <ListItem>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    value='Hector Monarrez'
                                />
                            </Item>
                        </ListItem>
                        <ListItem>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input
                                    value='hecmonn'
                                />
                            </Item>
                        </ListItem>
                        <ListItem>
                            <Item floatingLabel>
                                <Label>Bio</Label>
                                <Input
        							style={{fontSize:18}}
        							onChangeText={(content) => this.setState({content})}
        							value={'A fool who plays it cool'}
                                />
                            </Item>
                        </ListItem>
                        <ListItem last>
                            <Button transparent onPress={this.logout}>
                                <Text>Change password</Text>
                            </Button>
                        </ListItem>
                        <ListItem itemHeader first>
                            <Text>PRIVACY</Text>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={checked} onPress={()=>this.setState({checked:!checked})} color={'#757575'} />
                            <Body>
                                <Text>Private Account</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Text note>When your account is private only the users you approve to follow you will be able to see the content in your profile.</Text>
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
