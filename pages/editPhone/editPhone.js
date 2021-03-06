// pages/editPhone/editPhone.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    isClick: false,
    isLength: false,
    code: "",
    phone: "",
    userPhone: "",
    san: true,
    i: 1,
  },

  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },


  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindButtonTap: function() {
    var that = this;

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    //当手机号正确的时候提示用户短信验证码已经发送
    wx.showToast({
      title: '短信验证码已发送',
      icon: 'none',
      duration: 2000
    });
    that.setData({
      isClick: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    //设置一分钟的倒计时
    var interval = setInterval(function() {
      currentTime--; //每执行一次让倒计时秒数减一
      that.setData({
        text: currentTime + '秒后重发', //按钮文字变成倒计时对应秒数
      })
      //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          text: '重新发送',
          currentTime: 61,
          isClick: false,
          color: '#929fff'
        })
      }
    }, 1000);

    //请求接口
    let codeList = {
      "type": "login",
      "phone": that.data.userPhone
    }
    app.xhr('POST', '/message/send', codeList, '', (res) => {
      if (res.data.code == 200) {
        app.toast("发送成功")
      }
    });



    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    // if (warn != null) {
    //   wx.showModal({
    //     title: '提示',
    //     content: warn
    //   })

    //   that.setData({
    //     disabled: false,
    //     color: '#929fff'
    //   })
    //   return;

    // };
  },

  //下一步
  next: function() {
    var that = this
    if (that.data.i == 1) {
      that.data.i = 2
      wx.navigateTo({
        url: '../bindingphone/bindingphone?phone=' + that.data.userPhone
      })
      that.setData({
        san: false,
      })
    } else {
      that.data.i = 1,
        that.setData({
          san: true,
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.xhr('POST', '/member/info', '', '', (res) => {
      this.setData({
        userPhone: res.data.data.m_phone
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})