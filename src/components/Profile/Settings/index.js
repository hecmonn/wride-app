import React, { PropTypes } from 'react'
import {AsyncStorage,Image,View} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Body,Title,Text,Left,Icon,Button,Right,Thumbnail,List,ListItem,Item,Input,Label,CheckBox,Spinner,Toast} from 'native-base';
import {postSettingsImage,postSettings} from '../../../actions/settings';
import {validateAuth,logout} from '../../../actions/auth';
import ImagePicker from 'react-native-image-picker';
import isEmpty from 'is-empty';
import jwt from 'react-native-jwt-io';
import {tokenSecret} from '../../../../config';
import {prettyName} from '../../../../lib/helpers';
import jwtDecode from 'jwt-decode';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content: '',
            checked: false,
            original:{},
            tb_changed:{},
            uri:'',
            loading_image:false,
            changed:{
                private: null,
                username: null,
                bio: null
            }
        }
    }

    onImageChange=(r)=>{
        var options = {
            title: 'Select Image',
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

                const {username}=this.state.original;
                this.setState({loading_image:true})
                this.props.postSettingsImage({uri:source.uri,username})
                .then(r=>{
                    Toast.show({
                        text:'Profile updated succesfully',
                        position:'bottom',
                        buttonText:'Okay'
                    });
                    this.setState({
                        uri: source.uri,
                        loading_image:false
                    });
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
        this.setState({original:{...this.props.auth},tb_changed:{...this.props.auth}});
        console.log('Original settings:',this.props.auth);
    }

    checkChanges=()=>{
        const {original,changed}=this.state;
        let changed_vals={};
        let tb_change={};
        for (key in changed){
            if(changed[key]!==null) changed_vals[key]=changed[key];
        }
        for (ch in changed_vals){
            if (changed_vals[ch]!==original[ch]) tb_change[ch]=changed_vals[ch];
        }
        return tb_change;
    }
    async handleSubmit(e){
        const {uri,original,changed}=this.state;
        let tb_change=this.checkChanges();
        if(!isEmpty(tb_change)){
            this.props.postSettings({changes:tb_change, username:original.username})
            .then(async r=>{
                const {username,email,name,path,bio,private_,fname,lname}=r.data.changed_user[0];
                const new_token=jwt.encode({
                    username,
                    email,
                    name: prettyName(fname,lname),
                    path,
                    bio,
                    private_,
                },tokenSecret.jwtSecret);

                const decodedToken=jwtDecode(new_token);
                await AsyncStorage.removeItem('auth')
                .then(r=>{
                    AsyncStorage.setItem('auth',new_token)
                    .then(this.props.validateAuth(decodedToken))
                    .then(r=>{
                        this.props.navigation.goBack();
                        Toast.show({
                            text:'Settings updated',
                            position:'bottom',
                            buttonText:'Okay'
                        });
                    })
                })
            });
        } else {console.log('nothing to change');}
    }
    render () {
        const {navigation}=this.props;
        const {hideRoll,content,tb_changed,original,loading_image}=this.state;
        let checked_private=tb_changed.private_?true:false;

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
                        <ListItem style={{backgroundColor:'white'}} itemDivider>
                            <Left />
                            <Body>
                                <Button transparent onPress={()=>this.onImageChange()}>
                                    {loading_image?
                                        <View style={{borderRadius:5}}><Spinner /></View>
                                        :<Thumbnail source={{uri:original.path!==null?`http://localhost:5005/${original.path}`:`http://localhost:5005/dummy.png`}} />
                                    }
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem style={{borderBottomWidth:0}}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    value={original.name}
                                    editable={false}
                                />
                            </Item>
                        </ListItem>
                        <ListItem style={{borderBottomWidth:0}}>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input
                                    value={tb_changed.username}
        							onChangeText={(username) => this.setState({changed:{...this.state.changed,username},tb_changed:{...this.state.tb_changed,username}})}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    editable={false}
                                />
                            </Item>
                        </ListItem>
                        <ListItem style={{borderBottomWidth:0}}>
                            <Item floatingLabel>
                                <Label>Bio</Label>
                                <Input
        							style={{fontSize:18}}
        							onChangeText={(bio) => this.setState({changed:{...this.state.changed,bio},tb_changed:{...this.state.tb_changed,bio}})}
        							value={tb_changed.bio}
                                />
                            </Item>
                        </ListItem>
                        <ListItem last>
                            <Button transparent onPress={()=>navigation.navigate('ChangePsswd')}>
                                <Text>Change password</Text>
                            </Button>
                        </ListItem>
                        <ListItem itemHeader first>
                            <Text>PRIVACY</Text>
                        </ListItem>
                        {/*
                            Not gonna deploy privacy feauture yet
                            Working on settings, havent developed hide profile

                        <ListItem style={{backgroundColor:'white'}} itemDivider>
                            <CheckBox checked={checked_private} onPress={()=>this.setState({changed: {...this.state.changed,private_: !checked_private},tb_changed: {...this.state.tb_changed,private_: !checked_private}})} color={'#757575'} />
                            <Body>
                                <Text>Private Account</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Text note>When your account is private only the users you approve to follow you will be able to see the content in your profile.</Text>
                        </ListItem>
                        */}
                        <ListItem last>
                            <Button transparent onPress={()=>navigation.navigate('Blocked',{username:tb_changed.username})}>
                                <Text>Blocked users</Text>
                            </Button>
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
export default connect(mapStateToProps,{logout,postSettings,postSettingsImage,validateAuth})(Settings);
