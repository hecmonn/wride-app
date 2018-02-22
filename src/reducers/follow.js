let follow=(state={},action={})=>{
    switch(action.type){
        case 'SET_FOLLOWING':
            return action.data;

        case 'SET_UN_FOLLOW':
            return action.data;
            
        default: return state;
    }
}

export default follow;
