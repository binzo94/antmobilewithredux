/*
  description:用于异步请求
  param:url:表示请求的地址
  param:body:表示请求内容
  param:method:请求类型 get post
*/


export const fetchAsyncPost=(url,body,contentType)=>{
    //console.log('========localStorage========',localStorage);
    //console.log("==============请求后台方法")
    return fetch(url,{
        method:'POST',
        credentials: 'include',
        headers:{
           "Content-Type": "application/x-www-form-urlencoded"
        },
        mode:'cors',
        body:body
      });
}

export const fetchAsyncPostNoCore=(url,body,contentType)=>{
   // console.log("==============请求后台方法")
    return fetch(url,{
        method:'POST',
        credentials:"include",
        headers:{
           "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        mode:'no-cors',
        body:body
      });
}

export const fetchAsyncGet=(url,body,contentType)=>{
  //console.log('========localStorage========',localStorage);
    //console.log("==============请求后台方法")
    return fetch(url+'?'+body,{
        method:'GET',
        credentials:"include",
        headers:{
           "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        mode:'cors'
      });
}

export const fetchAsyncGetNoCore=(url,body,contentType)=>{
 // console.log('========localStorage========',localStorage);
   // console.log("==============请求后台方法")
    return fetch(url+'?'+body,{
        method: "GET",
        mode: "no-cors",
        credentials: 'include',
        headers:{
           "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      });
}

/*
 * 同步setState
 */
export const setStateAsync = (state)=>{
  return new Promise((res)=>{
    this.setState(state);
  });
}
