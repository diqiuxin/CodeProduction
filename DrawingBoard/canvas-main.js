const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const hb = document.getElementById('hb');
const eraser = document.getElementById('eraser');
let boolean = false,hbEraser = "hb";
canvasResize();

window.onresize = function(event){
   canvasResize();
}

canvas.onmousedown = function(event){
  boolean = true;
  let x = event.clientX;
  let y = event.clientY;
  arc(x,y);
  console.log(hbEraser);
  HbEraser("stroke");
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(x,y);
}

canvas.onmousemove = function(event){
  if(boolean){
    let x = event.clientX;
    let y = event.clientY;
    context.lineTo(x,y);
    context.stroke();
    context.beginPath();
    context.moveTo(x,y);
  }
}

canvas.onmouseup = function(event){
  context.stroke();
  let x = event.clientX;
  let y = event.clientY; 
  arc(x,y);
  boolean = false;
}

hb.onclick = function(){
  hbEraser = "hb";
}
eraser.onclick = function(){
  hbEraser = "eraser";
}

function HbEraser(fillStroke){
  if(hbEraser == "hb"){
    context[`${fillStroke}Style`] = 'red';
  }else{
    context[`${fillStroke}Style`] = '#999';
  }
}

function arc(x,y){
  HbEraser("fill");
  context.beginPath();
  context.arc(x,y,5,0,Math.PI*2);
  context.fill();
}

function canvasResize(){
  let pagewidth = document.documentElement.clientWidth;
  let pageheight = document.documentElement.clientHeight;
  canvas.height = pageheight;
  canvas.width = pagewidth;
}

