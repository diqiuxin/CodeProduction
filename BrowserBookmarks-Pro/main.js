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
    "e": "ele.me",
    "r": "kuwo.cn",
    "t": "twitter.com",
    "y": "youtube.com",
    "u": "ulinix.com",
    "i": "ip.cn",
    "o": "outlook.com",
    "p": "kushubao.com",
    "a": "aliyun.com",
    "s": "sina.cn",
    "d": "dytt8.net",
    "f": "firefox.com.cn",
    "g": "google.cn",
    "h": "hao123.com",
    "j": "juejin.im",
    "k": "36kr.com",
    "l": "le.com",
    "z": "zhihu.com",
    "x": "xiedaimala.com",
    "c": "ce.cn",
    "v": "vancl.com",
    "b": "baidu.com",
    "n": "nike.com",
    "m": "mi.com"
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


