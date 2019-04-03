const app = getApp()
const url = app.host.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songlist:[],
    songname:'',
    flag:false,
    title:'暂停',
    temp:true,
    songStr:''
  },
  stop(){
    this.setData({
      temp:false
    })
    wx.pauseBackgroundAudio()

  },
  start(){
    this.setData({
      temp: true
    })
    wx.playBackgroundAudio({
      dataUrl: this.data.songStr,
      title: this.data.songname,
      coverImgUrl: this.data. songStr
    })
  },
  onLoad: function (e) {
    wx.showLoading({
      title: '加载中',
      
    })
  let id = e.songid
  let that = this
    app.post(url +'api/music/songIdlist/'+ id).then(res=>{
      
      that.setData({
        songlist:res.data.data
      })
      wx.hideLoading()
    })
  },
  
  listenMusic(e){
   
    wx.showLoading({
      title: '正在获取资源',
      icon:'none'
    })
    let songmid = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.song
    let that = this
    this.setData({
      songname:title,
      flag:true
    })
    app.post(url + 'api/music/songUrllist/' + songmid).then(res=>{
      var dd = res.data.data[0].indexOf('?')
      if(dd != -1){
        that.setData({
          songStr:res.data.data[0]
        })
        wx.playBackgroundAudio({
          dataUrl: res.data.data[0],
          title: title,
          coverImgUrl: res.data.data[0]
        })
        wx.hideLoading()

      }else{
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '很抱歉！暂未找到歌曲资源',
          success: function (sm) {
            if (sm.confirm) {
             
            } else if (sm.cancel) {
            }
          }
        })
       
      }
     
      console.log(JSON.stringify(res))
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  onShow: function () {

  },

  
})