import React, { PropTypes } from 'react'
import {Content,Left,Right,Body,Title,Thumbnail,Text,H1,Button,Icon} from 'native-base';
import {Grid,Col,Row} from 'react-native-easy-grid';

class Who extends React.Component {
    render () {
        const {navigation}=this.props;
        return(
            <Content style={{padding:10,backgroundColor:'yellow'}}>
                <Grid>
                    <Row style={{height:100}}>
                        <Col size={1}>
                            <Thumbnail large source={{uri: 'http://www.ri-ipl.org/wp-content/uploads/2016/10/dummyUser-270x270.jpg'}} />
                        </Col>
                        <Col size={3}>
                            <H1>Héctor Monárrez</H1>
                            <Text>A fool who plays it cool</Text>
                            <Text>@hecmonn</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} />
                        <Col size={1}>
                            <Button small light onPress={()=>navigation.navigate('Settings')}><Text style={{color:'black', fontWeight:'bold'}}>Edit Profile</Text></Button>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        )
    }
}

export default Who;
