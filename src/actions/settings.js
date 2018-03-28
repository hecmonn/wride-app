import df from 'dateformat';
export function setPostSettingsImage(data){
    return {
        type:'SET_SETTINGS',
        data
    }
}

export function postSettingsImage(data){
    console.log(data,'---from settings actions');
    let date=df(new Date(),'ddmmyyyy');
    return dispatch=>{
        const photoUpload=new FormData();
        photoUpload.append('photo',{
            uri: data.uri,
            type: 'image/jpeg',
            name: data.username+'_'+date+'.jpeg'
        });
        photoUpload.append('username',data.username);
        return fetch('http://localhost:5005/api/upload-avatar',{
            method: 'post',
            body: photoUpload
        })
        .then(res=>res.json())
        .then(data=>dispatch(setPostSettingsImage(data)))


    }
}

export function setPostSettings(data){
    return {
        type:'SET_SETTINGS_INFO',
        data
    }
}

export function postSettings(data){
    return dispatch=>{
        return fetch('http://localhost:5005/api/change-settings',{
            method:'post',
            body:JSON.stringify({data}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(setPostSettings(data)))
    }
}
