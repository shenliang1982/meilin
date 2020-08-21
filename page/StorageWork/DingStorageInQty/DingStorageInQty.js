Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    no_body: "",
  },
  onLoad(e) {
    var t = this;
    t.data.no_body = e.no_body;
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
        no_storage_in_2: t.data.no_body,
        qty: e.detail.value.qty,
        name_space: "StorageWork.DingStorageIn.CheckQty"
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