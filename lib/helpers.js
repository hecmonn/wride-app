import elapsed from 'elapsed';
import dt from 'dateformat';

export function prettyName(fname,lname){
    let capFname=fname.charAt(0).toUpperCase() + fname.slice(1);
    let capLname=lname.charAt(0).toUpperCase() + lname.slice(1);
    let fullName=`${capFname} ${capLname}`;
    return fullName;
}

export function elapsedTime(cd){
    let elapsedTime= new elapsed(new Date(cd),new Date());
    return elapsedTime.optimal;
}
