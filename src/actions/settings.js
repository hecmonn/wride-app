import RNFetchBlob from 'react-native-fetch-blob';

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
            name:'avatar',
        });
        //console.log(photoUpload,'---photoUpload')
        return fetch('http://localhost:5005/api/change-settings',{
            method: 'post',
            body: photoUpload
        })
        .then(res=>res.json())
        .then(data=>dispatch(setPostSettings(data)))

        /*RNFetchBlob.fetch('POST', 'http://localhost:5005/api/change-settings', {
            Authorization: 'Bearer access-token',
            otherHeader: 'foo',
            'Content-Type' : 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { name : 'avatar', filename : 'avatar.png', data: data.uri},
            // custom content type
            //{ name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
            // part file from storage
            //{ name : 'avatar-foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path_to_a_file)},
        ]).then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.error('Error uploading photo: ',resp);
        })*/
    }
}
