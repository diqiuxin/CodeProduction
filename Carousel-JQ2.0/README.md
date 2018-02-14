# jQuery 实现的轮番图 v2.0

## [点击预览](http://www.diqiuxin.top/CodeProduction/Carousel-JQ2.0/index.html)

### 比较：

- ```v2.0```与```v1.0```在实现的思路上有很大的不同。
- 思路，中js部分只负责元素状态的切换，具体的状态由CSS负责。
- 图片始终分为三种状态：enter current leave , 同时三种状态对应着三个区域：leave(左边) current(中间) enter(右边)
- 结构，样式，操作三者实现分离。