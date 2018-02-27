export function setNotifications(data){
    return {
        type:'SET_NOTIFICATIONS',
        data
    }
}

export function getNotifications(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-notifications',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setNotifications(data)))
    }
}
