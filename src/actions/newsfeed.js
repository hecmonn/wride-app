export function setOwnPosts(data){
    return {
        type:'SET_OWN_POSTS',
        data
    }
}

export function getOwnPosts(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-own-posts',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setOwnPosts(data)))
    }
}

export function setHomePosts(data){
    return {
        type: 'SET_HOME_POSTS',
        data
    }
}

export function getHomePosts(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-home-posts',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setHomePosts(data)))
    }
}

export function setAction(data){
    return {
        type: 'SET_ACTION',
        data
    }
}

export function postAction(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/post-action',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setAction(data)))
    }
}
