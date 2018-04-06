//import {isEmpty} from 'validator';
import isEmpty from 'is-empty'

export function loginValidator(data){
    const {username,password}=data;
    let errors={valid:false}
    if(isEmpty(username)){
        errors={username:{empty:true},valid:false}
    } else if (isEmpty(password)){
        errors={password:{empty:true},valid:false}
    } else {
        errors={valid:true}
    }
    return errors;
}
