export function setBlock(data){
    return {
        type:'SET_BLOCK',
        data
    }
}

export function blockUser(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/block-user',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setBlock(data)))
    }
}

export function setDelete(data){
    return {
        type:'SET_DELETE',
        data
    }
}

export function deletePost(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/delete-post',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setDelete(data)))
    }
}

export function setReport(data){
    return {
        type:'SET_REPORT',
        data
    }
}

export function reportPost(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/report-post',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setReport(data)))
    }
}

export function setBlocked(data){
    return {
        type:'SET_BLOCKED',
        data
    }
}

export function getBlocked(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-blocked',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setBlocked(data)))
    }
}

export function setUnblock(data){
    return {
        type:'SET_UNBLOCK',
        data
    }
}

export function unblock(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/unblock',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setUnblock(data)))
    }
}
