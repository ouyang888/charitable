//index.js
//获取应用实例
let storage = require('../../utils/storage.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    activity: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //关于我们
  about: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  onLoad: function() {
    //轮播图
    app.xhr('POST', '/player/list', '', '', (res) => {
      // console.log(res)
      this.setData({
        imgUrls: res.data.data
      })
      //  console.log(this.data.imgUrls)
    });

    // 活动列表
    app.xhr('POST', '/activity/home', '', '', (res) => {
      this.setData({
        activity: res.data.data
      })
      //  console.log(this.data.activity)
    });


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
  },


  //点击允许后的用户信息
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //点击授权后跳转的页面
  },

})