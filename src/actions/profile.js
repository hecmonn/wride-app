export function setProfile(data){
    return {
        type:'SET_PROFILE',
        data
    }
}

export function getProfile(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-profile',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setProfile(data)))
    }
}

export function setStats(data){
    return {
        type:'SET_STATS',
        data
    }
}

export function getStats(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-stats',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setStats(data)))
    }
}
