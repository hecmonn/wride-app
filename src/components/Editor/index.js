import React, { PropTypes } from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {Header,Left,Right,Body,Content,Text,Container,Button,Icon,Input,Item} from 'native-base';
import EditorForm from './form.js';
import {savePost} from '../../actions/editor';
import isEmpty from 'is-empty';

class Editor extends React.Component {
	constructor(props){
		super(props);
		this.state={
			title:'',
			content:''
		}
	}
	handleSubmit(e){
		const {title,content}=this.state;
		const {username}=this.props.auth;
		this.props.savePost({content,title,username})
        .then(r=>{
            if(r.data.submitted) this.props.navigation.navigate('Root');
        });
	}

	checkDraft(){
		if(!isEmpty(this.state.content)||!isEmpty(this.state.title)){
			Alert.alert(
				'Changes not saved',
				'Do you want to save changes first?',
				[
					{text:'Cancel',onPress:()=>this.props.navigation.goBack(),style:'cancel'},
					{text:'Yes',onPress:()=>console.log('please save'),style:'OK Pressed'},
				],
				{cancelable: false}
			)
		} else {
			this.props.navigation.goBack();
		}
	}
	render () {
		const {navigation}=this.props;
		const {title,content}=this.state;
		return(
			<Container style={{backgroundColor:'white'}}>
				<Header style={{backgroundColor:'white'}}>
					<Left>
						<Button onPress={()=>{this.checkDraft()}} transparent>
							<Icon name="ios-close" style={{color:'#757575'}}/>
						</Button>
					</Left>
					<Body>
						<Text note>Inspire Inspiration</Text>
					</Body>
					<Right>
						<Button transparent small onPress={()=>{{this.handleSubmit()}}}>
							<Text style={{color:'#cfc080',fontWeight:'bold',fontSize:18}}>Post</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<Item>
						<Input
							style={{fontWeight:'bold',fontSize:23}}
							onChangeText={(title) => this.setState({title})}
							placeholder="Title"
							value={title}
						/>
					</Item>
					<Item style={{borderWidth:0}}>
						<Input
							style={{fontSize:23}}
							multiline={true}
							onChangeText={(content) => this.setState({content})}
							value={content}
							placeholder="So, what happened?" />
					</Item>
				</Content>
			</Container>
		)
	}
}

let mapStateToProps=state=>{
    return{
        editor:state.editor,
        auth:state.auth._55
    }
}
export default connect(mapStateToProps,{savePost})(Editor);
