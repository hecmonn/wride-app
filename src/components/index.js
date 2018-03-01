import {StackNavigator} from 'react-navigation';
import RootNavigator from './RootNavigator';
import Settings from './Profile/Settings';
import Login from './Login';
import Register from './Register';
import Editor from './Editor';
import Profile from './Profile';
const MainNavigator=StackNavigator({
    Login:{screen:Login},
    Root: {screen: RootNavigator},
    Settings: {screen: Settings},
    Editor: {screen: Editor,mode:'modal'},
    Register:{screen:Register},
    Profile:{screen:Profile},
},{
    initialRouteName: 'Login',
    navigationOptions:{
        header:null
    }
});

export default MainNavigator;
