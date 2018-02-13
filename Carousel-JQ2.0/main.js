// jQuery 无缝轮番
let imgN;
let imgNs;
init();

setInterval(function(){
  markActive(getEle(imgN),'leave').one('transitionend',(event)=>{
    markActive($(event.target) , 'enter');
  });
  markActive(getEle(imgN+1) , 'current');
  imgN++;
},1500);  // setInterval(); 的定时时间与动画的 transition 的有关系 
// (前者时间一定要大于后者的时间,否则图的动画会变混乱) 

// 获取指定图片元素的节点
function getEle(n){
  return $(`.imager >img:nth-child(${N(n)})`);
}
// 对指定元素节点添加状态
function markActive(node , state){
  node.removeClass('enter current leave')
    .addClass(state);
  return node;
}

// 初始化函数
function init(){
  imgN = 1;
  imgNs = $('.imager > img').length;
  markActive($('.imager > img'),'enter');
  markActive(getEle(1),'current');
}

// 简单的运算 return 1,2,...,imgNs
function N(n){
  return (n%imgNs === 0)? imgNs : n%imgNs;
}