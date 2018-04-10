export function setDrafts(data){
    return {
        type:'SET_DRAFTS',
        data
    }
}

export function getDrafts(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-drafts',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setDrafts(data)))
    }
}

export function setDraftsCnt(data){
    return {
        type:'SET_DRAFTS_CNT',
        data
    }
}

export function getDraftsCnt(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-drafts-cnt',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setDraftsCnt(data)))
    }
}
