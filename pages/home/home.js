var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPageNum: 0,
    //banner数据
    banners: [],
    //文章
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadBanners();
    this.loadArticles();
  },

  loadBanners(){
    var that = this;
    wx.request({
      url: app.globalData.HomeBannerUrl,
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200 && res.data.errorCode == 0) {
          that.setData({
            banners: res.data.data
          })
        }
      }
    });
  },

  loadArticles(){
    var mThis = this

    wx.request({
      url: "https://www.wanandroid.com/article/list/" + mThis.data.currentPageNum +"/json",
      success(res){
        console.log(res.data)
        if (res.statusCode == 200 && res.data.errorCode == 0) {
          mThis.setData({
            articles: res.data.data.datas
          })
        }
      },
      complete(res){
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        wx.stopPullDownRefresh()
      } 
    })

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
    wx.showNavigationBarLoading()
    this.setData({
      currentPageNum : 0
    });
    this.loadBanners();
    this.loadArticles();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: 'loading',
    })
    this.setData({
      currentPageNum: this.data.currentPageNum + 1
    })
    this.loadArticles();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})