// jQuery-ajax  v2.0

// 仿写jQuery中的ajax
window.jQuery.ajax = function({url,method,headers,body,successFn,errorFn}){
  let xhr = new XMLHttpRequest();
  xhr.open(method,url);
  for(let key in headers){
    xhr.setRequestHeader(key,headers[key]);
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >= 200 && xhr.status <= 300){
        successFn(xhr.responseText);
      }else{
        errorFn(xhr.responseText);
      }
    }
  }
  xhr.send(body);
}

window.$ = window.jQuery;  // 宏定义

// 实际调用的方式
$.ajax({
  url: "/xxx",  // 报文第一部分 路径
  method: "GET",  // 报文第一部分 请求方式
  headers: {  // 报文第二部分
    'content-type':'application/x-www-form-urlencoded', 
    'frank': '18'
  },
  body: "报文第四部分",   // 报文第四部分
  successFn: (x) => {  // 成功时处理函数
    fn1(x);
  },
  errorFn: (x) => {  // 失败时处理函数
    fn2(x);
  }
});

// 自定义处理函数
function fn1(text){
  console.log(text);
}
function fn2(text){
  console.log(text);
}
