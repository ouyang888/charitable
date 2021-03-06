// pages/me/me.js
var app = getApp()
let storage = require('../../utils/storage.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    phone: '', //获取到的手机栏中的值
    isClick: false,
    name: "",
    user_id: true,
    code: "",
    showBtn: true,
    strLogin: storage.get_s("phone"),
    showZG: false,
    userInfo: app.globalData.userInfo
  },
  //修改手机号码
  edidPhone: function () {
    wx.navigateTo({
      url: '../editPhone/editPhone'
    })
  },

  // 爱的榜样
  loveExample: function () {
    wx.navigateTo({
      url: '../loveExample/loveExample'
    })
  },
  // 组织架构
  organization: function () {
    wx.navigateTo({
      url: '../organization/organization'
    })
  },
  // 通知
  notice: function () {
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  // 我的会员
  donationReg: function () {
    wx.navigateTo({
      url: '../donationReg/donationReg'
    })
  },

  login: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  //清空缓存
  clearStro: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要清空缓存吗？',
      confirmColor: "#FFA431",
      success(res) {
        if (res.confirm) {
          // wx.clearStorage()
          storage.remove("userInfo")
          storage.remove("phone")
          storage.remove("userName")
          wx.navigateTo({
            url: '../login/login'
          })
          // that.setData({
          //   user_id: false
          // })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },


  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },



  loginSub: function () {
    var that = this
    let loginList = {
      "m_real_name": that.data.name,
      "m_phone": that.data.phone,
      "yzm": that.data.code
    }
    app.xhr('POST', '/member/accountLogin', loginList, '', (res) => {
      if (res.data.code == 200) {
        app.toast("登录成功")
        storage.set("phone", res.data.data.m_phone)
        storage.set("userName", res.data.data.m_real_name)
        that.setData({
          user_id: true,
          showZG: true,
          userName: res.data.data.m_real_name
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  bindButtonTap: function () {
    var that = this;
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    if (phone == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      });
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      });
    } else {
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
      var interval = setInterval(function () {
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
        "phone": that.data.phone
      }
      app.xhr('POST', '/message/send', codeList, '', (res) => {
        if (res.data.code == 200) {
          app.toast("发送成功")
        }
      });
    };
  },

  unLogin: function () {
    // this.setData({
    //   user_id: false,
    // })
    wx.navigateTo({
      url: '../login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var phone = app.globalData.phone
    console.log(app)
    if (storage.get_s("phone") != '') {
      this.setData({
        user_id: true,
        showZG: true
      })
    }
    this.setData({
      userName: storage.get_s("userName")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})