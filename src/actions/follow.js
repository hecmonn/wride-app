export function setFollowing(data){
    return {
        type:'SET_FOLLOWING',
        data
    }
}

export function getFollowing(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/following',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setFollowing(data)))
    }
}

export function setUnFollow(data){
    return {
        type:'SET_UN_FOLLOW',
        data
    }
}

export function getUnFollow(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/un-follow',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setUnFollow(data)))
    }
}

export function setFollowers(data){
    return {
        type:'SET_FOLLOWERS',
        data
    }
}

export function getFollowers(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-followers',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setFollowers(data)))
    }
}
