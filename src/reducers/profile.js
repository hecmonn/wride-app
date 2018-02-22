const defaultState={
    name:'',
    email:'',
    username:''
};

let profile= (state=defaultState,action={})=>{
    switch(action.type){
        case 'SET_PROFILE':
            return action.data;
        default: return state;
    }
}

export default profile;
