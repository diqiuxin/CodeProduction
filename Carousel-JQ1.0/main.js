// 用jQuery实现的轮番图 
{ 
// 代码块全局变量
let $imgEles = $('#button > span');
let imgNum = $imgEles.length;
let index;

// 初始化状态
index = 0; 
active(index);

// 按键循环遍历添加事件
for(let i=0; i<$imgEles.length; i++){
  $($imgEles[i]).on('click' , function(event){
    index = $(event.target).index();
    active(index);
  });
}

// 定时器函数
let timeId = setTimer();
function setTimer(){
  return setInterval(() => {
    index = (index+1)%imgNum;
    active(index);
  },2000);
}

// 按键与图片的状态函数
function active(_index){
  let p = _index * -500;
  $('#imager').css({
    transform: 'translateX(' + p + 'px)'
  });
  $imgEles.eq(_index).addClass('red')
    .siblings('.red').removeClass('red');
}

// 定时器的开关
$('.window').on('mouseenter' , function(){
  window.clearInterval(timeId);
});
$('.window').on('mouseleave' , function(){
  timeId = setTimer();
});
}