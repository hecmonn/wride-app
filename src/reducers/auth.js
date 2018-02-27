import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';

async function auth(state=[],action={}){
    const r= await AsyncStorage.getItem('auth');
    if(r!==null){
        state={
            ...jwtDecode(r),
            isLogged: true
        }
    } else{
        state={
            isLogged: false
        }
        console.log('no token but trynna')
    }
    switch(action.type){
        case 'SET_LOGIN':
            return{
                ...action.data,
                ...state
            };
        case 'SET_AUTH':
            return state;
        case 'SET_LOGOUT':
            return{
                isLogged:false
            }
        default: return state;
    }
};

export default auth;
