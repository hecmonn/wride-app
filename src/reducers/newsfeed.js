let newsfeed=(state={},action={})=>{
    switch(action.type){
        case 'SET_OWN_POSTS':
            return action.data;

        case 'SET_HOME_POSTS':
            return action.data;

        case 'SET_HOME_POSTS_CNT':
            return action.data;
        default: return state;
    }
}

export default newsfeed;
