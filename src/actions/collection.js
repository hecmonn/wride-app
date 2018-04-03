export function setCollection(data){
    return {
        type:'SET_COLLECTION',
        data
    }
}

export function getCollection(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-collection',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setCollection(data)))
    }
}

export function setCollectionCnt(data){
    return {
        type:'SET_COLLECTION_CNT',
        data
    }
}

export function getCollectionCnt(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-collection-cnt',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setCollectionCnt(data)))
    }
}
