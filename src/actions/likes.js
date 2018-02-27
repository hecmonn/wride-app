export function setLikes(data){
    return {
        type:'SET_LIKES',
        data
    }
}

export function getLikes(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-likes',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setLikes(data)))
    }
}
