import React, { PropTypes } from 'react'
import {View} from 'react-native';
import {Container,Text,H1,Button} from 'native-base';
class SideBar extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Container style={{backgroundColor:'white'}}>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Button transparent onPress={()=>navigation.navigate('Drafts')}>
                        <Text style={{color:'#757575'}} >Drafts</Text>
                    </Button>
                    <Button transparent onPress={()=>navigation.navigate('Collection')}>
                        <Text style={{color:'#757575'}}>Collection</Text>
                    </Button>
                    <Button transparent onPress={()=>navigation.navigate('x')}>
                        <Text style={{color:'#757575'}}>Interests</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

export default SideBar;
