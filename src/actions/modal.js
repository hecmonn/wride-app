export function setModal(data){
    return {
        type:'SET_MODAL',
        data
    }
}

export function getModal(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/get-modal',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setModal(data)))
    }
}
