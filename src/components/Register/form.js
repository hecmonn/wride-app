import t from 'tcomb-form-native';
import React,{PropTypes} from 'react';
import {Platform} from 'react-native';
import {Container,Button,Text} from 'native-base';
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

const registration=t.struct({
    email:t.String,
    username:t.String,
    password:t.String,
    confirm_password:t.String,
    fname:t.String,
    lname:t.String,
})
const registrationOpt={
    fields:{
        fname:{
            label:'First name'
        },
        lname:{
            label:'Last name'
        }
    }
}

class RegistrtionForm extends React.Component {
    handleSubmit(e){
        let value=this._form.getValue();
        console.log('value:',value)
    }
    render () {
        //const {handleSubmit}=this.props;
        return (
            <Container>
                <Form
                    ref={c => this._form = c}
                    type={registration}
                    options={registrationOpt}
                />
                <Button full transparent onPress={this.handleSubmit} style={{borderWidth:1,borderColor:'#a8a8a8'}}>
                    <Text style={{color:'#757575'}}>Register</Text>
                </Button>
            </Container>
        )
    }
}

export default RegistrtionForm;
