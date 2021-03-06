import {StackNavigator,SwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import RootNavigator from './RootNavigator';
import Settings from './Profile/Settings';
import Login from './Login';
import Register from './Register';
import Editor from './Editor';
import Profile from './Profile';
import Post from './Post';
import Drafts from './Drafts';
import Collection from './Collection';
import AuthLoadingScreen from  './AuthLoadingScreen';
import Publish from './Editor/Publish';
import ChangePsswd from './Profile/Settings/ChangePsswd';
import Blocked from './Profile/Settings/Blocked';

const AppStack=StackNavigator({
    Root: {screen: RootNavigator},
    Settings: {screen: Settings},
    Editor: {screen: Editor,mode:'modal'},
    Publish: {screen: Publish,mode:'modal'},
    Profile:{screen:Profile},
    Post:{screen:Post},
    Drafts:{screen:Drafts},
    ChangePsswd:{screen:ChangePsswd},
    Blocked:{screen:Blocked},
    Collection:{screen:Collection},
},{
    initialRouteName: 'Root',
    navigationOptions:{
        header:null
    }
});

const AuthStack=StackNavigator({
    Login:{screen:Login},
    Register:{screen:Register},

},{
    initialRouteName: 'Login',
    navigationOptions:{
        header:null
    }
});

const MainNavigator=SwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
},{
    initialRouteName:'AuthLoading'
})

let mapStateToProps=state=>{
    return{
        auth:state.auth._55
    }
}


export default MainNavigator;
