const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const pen = document.getElementById('pen');
const eraser = document.getElementById('eraser');
const deletes = document.getElementById('delete');
const download = document.getElementById('download');
const help = document.getElementById('help');
const penThick = document.getElementById('pen-thick');
const penMedium = document.getElementById('pen-medium');
const penFine = document.getElementById('pen-fine');
let boolean = false,penEraser = "pen";
let penColor = "red" , eraserColor = "#999";
let penLineWidth = 12;
let pcORphone;
canvasResize();

//画笔色块
const ColorDiv = document.getElementsByClassName("colorDiv")[0];
const colorData = ['red','blue','black','yellow','rebeccapurple','green'];

//生成画笔的多种颜色
for (const value of colorData) {
  Colors(value);
}

//设备尺寸实时检测自适应
window.onresize = function(event){
   canvasResize();
}

//背景初始化
bgcInit();
function bgcInit(color = '#999'){
  context.fillStyle = color;
  context.fillRect(0,0,canvas.width,canvas.height);
}


//检测浏览器内核版本
// const v = navigator.userAgent.toLowerCase(); 
// alert(v);

//事件检测(备用块)
// console.log(canvas.onmousedown);   
// console.log(canvas.ontouchstart);
// "null" 代表支持此事件，事件未触发
// "undefiend" 代表不支持此事件

console.log(canvas.ontouchstart);
if(canvas.ontouchstart === undefined){
  pcORphone = 'PC';
}else{
  pcORphone = 'PHONE';
}
console.log(pcORphone);

//鼠标支持
canvas.onmousedown = function(event){
  boolean = true;
  let client = mouseXY(event);
  start(client.x,client.y);
}
canvas.onmousemove = function(event){
  if(boolean){
    let client = mouseXY(event);
    move(client.x,client.y);
  }
}
canvas.onmouseup = function(event){
  boolean = false;
  let client = mouseXY(event);
  end(client.x,client.y); 
}


//触屏支持
canvas.ontouchstart = function(event){
  boolean = true;
  let client = touchXY(event);
  start(client.x,client.y);
}
canvas.ontouchmove = function(event){
  if(boolean){
    let client = touchXY(event);
    move(client.x,client.y);
  }
}
canvas.ontouchend = function(event){
  boolean = false;
  let client = touchXY(event);
  end(client.x,client.y); 
}

//点击事件的监听
pen.onclick = function(){
  penEraser = "pen";
  //pen.className.baseVal     //调取SVG中的元素class属性
  clear();
  pen.className.baseVal = "active";
}
eraser.onclick = function(){
  penEraser = "eraser";
  clear();
  eraser.className.baseVal = "active";
}
deletes.onclick = function(){
  clear();
  deletes.className.baseVal = "active";
  // canvasResize();    两者都可以实现清空窗口
  context.clearRect(0,0,canvas.width,canvas.height);
}
download.onclick = function(){
  clear();
  download.className.baseVal = "active";
  downloadImage();
}
help.onclick = function(){
  alert(`
    手机或平板会暂存到屏幕左下角，长按可保存到本地。
    PC端直接下载到本地。
    如果想定制增添新的功能，可留言QQ：501993589。
  `);
}
penThick.onclick = function(e){
  console.log(e);
  clearPen();
  penThick.className.baseVal = "active";
  penLineWidth = 24;
}
penMedium.onclick = function(){
  clearPen();
  penMedium.className.baseVal = "active";
  penLineWidth = 12;
}
penFine.onclick = function(){
  clearPen();
  penFine.className.baseVal = "active";
  penLineWidth = 6;
}

//图片下载
function downloadImage(){
  let url = canvas.toDataURL("image/jpg");
  console.log(pcORphone);
  if(pcORphone == 'PC'){
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = prompt("为你的画起个名字 ");
    a.click();
  }
  let img = document.createElement("img");
  img.src = url;
  img.className = 'imgDownload'
  document.body.appendChild(img);
}

// 清理上边图标的选中状态
function clear(){
  pen.className.baseVal = "";
  eraser.className.baseVal = "";
  deletes.className.baseVal = "";
  download.className.baseVal = "";
}
function clearPen(){
  penThick.className.baseVal = "";
  penMedium.className.baseVal = "";
  penFine.className.baseVal = "";
}
resetPencolor(penColor);
function resetPencolor(_color){
  penThick.style.fill = _color;
  penMedium.style.fill = _color;
  penFine.style.fill = _color;
}

//模拟画笔动作
function start(x,y){
  PenEraser(penColor,eraserColor);
  arc(x,y);
  context.lineWidth = penLineWidth;
  context.beginPath();
  context.moveTo(x,y);
}
function move(x,y){ 
  context.lineTo(x,y);
  context.stroke();
  context.beginPath();
  context.moveTo(x,y);
}
function end(x,y){
  context.stroke();
  arc(x,y);
}

//画笔与橡皮餐
function PenEraser(_penColor,_eraserColor){
  if(penEraser == "pen"){
    context.fillStyle = _penColor;
    context.strokeStyle = _penColor;
  }else{
    context.fillStyle= _eraserColor;
    context.strokeStyle= _eraserColor;
  }
}

//获取坐标值并返回
function touchXY(_event){
  return {
    // x: _event.touches[0].clientX,   //这种事件在 ontouchend 时坐标为空
    // y: _event.touches[0].clientY
    x: _event.changedTouches[0].clientX,
    y: _event.changedTouches[0].clientY
  }
}
function mouseXY(_event){
  return {
    x: _event.clientX,
    y: _event.clientY
  }
}

//画实心圆
function arc(x,y){
  context.beginPath();
  context.arc(x,y,penLineWidth/2,0,Math.PI*2);
  context.fill();
}

//实时更新画板的大小尺寸
function canvasResize(){
  let pagewidth = document.documentElement.clientWidth;
  let pageheight = document.documentElement.clientHeight;
  canvas.height = pageheight;
  canvas.width = pagewidth;
}

//画笔色块
function Colors(_color){
  const div = document.createElement("div");
  div.className = "color";
  const div0 = document.createElement("div");
  div0.className = "in";
  div0.style.backgroundColor = _color;
  div0.onclick = function(event){
    penColor = event.target.style.backgroundColor;
    //清除色块选中的状态
    for (const ele of ColorDiv.children) {
      ele.className = "color";
    }
    //显示指定色块
    event.target.parentNode.className = "color color-active";
    console.log(penColor);
    resetPencolor(penColor);
  }
  div.appendChild(div0);
  ColorDiv.appendChild(div);
}

// 更多颜色选择
const penMoreColor = document.getElementById('penMoreColor');
const bgcMoreColor = document.getElementById('bgcMoreColor');
penMoreColor.onchange = function(event){
  let color = event.target.value;
  // console.log(color);
  // console.log(event);
  penColor = color;
  resetPencolor(penColor);
}
bgcMoreColor.onchange = function(event){
  let color = event.target.value;
  bgcInit(color);
}

// 补充区
// ColorDiv.innerHTML += `
// <div class="more-color">
//   <span>更多画笔色</span><br/>
//   <input id="penMoreColor" type="color"><br/>
//   <span>更多背景色</span><br/>
//   <input id="bgcMoreColor" type="color">
// </div>
// `;

// 未使用
function CreateEle(eleName,id,className){
  const ele = document.createElement(eleName);
  if(id != "") ele.id = id;
  if(className != "") ele.className = className;
  return ele;
}

// //浏览器的版本检测
// var Sys = {}; 
// var ua = navigator.userAgent.toLowerCase(); 
// var s; 
// (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
// (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
// (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
// (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : 
// (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0; 
// //以下进行测试 
// let str;
// if (Sys.ie) str = ('IE: ' + Sys.ie); 
// if (Sys.firefox) str = ('Firefox: ' + Sys.firefox); 
// if (Sys.chrome) str = ('Chrome: ' + Sys.chrome); 
// if (Sys.opera) str = ('Opera: ' + Sys.opera); 
// if (Sys.safari) str = ('Safari: ' + Sys.safari); 
// alert(str);