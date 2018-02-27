let followers=(state={},action={})=>{
    switch(action.type){
        case 'SET_FOLLOWERS':
            return action.data;

        default: return state;
    }
}

export default followers;
