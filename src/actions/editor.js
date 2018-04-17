import df from 'dateformat';
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

export function setImage(data){
    return{
        type:'SAVE_IMAGE_POST',
        data
    }
}

export function postImage(data){
    let date=df(new Date(),'ddmmyyyy');
    return dispatch=>{
        const photoUpload=new FormData();
        photoUpload.append('photo',{
            uri: data.uri,
            type: 'image/jpeg',
            name: 'wid_'+data.wid+'_'+date+'.jpeg'
        });
        photoUpload.append('wid',data.wid);
        return fetch('http://localhost:5005/api/save-image-post',{
            method: 'post',
            body: photoUpload
        })
        .then(res=>res.json())
        .then(data=>dispatch(setImage(data)))
    }
}
