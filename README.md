# 【numberBox】微信小程序数字框组件
### 1.大小限制【可设置上下限值,超出范围自动变为极限值】   2.数字改变事件【数字大小改变后触发exchanged事件】
##效果图如下

![](https://github.com/puti520/numberBox/blob/master/Test/wxnumberbox1.gif)

## 使用

### 【Test.wxml】 属性设置如下 
```
<!--pages/Test/Test.wxml-->
<view>
  <view>
    <numberBox bindtxtValueChanged="txtValueChanged"  number="200" maximum="1000" minimum="-100" remark="最小值:-100 最大值1000 （可以为空）" ></numberBox>
    <label>数字改变事件：</label>
    <label>{{labelText}}</label>
  </view>
</view>
```

### 【Test.json】 声明numberbox组件
```
// pages/Test/Test.json
{
  "usingComponents": {
    "numberBox": "/pages/Component/numberBox/numberBox"
  }
}
```

### 【Test.js】数字改变事件调用 

```
Page({
  /**
   * 页面的初始数据
   */
  data: {
    labelText:"200",
  },

  //进入数字改变事件
  txtValueChanged(e){
    this.setData({ labelText:e.detail.number});
  }
})
```

## numberBox组件说明
```
// pages/Component/numberBox/numberBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    remark:{
      type:String,
      value:"备注"
    },
    number:{
      type:Number,
      value:10      
    },
    maximum:{
      type: Number,
      value: 200
    },
    minimum: {
      type: Number,
      value: 1
    }

  },

// 数字更改对外事件
txtValueChanged(e) {
  console.log("Event：", this.properties.number);
  this.triggerEvent('txtValueChanged', { number: this.properties.number });//自定义事件
  },

  /**
   * 组件的方法列表
   */
methods: {
    nextNum() {
      var value = this.properties.number;
      if (value< this.properties.maximum)
      { 
        this.setData({ number: value+ 1 });
        this.triggerEvent('txtValueChanged', { number: this.properties.number });//自定义事件：通过triggerEvent 把这个事件传送到最外面
      }
    },
    prevNum() {
      if (this.properties.number > this.properties.minimum) {
        this.setData({ number: this.properties.number - 1 });
        this.triggerEvent('txtValueChanged', { number: this.properties.number });//自定义事件：通过triggerEvent 把这个事件传送到最外面
      }
    },

    /*
    焦点离开事件：
    失去焦点后 判断当前输入的值是否大于最大值，小于最小值
    大于上限等于最大 ；小于下限等于最小
    */
    focusLeave: function (e) {
        var inputValue = e.detail.value;
        if (inputValue > this.properties.maximum) {
          this.setData({ number: this.properties.maximum});
        }
        else if (inputValue < this.properties.minimum) {
          this.setData({ number: this.properties.minimum });
        }
        else {
          this.setData({ number: inputValue});
        }
        this.triggerEvent('txtValueChanged', { number: this.properties.number });//自定义事件：通过triggerEvent 把这个事件传送到最外面
    },

  }
})

```
