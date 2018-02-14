const defaultState={
    isLogged: false,
    username: '',
    password: ''
};

let auth = (state=defaultState,action={})=>{
    switch(action.type){
        case 'LOGIN':
            return Object.assing({},state,{
                isLogged: true,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assing({},state,{
                isLogged:false,
                username:'',
                password:''
            });
        default: return state;
    }
};

export default auth;
