let fb=(state={},action={})=>{
    switch(action.type){
        case 'SET_USER_INFO':
            return action.data;

        default: return state;
    }
}

export default fb;
