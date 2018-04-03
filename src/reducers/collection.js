let collection=(state={},action={})=>{
    switch(action.type){
        case 'SET_COLLECTION':
            return action.data;

        case 'SET_COLLECTION_CNT':
            return action.data;

        default: return state;
    }
}

export default collection;
