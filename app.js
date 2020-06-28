App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.DingLogin();
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
  },
  DingLogin() {
    dd.getAuthCode({
      success: function(res1) {
        //免登
        dd.httpRequest({
          url: "http://47.114.96.139/DingLogin.ashx",
          method: 'POST',
          data: {
            code: res1.authCode
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "29" + JSON.stringify(res2)});
            dd.setStorage({
              key: 'login',
              data: res2.data,
              success: function() { }
            });
          },
          fail: (res2) => {
            dd.alert({content: "37" + JSON.stringify(res2)});
          },
        });
      }
    });
  },
});
