/**
 * 局域网调试 服务器代码
 * 
 */ 

let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");

let IP = "192.168.43.253";
let port = "8088";

http.createServer(function(req,res){
	//得到用户的路径
	let pathname = url.parse(req.url).pathname;
	//默认首页
	if(pathname == "/"){
		pathname = "index.html";
	}
	//拓展名
	let extname = path.extname(pathname);

	//真的读取这个文件
	fs.readFile("./" + pathname,function(err,data){
		if(err){
			//如果此文件不存在，就应该用404返回
			fs.readFile("./404.html",function(err,data){
				res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
				res.end(data);
			});
			return;
		};
		//MIME类型，就是
		//网页文件：  text/html
		//jpg文件 :   image/jpg
		let mime = getMime(extname);
		res.writeHead(200,{"Content-type":mime});
		res.end(data);
	});

	console.log(`服务器${IP}:${port}已经打开`);
}).listen(port,IP);  //局域网IP地址

function getMime(extname){
	switch(extname){
		case ".html" :
			return "text/html";
			break;
		case ".jpg" : 
			return "image/jpg";
			break;
		case ".png" : 
			return "image/png";
			break;
		case ".css":
			return "text/css";
			break;
	}
}