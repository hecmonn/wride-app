let drafts=(state={},action={})=>{
    switch(action.type){
        case 'SET_DRAFTS':
            return action.data;
        case 'SET_DRAFTS_CNT':
            return action.data;

        default: return state;
    }
}

export default drafts;
