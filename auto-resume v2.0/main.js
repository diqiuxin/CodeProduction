!function(){
  let view = {
    code: document.querySelector('#code'),
    CssStyle: document.querySelector('#CssStyle'),
  }
  let model = {
    codeStr: `
    /*
     * 我们来画一个皮卡丘
     * 首先准备一些样式
     */

    /* 先初始化一下吧 */
    *{margin:0; padding:0; transition: all 1s;}

    /* 加个边框，改个字体 */
    #code{
      background-color: rgb(0,43,54);
      border: 2px green solid;
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
    }

    /* 给字体加点颜色 */
    .token.comment{
      color: slategray;
    }
    .token.selector{
      color: #690;
    }
    .token.punctuation{
      color: #999;
    }
    .token.property{
      color: #905;
    }
    
    /* 加个呼吸灯效果 */
    #code{
      animation: breathingLight 1s infinite alternate-reverse;
    }

    /* 调整一下布局 */
    #code{
      width: 50%; position: fixed; left: 0;
      height: 100%;
    }
    /* 来一张纸放右边 */
    .wrapper{
      width: 50%; position: fixed; right: 0; 
      height: 100%;
      background: #FEE433;
      border: 2px blue solid;
    }
    /* 于是我就可以在白纸上画画了 */
    *::after{
      box-sizing: border-box;
    }
    *::before{
      box-sizing: border-box;
    }
    .nose{
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 12px;
      border-color: black transparent transparent;
      border-radius: 11px;
      position: absolute;
      left: 50%;
      top: 28px;
      margin-left: -12px;
    }
    .eye{
      width: 49px;
      height: 49px;
      background: #2E2E2E;
      position: absolute;
      border-radius: 50%;
      border: 2px solid #000000;
    }
    .eye::before{
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background: white;
      position: absolute;
      border-radius: 50%;
      left: 6px;
      top:-1px;
      border: 2px solid #000;
    }
    .eye.left{
      right: 50%;
      margin-right: 90px;
    }
    .eye.right{
      left: 50%;
      margin-left: 90px;
    }
    .face{
      width: 68px;
      height: 68px;
      background: #FC0D1C;
      border: 2px solid black;
      border-radius: 50%;
      position: absolute;
      top: 85px;
    }
    .face.left{
      right: 50%;
      margin-right: 116px;
    }
    .face.right{
      left: 50%;
      margin-left: 116px;
    }
    .upperLip{
      height: 25px;
      width: 80px;
      border: 2px solid black;
      position: absolute;
      top: 50px;
      background: #FDE348;
    }
    .upperLip.left{
      right: 50%;
      border-bottom-left-radius: 40px 25px;
      border-top: none;
      border-right: none;
      transform: rotate(-20deg);
    }
    .upperLip.right{
      left: 50%;
      border-bottom-right-radius: 40px 25px;
      border-top: none;
      border-left: none;
      transform: rotate(20deg);
    }
    .lowerLip-wrapper{
      top: 60px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      z-index: -1;
      height: 110px;
      overflow: hidden;
      width: 300px;
    }
    .lowerLip{
      height: 3500px;
      width: 300px;
      background: #990513;
      border-radius: 200px/2000px;
      border: 2px solid black;
      position: absolute;
      bottom: 0;
      overflow: hidden;
    }
    .lowerLip::after{
      content: '';
      position: absolute;
      bottom: -20px;
      width: 100px;
      height: 100px;
      background: #FC4A62;
      left: 50%;
      margin-left: -50px;
      border-radius: 50px;
    }
    `,
endStr:`

  /* 这个皮卡丘送给你 */
  /* 谢谢观赏 :) */

`,
  }
  let controller = {
    view: null,
    model: null,
    init: function(view,model){
      this.view = view;
      this.model = model;
      let {codeStr,endStr} = this.model;
      this.writeCode('' , codeStr , ()=>{
        this.writeCode(codeStr,endStr);
      });
    },
    writeCode: function(prefixStr,postfixStr,func){
      let {code,CssStyle} = this.view;
      let n = 0;
      prefixStr = prefixStr || '';

      let id = setInterval(() => {
        n++;
        code.innerHTML = Prism.highlight(prefixStr + postfixStr.substring(0,n), Prism.languages.css);
        CssStyle.innerHTML = prefixStr + postfixStr.substring(0,n); 
        code.scrollTop = code.scrollHeight;
        if(n >= postfixStr.length){
          window.clearInterval(id);
          func && func.call();
        }
      },70);
    },
  }
  controller.init(view,model);
}.call();


