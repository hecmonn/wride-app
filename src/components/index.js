import {StackNavigator} from 'react-navigation';
import RootNavigator from './RootNavigator';
import Settings from './Profile/Settings';
import Login from './Login';
import Register from './Register';
import Editor from './Editor';

const MainNavigator=StackNavigator({
    Login:{screen:Login},
    Root: {screen: RootNavigator},
    Settings: {screen: Settings},
    Editor: {screen: Editor},
    Register:{screen:Register}
},{
    initialRouteName: 'Login',
    navigationOptions:{
        header:null,
        style:{
            backgroundColor: 'white'
        },
        cardStyle:{
            backgroundColor: 'yellow'
        },
        backgroundColor: 'blue'
    }
});

export default MainNavigator;
