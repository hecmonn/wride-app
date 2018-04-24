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

export function setInspiration(data){
    return {
        type:'SET_INSPIRATION',
        data
    }
}

export function getInspiration(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-inspiration',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setInspiration(data)))
    }
}

export function setInspirationCnt(data){
    return {
        type:'SET_INSPIRATION_CNT',
        data
    }
}

export function getInspirationCnt(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-inspiration-cnt',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setInspirationCnt(data)))
    }
}
