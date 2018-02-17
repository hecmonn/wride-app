import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';


/*try{
    AsyncStorage.getItem('auth')
    .then(r=>{
        if(r!==null){
            const decodedToken=jwtDecode(r);
            defaultState={
                ...decodedToken
            }
            console.log(decodedToken,'----from auth reducers')
        } else{
            defaultState={
                isLogged: false,
                username: '',
                password: ''
            }
            console.log('no token from reducers')
        }
    })
    .done();

} catch(e){
    console.log(e);
}*/

async function auth(state=[],action={}){
    const r= await AsyncStorage.getItem('auth');
    if(r!==null){
        state={
            ...jwtDecode(r),
            isLogged:true
        }
    } else{
        state={
            isLogged: false
        }
        console.log('no token but trynna')
    }
    switch(action.type){
        case 'SET_LOGIN':
            return {
                ...action.data
            };
        case 'SET_AUTH':
            console.log(action.data,'----from auth reducer')
            return {
                isLogged:true,
                ...action.data
            }
        case 'SET_LOGOUT':
            return{
                isLogged:false
            }
        default: return state;
    }
};



export default auth;
