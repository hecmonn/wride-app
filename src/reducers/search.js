let search= (state=[],action={})=>{
    switch(action.type){
        case 'SET_SEARCH':
            return action.data;
        default: return state;
    }
}

export default search;
