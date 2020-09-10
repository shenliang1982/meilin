Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
  },
  onLoad(e) {
    //e.no_ls
    var t = this;
    //判定是否登录
    dd.getStorage({
      key: 'login',
      success: function (res) {
        t.setData({ login: res.data });
      }
    });
  },
  onSubmit(e) {
    var t = this;
    //载入等待
    dd.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    //提交数据
    dd.httpRequest({
      url: "http://47.114.96.139:8888/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        no_purchase_12: e.detail.value.no_purchase_12,
        name_space: "StorageWork.DingStorageIn.AddIn"
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.is_ok) {
          dd.setStorage({ key: 'is_on_show_refresh', data: true });
          dd.navigateBack();
        }
        else
          dd.alert({ content: JSON.stringify(res2.data.error) });
      },
      fail: (res2) => {
        dd.alert({ content: JSON.stringify(res2) });
      },
      complete: (res2) => {
        dd.hideLoading();
      },
    });
  },
  onReset() {

  },
});