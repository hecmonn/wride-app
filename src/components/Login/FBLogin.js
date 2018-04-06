import React, { PropTypes } from 'react'
import {View} from 'react-native';
import FBSDK,{LoginButton,AccessToken} from 'react-native-fbsdk';

class FBLoginBtn extends React.Component {
    render () {
        return(
            <View>
                <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    alert(data.accessToken.toString())
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => alert("logout.")}/>
            </View>
        )
    }
}

export default FBLoginBtn;
