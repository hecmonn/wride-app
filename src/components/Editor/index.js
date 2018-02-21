import React, { PropTypes } from 'react';
import {Header,Left,Right,Body,Content,Text,Container,Button,Icon} from 'native-base';
import EditorForm from './form.js';

class Editor extends React.Component {
	render () {
		const {navigation}=this.props;
		return(
			<Container>
				<Header style={{backgroundColor:'white'}}>
					<Left>
						<Button onPress={()=>{navigation.goBack()}} transparent>
							<Icon name="ios-close" />
						</Button>
					</Left>
					<Body>
						<Text note>Inspire Inspiration</Text>
					</Body>
					<Right>
						<Button small onPress={()=>{navigation.navigate('Submit')}} /*style={{backgroundColor:'white',borderWidth:1,borderColor:'black',borderRadius:5}}*/ transparent>
							<Text style={{color:'#cfc080',fontWeight:'bold'}}>Post</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<EditorForm navigation={navigation}/>
				</Content>
			</Container>
		)
	}
}

export default Editor;
