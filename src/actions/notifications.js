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

export function setUnreadNotifications(data){
    return {
        type:'SET_UNREAD_NOTIFICATIONS',
        data
    }
}

export function getUnreadNotifications(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-unread-notifications',{
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

export function setClearNotifications(data){
    return {
        type:'SET_NOTIFICATIONS',
        data
    }
}

export function clearNotifications(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/clear-notifications',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setClearNotifications(data)))
    }
}
