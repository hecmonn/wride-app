export function setLogin(data){
    return {
        type:'SET_LOGIN',
        data
    }
}

export function login(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/login',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setLogin(data)))
    }
}

export function setLogout(){
    return{
        type:'SET_LOGOUT'
    }
}
export function logout(){
    return dispatch=>{dispatch(setLogout())}
}

export function setAuth(data){
    return {
        type:'SET_AUTH',
        data
    }
}

export function validateAuth(data){
    return dispatch=>{
        dispatch(setAuth(data));
    }
}
