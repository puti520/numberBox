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
  

  /**
   * 组件的初始数据
   */
  data: {
    noInput: false,//标记当前是按钮增加数字 还是输入的数字
  },

  onLoad: function (options) {
  
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
