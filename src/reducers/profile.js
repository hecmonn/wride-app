const defaultState={
    name:'',
    email:'',
    username:'',
    likes:0,
    posts:0,
    followers:0
};

let profile= (state=defaultState,action={})=>{
    switch(action.type){
        case 'SET_PROFILE':
            return action.data;
        case 'SET_STATS':
            return action.data;
        default: return state;
    }
}

export default profile;
