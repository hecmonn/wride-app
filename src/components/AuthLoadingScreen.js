import React, { PropTypes } from 'react'
import {ActivityIndicator,AsyncStorage,StatusBar,StyleSheet,View} from 'react-native';

class AuthLoading extends React.Component {
    constructor(props){
        super(props);
        this._authAsync();
    }
    _authAsync=async()=>{
        const user_token=await AsyncStorage.getItem('auth');
        this.props.navigation.navigate(user_token?'App':'Auth');
    }
    render () {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default AuthLoading;
