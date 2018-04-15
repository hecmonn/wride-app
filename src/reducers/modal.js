let modal=(state={},action={})=>{
    switch(action.type){
        case 'SET_MODAL':
            return action.data;

        default: return state;
    }
}

export default modal;
