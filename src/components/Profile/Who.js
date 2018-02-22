import React, { PropTypes } from 'react'
import {Content,Left,Right,Body,Title,Thumbnail,Text,H1,Button,Icon,Container} from 'native-base';
import {Grid,Col,Row} from 'react-native-easy-grid';

class Who extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render () {
        const {navigation}=this.props;
        //console.log(this.props.person,'---who profile');
        const {name,username,bio}=this.props.person;
        return(
            <Content style={{padding:10,backgroundColor:'white'}}>
                <Grid>
                    <Row>
                        <Col size={1}>
                            <Thumbnail large source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
                        </Col>
                        <Col size={3}>
                            <H1>{name}</H1>
                            {bio&&<Text>{bio}</Text>}
                            <Text note>{username}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} />
                        <Col size={1}>
                            <Button small style={{backgroundColor:'white',borderColor: '#181818',borderWidth:1,borderRadius:5}} onPress={()=>navigation.navigate('Settings')}><Text style={{color:'black', fontWeight:'bold'}}>Edit Profile</Text></Button>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        )
    }
}

export default Who;
