export function setSearch(data){
    return {
        type:'SET_SEARCH',
        data
    }
}

export function getSearch(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-search',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setSearch(data)))
    }
}
