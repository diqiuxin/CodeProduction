//数据初始化
function init(){
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
  return {
    "keys": keys,
    "hash": hash
  }
}

var data = init();
let keys = data.keys;
let hash = data.hash;


