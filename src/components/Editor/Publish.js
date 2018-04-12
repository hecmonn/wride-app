import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {View,ScrollView,Image} from 'react-native';
import {savePost} from '../../actions/editor';
import {Header,Left,Body,Right,Icon,Button,Text} from 'native-base';
import TagInput from '@cutii/react-native-tag-input';
import ImagePicker from 'react-native-image-picker';

class Publish extends React.Component {
    constructor(props){
        super(props);
        this.state={
            suggestions:[{name:'Art'},{name:'Music'},{name:'Books'}],
            tagsSelected:[],
            emails:[],
            text:'Add a tag',
            uri:null,
            loading:false
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
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    uri: source.uri,
                    loading_image:false
                });
            }
        });
    }

    handleSubmit(draft_p){
		const {title,content,draft_redirector,id,username,tagsSelected}=this.state;
		const draft=draft_p?1:0;
        this.setState({loading:true})
		this.props.savePost({content,title,username,draft,draft_redirector,id,tagsSelected})
        .then(r=>{
            if(r.data.submitted) this.props.navigation.navigate('Root');
        });
	}

    handleDelete = index => {
        let tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({ tagsSelected });
    }
    handleAddition = suggestion => {
        this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
    }
    componentWillMount() {
        const {title,content,draft_p,draft_redirector}=this.props.navigation.state.params;
        this.setState({...this.props.navigation.state.params});
    }

    render () {
        const {navigation}=this.props;
        const {title,uri}=this.state;
        console.log(this.state.tagsSelected)
        return(
            <ScrollView>
                <Header style={{backgroundColor:'white'}}>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" style={{color:'#757575'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text note>Inspire Inspiration</Text>
                    </Body>
                    <Right>
                        <Button transparent small onPress={()=>{{this.handleSubmit(0)}}}>
                            <Text style={{color:'#cfc080',fontWeight:'bold',fontSize:18}}>Post</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={{margin: 15}}>
                    <Text style={{fontSize:22,fontWeight:'bold'}}>{title}</Text>

                    {uri ?
                        <View style={{margin:10}}>
                            <View style={{alignItems:'flex-end'}}><Icon onPress={()=>this.setState({uri:null})} name='ios-close' style={{color:'#757575'}} /></View>
                            <Image source={{uri}} style={{height:150}} />
                        </View> :
                        <Button iconLeft full transparent onPress={()=>this.onImageChange()} style={{marginTop:10,marginBottom:10,backgroundColor:'#757575',}}>
                            <Icon name='ios-camera' style={{color:'white'}} />
                            <Text style={{color:'white'}}>Add an image</Text>
                        </Button>
                    }
                    <Text>Add up to 5 tags to reach readers</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray',marginTop:10,marginBottom:10}}>
                        <TagInput
                            value={this.state.tagsSelected}
                            onChange={(tagsSelected) => this.setState({ tagsSelected })}
                            labelExtractor={(tag) => tag}
                            text={this.state.text}
                            onChangeText={(text) => this.setState({ text })}
                            tagContainerStyle={{backgroundColor:'#757575'}}
                            tagTextStyle={{color:'white'}}
                            inputColor='#606060'
                            maxHeight={300}
                        />
                    </View>
                </View>


            </ScrollView>
        )
    }
}

let mapStateToProps=state=>{
    return{
        editor:state.editor,
        auth:state.auth._55
    }
}

export default connect(mapStateToProps,{savePost})(Publish);
