const defaultState={
    post:'',
    title:''
};

let editor= (state=defaultState,action={})=>{
    switch(action.type){
        case 'SET_POST':
            return {
                ...action.payload
            };
        default: return state;
    }
}

export default editor;
