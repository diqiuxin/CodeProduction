// JS原生ajax JSON v1.0
let button = document.getElementById('button');

button.addEventListener('click',(event)=>{
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >= 200 && xhr.status < 300){
        let string = xhr.responseText;
        // 把符合 JSON 的字符串转换成 JS 对应的值
        // JSON.parse() 是浏览器提供的  
        // window.JSON.parse();
        let obj = JSON.parse(string);
        console.log(obj.note);
      }
    }
  };
  xhr.onerror = function(){consoloe.onerror("出错");};
  xhr.open('GET','/pay',true); 
  // ajax 常用的请求类型： GET POST PUT DELETE 
  // true 异步  false 同步 
  // 路径可以是绝对路径 'http://www.baidu.com/'
  // 添加非同源的绝对路径时，需要在访问的服务器端添加: 
  // response.setHeader('Access-Control-Allow-Origin', '协议+主机名+端口号')
  xhr.send(null);
  // JSON VS js
  // JSON 的数据类型：string number object array null true false
  // JSON 没有undefined function symbol(js新出的没来的及抄)
  // string 必须要加双引号
  // JSON 是一门新的语言，是抄袭js的
  // .send() 表示发送的是报文的第四部分

  // 后台永远只是返回字符串（比如返回符合JSON语法的字符串文件）
  // 前端接收到之后转化成相应的数据类型格式
});


/* 
//ajax的简单实例
let xhr = new XMLHttpRepuest();
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status >=200 && xhr.status <= 300){
    let jsonObj = JSON.parse(xhr.responseText);
  }else{
    consoloe.onerror('请求出错');
  }
};
xhr.open('GET','/pay');
// xhr.open('POST','http://www.frank.com:8080/pay'); 
// 非同源请求需要在请求的服务器路径上 
// 添加 response.setRepuestHeader('Access-Control-Allow-Origin' , 'http://www.frank.com:8080');
xhr.send(null);

*/