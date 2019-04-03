//app.js
App({

  onShow: function () {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求是否有新版本
      // console.log( res.hasUpdate);
    });
    //如果res.hasUpdate 为true 表明有新版本，调用onUpdataReady
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '检测到新版本，请重启应用',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })
    });
  },
  post:function(url,data){
    var promise = new Promise((resolve, reject) => {
      var that = this;
      var postData = data;
      wx.request({
        url: url,
        data: postData,
        method: 'get',
        header: {
          'content-type': 'application/json'
        },

        success: function (res) {
          resolve(res)
        },
        error: function (e) {
          reject('网络出错')
        }
      })
    })
    return promise
  },
  host:{
    url:'https://music.niubishanshan.top/'
  }
})