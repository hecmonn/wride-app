let notifications=(state={},action={})=>{
    switch(action.type){
        case 'SET_NOTIFICATIONS':
            return action.data;

        case 'SET_UNREAD_NOTIFICATIONS':
            return action.data;


        default: return state;
    }
}

export default notifications;
