let dummy = (state=[],action={})=>{
    switch(action.type){
        case 'SET_TOURS':
            return action.data;
        default: return state;

    }
}

export default dummy;
