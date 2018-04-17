import React, { PropTypes } from 'react';
import {ScrollView,Alert,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Header,Left,Right,Body,Content,Text,Container,Button,Icon,Input,Item,Toast} from 'native-base';
import {savePost} from '../../actions/editor';
import isEmpty from 'is-empty';

class Editor extends React.Component {
	constructor(props){
		super(props);
		this.state={
			title: null,
			content: null,
			draft_redirector: 0,
			id: null
		}
	}
	handleSubmit(draft_p){
		const {title,content,draft_redirector,id}=this.state;
		const {username}=this.props.auth;
		if(isEmpty(title) || isEmpty(content)){
			Toast.show({
				text: "Untitled is not too attractive",
				buttonText: "Okay",
				type:'danger',
				duration: 3000
			})
		} else {
			this.props.navigation.navigate('Publish',{title,content,draft_redirector,id,draft_p,username});
		}
	}

	saveDraft(draft_p){
		const {title,content,draft_redirector,id}=this.state;
		const {username}=this.props.auth;
		const draft=draft_p?1:0;
		this.props.savePost({content,title,username,draft,draft_redirector,id})
		.then(r=>{
			if(r.data.submitted) this.props.navigation.navigate('Root');
		});
	}

	checkDraft(){
		if(!isEmpty(this.state.content)||!isEmpty(this.state.title)){
			Alert.alert(
				'Changes not saved',
				'Do you want to save on drafts?',
				[
					{text:'Yes',onPress:()=>this.saveDraft(1),style:'OK Pressed'},
					{text:'No',onPress:()=>this.props.navigation.goBack()},
					{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				],
				{cancelable: false}
			)
		} else {
			this.props.navigation.goBack();
		}
	}
	componentWillMount() {
		if(typeof this.props.navigation.state.params!=='undefined'){
			const {title,content,id}=this.props.navigation.state.params;
			this.setState({title,content,draft_redirector:1,id});
		}
	}
	render () {
		const {navigation}=this.props;
		const {title,content}=this.state;
		return(
			<ScrollView style={{backgroundColor:'white'}} >
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
						<Button transparent small onPress={()=>{{this.handleSubmit(0)}}}>
							<Text style={{color:'#cfc080',fontWeight:'bold',fontSize:18}}>Post</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<Item>
						<Input
							style={{fontWeight:'bold',fontSize:24}}
							onChangeText={(title) => this.setState({title})}
							placeholder="Title"
							value={title}
						/>
					</Item>
					<Item>
						<Input
							style={{fontSize:24,padding: 5}}
							multiline={true}
							onChangeText={(content) => this.setState({content})}
							value={content}
							placeholder="So, what happened?" />
					</Item>
				</Content>
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
export default connect(mapStateToProps,{savePost})(Editor);
