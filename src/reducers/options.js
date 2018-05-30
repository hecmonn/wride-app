let options= (state=[],action={})=>{
    switch(action.type){
        case 'SET_BLOCK':
            return action.data;

        case 'SET_DELETE':
            return action.data;
        default: return state;
    }
}

export default options;
