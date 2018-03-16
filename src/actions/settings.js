
export function setPostSettings(data){
    return {
        type:'SET_SETTINGS',
        data
    }
}

export function postSettings(data){
    return dispatch=>{
        const photoUpload=new FormData();
        photoUpload.append('photo',{
            uri: data.uri,
            type: 'image/jpeg',
            name:' user_profile.'
        });
        return fetch('http://localhost:5005/api/change-settings',{
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'multipart/form-data'
            },
            body: photoUpload
        })
        .then(res=>res.json())
        .then(data=>dispatch(setPostSettings(data)))
    }
}
