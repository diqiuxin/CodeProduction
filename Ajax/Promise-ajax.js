// Promise-ajax v3.0

// Promise 中的 .then() 简单实例
function xxx(){
  return new Promise(function(resolve , reject){});
}
xxx.then(success , error);

// 使用 Promise 封装的 ajax
window.jQuery.ajax = function({url,method,headers,body,successFn,errorFn}){
  return new Promise(function(resolve , reject){  //用于返回一个 Promise 对象
    let xhr = new XMLHttpRequest();
    xhr.open(method,url);
    for(let key in headers){
      xhr.setRequestHeader(key,headers[key]);
    }
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status <= 300){
          resolve(JSON.parse(xhr.responseText));
        }else{
          reject(JSON.parse(xhr.responseText));
        }
      }
    }
    xhr.send(body);
  })
}

window.$ = window.jQuery;   // 宏定义

// 实际中的调用方式
$.ajax({
  url: "/xxx",  // 报文第一部分 路径
  method: "GET",  // 报文第一部分 请求方式
  headers: { // 报文第二部分
    'content-type':'application/x-www-form-urlencoded', 
    'frank': '18'
  },
  body: "报文第四部分"  // 报文第四部分
}).then(fn1 , fn2);  // fn1 成功时处理函数   fn2 失败时处理函数

// 自定义的处理函数
function fn1(text){
  console.log(text);
}
function fn2(text){
  console.log(text);
}
