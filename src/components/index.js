import {StackNavigator} from 'react-navigation';
import RootNavigator from './RootNavigator';

const MainNavigator=StackNavigator({
    Root: {
        screen: RootNavigator,
        navigationOptions:{
            style:{
                backgroundColor:'blue'
            }
        }
    }
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
