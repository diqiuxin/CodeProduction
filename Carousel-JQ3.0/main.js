// 需要的所有变量
let $buttons = $('#buttonWrapper>button');
let $slides = $('#slides');
let $images = $slides.children('img');
let current = 0;
let timer = timerId();

// 初始化
makeFakeSlides();
$slides.css({transform:'translateX(-400px)'});

// 事件绑定
bindEvents();
$(next).on('click', function(){
  goToSlide(current+1);
});
$(previous).on('click', function(){
  goToSlide(current-1);
});
$('.container').on('mouseenter', function(){
  window.clearInterval(timer);
}).on('mouseleave', function(){
  timer = timerId();
});

function bindEvents(){
  $('#buttonWrapper').on('click', 'button', function(e){
    let $button = $(e.currentTarget) ;
    let index = $button.index();
    goToSlide(index);
  });
}

//重要
function goToSlide(index){
  if(index > $buttons.length-1){
    index = 0
  }else if(index <0){
    index = $buttons.length - 1
  }
  // current 当前的图片编号
  // index 要去的图片编号 
  if(current === $buttons.length -1 && index === 0){
    // 最后一张到第一张
    $slides.css({transform:`translateX(${-($buttons.length + 1)*400}px)`})
      .one('transitionend', function(){
        $slides.hide().offset(); 
        // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
        // 不要写邮件来问我为什么要写 .offset，你自己注释掉上面一行看最后一张到第一张的动画，就知道为什么要加 offset() 了。
        $animation($slides , index).show();
      });
  }else if(current === 0 && index === $buttons.length - 1){
    // 第一张到最后一张
    $slides.css({transform:`translateX(0px)`})
      .one('transitionend', function(){
        $slides.hide().offset();
        $animation($slides , index).show();
      });
  }else{
    $animation($slides , index);
  }
  current = index;
}

function $animation($node , _index){
  $node.css({transform:`translateX(${ - (_index+1) * 400}px)`})
  return $node;
}

function timerId(){
  return setInterval(function(){
    goToSlide(current+1);
  },1500);
} 

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length-1).clone(true);

  $slides.append($firstCopy);
  $slides.prepend($lastCopy);
}