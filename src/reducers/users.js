const defaultState={
    name:'',
    last_name:'',
    psswd:'',
    email:'',
    username:''
};

let users= (state=defaultState,action={})=>{
    switch(action.type){
        case 'SET_SAVE_USER':
            return {
                ...action.payload
            };
        default: return state;
    }
}

export default users;
