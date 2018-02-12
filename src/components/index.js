import {StackNavigator} from 'react-navigation';
import RootNavigator from './RootNavigator';
import Settings from './Profile/Settings';

const MainNavigator=StackNavigator({
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

},{
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
