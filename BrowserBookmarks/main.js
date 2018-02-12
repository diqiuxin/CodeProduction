// 按键排列布局
const keys = [
  [1,2,3,4,5,6,7,8,9,0],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"],
];

// 按键对应的 URL 
let hash = {
  "q": "qq.com",
  "w": "163.com",
  "e": "sina.com.cn",
  "b": "baidu.com",
  "t": "taobao.com"
}

// 获取本地的 localStore 数据
var localStorageHash = JSON.parse(localStorage.getItem("hashStr")|| "null");
if(localStorageHash){
  hash = localStorageHash;
}

// document 范围检测键盘按键
document.onkeypress = function(keypress){
  let key = keypress.key;
  openKeyUrl(key);
}

// 通过按键打开对应的 URL
function openKeyUrl(_key){
  let _website = hash[_key]; 
  console.log(_key, "http://"+_website);
  // localtion.href = "http://" + website;
  window.open("http://"+_website , "_blank")
}

