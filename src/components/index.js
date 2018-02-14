import {StackNavigator} from 'react-navigation';
import RootNavigator from './RootNavigator';
import Settings from './Profile/Settings';
import Login from './Login';
import Register from './Register';
import Editor from './Editor';

const logged=0;
const MainNavigator=StackNavigator({
    Login:{screen:Login},
    Root: {
        screen: RootNavigator,
        navigationOptions:{
            style:{
                backgroundColor:'blue'
            }
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions:{
            style:{
                backgroundColor:'blue'
            }
        }
    },
    Editor: {
        screen: Editor,
        navigationOptions:{
            style:{
                backgroundColor:'blue'
            }
        }
    },
    Register:{screen:Register}
},{
    initialRouteName:logged?'Root':'Login',
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
