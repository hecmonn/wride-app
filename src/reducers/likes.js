let likes=(state={},action={})=>{
    switch(action.type){
        case 'SET_LIKES':
            return action.data;

        default: return state;
    }
}

export default likes;
