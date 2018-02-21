import t from 'tcomb-form-native';
import React,{PropTypes} from 'react';
import {Platform} from 'react-native';
import {Container,Button,Text} from 'native-base';
import {connect} from 'react-redux';
import {savePost} from '../../actions/editor';
const Form=t.form.Form;

Form.stylesheet.textbox.normal={
    color: 'black',
    fontSize: 17,
    height: 36,
    paddingVertical: Platform.OS === "ios" ? 7 : 0,
    paddingHorizontal: 7,
    borderBottomColor: '#a8a8a8',
    borderBottomWidth: 1,
    marginBottom: 5
}
Form.stylesheet.textbox.error= {
      color: 'black',
      fontSize: '17',
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderBottomColor: 'red',
      borderBottomWidth: 1,
      marginBottom: 5
}

const editor=t.struct({
    title:t.String,
    content:t.String
})
const editorOpt={
    fields:{
        Content:{
            label:null
        }
    }
}
class EditorForm extends React.Component {
    constructor(props){
        super(props);
        this.state={}
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit=(e)=>{
        let content=this._form.getValue();
        const {username}=this.props.auth;
        console.log(content);
        this.props.savePost({...content,username})
        .then(r=>{
            console.log(this.props,'---entering post');
            if(r.data.submitted) this.props.navigation.navigate('Root');
        });
    }
    render () {
        //const {handleSubmit}=this.props;
        return (
            <Container>
                <Form
                    ref={c=>this._form=c}
                    type={editor}
                    options={editorOpt}
                />
                <Button full transparent onPress={this.handleSubmit} style={{borderWidth:1,borderColor:'#a8a8a8'}}>
                    <Text style={{color:'#757575'}}>Post</Text>
                </Button>
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
export default connect(mapStateToProps,{savePost})(EditorForm);
