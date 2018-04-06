export function setUserInfo(data){
    return {
        type:'GET_USER_INFO',
        data
    }
}

export function getUserInfo(data){
    console.log(data);
    const {fbLink}=data
    return dispatch=>{
        return fetch(fbLink)
        .then(res=>res.json())
        .then(data=>dispatch(setUserInfo(data)))
    }
}
