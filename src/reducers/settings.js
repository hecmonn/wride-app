let search= (state=[],action={})=>{
    switch(action.type){
        case 'SET_SETTINGS':
            return action.data;
        case 'SET_SETTINGS_INFO':
            return action.data;
        default: return state;
    }
}

export default search;
