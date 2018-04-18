import React, { PropTypes } from 'react';
import {View} from 'react-native';
import {List,ListItem,Item,Text,Button,Label,Input,Header,Left,Right,Body,Icon,Title} from 'native-base';

class ChangePsswd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            current:null,
            new_p:null,
            confirmation:null
        }
    }
    render () {
        const {current,new_p,confirmation}=this.state;
        const {navigation}=this.props;
        return(
            <View>
                <Header>
                    <Left>
                        <Button onPress={()=>{navigation.goBack()}} transparent>
                            <Icon name="ios-arrow-back" style={{color:'#757575'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Change Password</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>this.handleSubmit()}>
                            <Icon name='ios-checkmark' style={{color:'#757575'}} />
                        </Button>
                    </Right>
                </Header>
                <List>
                    <ListItem>
                        <Item floatingLabel style={{borderBottomWidth:0}}>
                            <Label>Current password</Label>
                            <Input
                                value={current}
                                onChangeText={(current) => this._checkInputs(current,1)}
                                autoCorrect={false}
                                autoCapitalize='none'
                                style={{color:'#eeeeee'}}
                            />
                        </Item>
                    </ListItem>
                    <ListItem>
                        <Item floatingLabel style={{borderBottomWidth:0}}>
                            <Label>New password</Label>
                            <Input
                                value={new_p}
                                onChangeText={(new_p) => this._checkInputs(new_p,2)}
                                autoCorrect={false}
                                autoCapitalize='none'
                                style={{color:'#eeeeee'}}
                                secureTextEntry={true}
                            />
                        </Item>
                    </ListItem>
                    <ListItem>
                        <Item floatingLabel style={{borderBottomWidth:0}}>
                            <Label>Confirm password</Label>
                            <Input
                                value={confirmation}
                                onChangeText={(confirmation) => this._checkInputs(confirmation,3)}
                                autoCorrect={false}
                                autoCapitalize='none'
                                style={{color:'#eeeeee'}}
                                secureTextEntry={true}
                            />
                        </Item>
                    </ListItem>
                </List>
            </View>
        )
    }
}

export default ChangePsswd;
