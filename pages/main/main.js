const app = getApp()
const url = app.host.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider:[],
    topList:[]
  },
  getPicBar(){
    var that =this
    app.post(url+'api/music/recommend').then(res=>{
      console.log(JSON.stringify(res.data.data))
      that.setData({
        slider:res.data.data.slider
      })
    })
  },
  getTopList(){
    var that = this
    app.post(url + 'api/music/toplist').then(res => {
      that.setData({
        toplist:res.data.data
      })
    wx.hideLoading()
    })
  },
  gosongList(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../songlist/songlist?songid=' + id,
    })
    console.log(id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
    this.getPicBar()
    this.getTopList()
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