//import RNFetchBlob from 'react-native-fetch-blob';
import df from 'dateformat';
export function setPostSettings(data){
    return {
        type:'SET_SETTINGS',
        data
    }
}

export function postSettings(data){
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
        .then(data=>dispatch(setPostSettings(data)))


    }
}
