let search= (state=[],action={})=>{
    switch(action.type){
        case 'SET_SEARCH':
            return action.data;

        case 'SET_INSPIRATION':
            return action.data;

        case 'SET_INSPIRATION_CNT':
            return action.data;
        default: return state;
    }
}

export default search;
