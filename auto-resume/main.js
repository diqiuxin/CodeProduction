!function(){
  let view = {
    code: document.querySelector('#code'),
    CssStyle: document.querySelector('#CssStyle'),
    content: document.querySelector('#content'),
  }
  let model = {
    codeStr: `
    /*
     * 面试官你好,我是赵XX
     * 只用文字介绍显得太单调了
     * 我就用代码介绍吧
     * 首先准备一些样式
     */

    /* 先初始化一下吧 */
    *{margin:0; padding:0; transition: all 1s;}
    body{
      background-color: #ddd;
    }

    /* 加个边框，改个字体 */
    #code{
      border: 2px green solid;
      font-size: 16px;
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
    #paper{
      width: 50%; position: fixed; right: 0; 
      height: 100%;
      background-color: burlywood;
      border: 2px blue solid;
    }
    /* 于是我就可以在白纸上写字了，请看右边 >>> */
    `,
markdownStr: `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

- XXX 轮播
- XXX 简历
- XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`,
markedStr: `

  /* 现在引用一个优秀的库 marked.js */
  /* 把 Markdown 转换成 HTML */
  /* 接下来就是见证奇迹的时候，看右边>>>> */

  `,

endStr:`

  /* 这就是我的简单介绍 */
  /* 谢谢观赏 :) */

`,
  }
  let controller = {
    view: null,
    model: null,
    init: function(view,model){
      this.view = view;
      this.model = model;
      let {codeStr,markdownStr,markedStr,endStr} = this.model;
      this.writeCode('' , codeStr , ()=>{
        this.writeMarkdown('', markdownStr , ()=>{
          this.writeCode(codeStr,markedStr ,()=>{
            this.convertMarkdownToHtml(markdownStr,()=>{
              this.writeCode(codeStr + markedStr,endStr)
            })
          })
        })
      });
    },
    writeCode: function(prefixStr,postfixStr,func){
      prefixStr = prefixStr || '';
      let code = this.view.code,
          CssStyle = this.view.CssStyle,
          n = 0;

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
    writeMarkdown: function(prefixStr,postfixStr,func){
      prefixStr = prefixStr || '';
      let content = this.view.content,
          CssStyle = this.view.CssStyle,
          n = 0;
      let id = setInterval(() => {
        n++;
        content.innerHTML =prefixStr + postfixStr.substring(0,n);
        content.scrollTop = content.scrollHeight;
        if(n >= postfixStr.length){
          window.clearInterval(id);
          func && func.call();
        }
      },70);
    },
    convertMarkdownToHtml: function(md , func){
      let div = document.createElement('div'); 
      div.className = 'html markdown-body';
      div.innerHTML = marked(md);
      let markdownContainer = document.querySelector('#paper > #content');
      markdownContainer.replaceWith(div);
      func && func.call();
    }
  }
  controller.init(view,model);
}.call();


