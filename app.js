App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.DingLogin();
  },
  onShow() {
    console.log('App Show');
    this.CheckUpdate();
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
  },
  CheckUpdate() {
    if (dd.canIUse('getUpdateManager')) {
      const updateManager = dd.getUpdateManager();

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate); // 是否有更新
      });

      updateManager.onUpdateReady(function (ret) {
        console.log(ret.version); // 更新版本号
        dd.confirm({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
      });
    }
    else {
      //dd.alert({ content: "SDKVersion" + dd.SDKVersion });
    }
  },
  DingLogin() {
    dd.getAuthCode({
      success: function (res1) {
        //免登
        dd.httpRequest({
          url: "http://47.114.96.139:8888/DingLogin.ashx",
          method: 'POST',
          data: {
            code: res1.authCode
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "29" + JSON.stringify(res2)});
            var url_1 = {
              username: res2.data.username,
              code_login: res2.data.code_login,
              url: "http://47.114.96.139:8888/",
            };
            dd.setStorage({
              key: 'login',
              data: url_1,
              success: function () { }
            });
          },
          fail: (res2) => {
            dd.alert({ content: "37" + JSON.stringify(res2) });
          },
        });
      }
    });
  },
});
