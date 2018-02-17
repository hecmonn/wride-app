export function setPost(data){
    return {
        type:'SET_POST',
        data
    }
}

export function savePost(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/save-post',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setPost(data)))
    }
}
