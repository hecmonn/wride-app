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

export function setOwnPostsCnt(data){
    return {
        type:'SET_OWN_POSTS_CNT',
        data
    }
}

export function getOwnPostsCnt(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-own-posts-count',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setOwnPostsCnt(data)))
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

export function setHomePostsCnt(data){
    return {
        type: 'SET_HOME_POSTS_CNT',
        data
    }
}

export function getHomePostsCnt(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-home-posts-count',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setHomePostsCnt(data)))
    }
}
