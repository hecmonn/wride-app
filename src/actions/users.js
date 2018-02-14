export function setSaveUser(data){
    return {
        type:'SET_POST_USER',
        data
    }
}

export function saveUser(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/save-user',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setSaveUser(data)))
    }
}
