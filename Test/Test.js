// pages/Test/Test.js
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