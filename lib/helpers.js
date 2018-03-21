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

export function pagination(limit,page=1,cnt=0){
    let total_pages=cnt/limit;
    let nextOffset=(page-1)*limit;
    //let next_batch=(page+1)*limit;
    let hasNextPage=page>=total_pages;
    return {nextOffset,hasNextPage:!hasNextPage};
}
