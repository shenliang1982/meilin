Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    pic_list: [],
  },
  onTap(e) {
    console.log('image 发生 tap 事件', e);
  },
  onLoad(e) {
    var t = this;
    //判定是否登录
    dd.getStorage({
      key: 'login',
      success: function (res) {
        t.setData({ login: res.data });
        //载入等待
        dd.showLoading({
          content: '加载中...',
          delay: '1000',
        });
        //载入列表
        dd.httpRequest({
          url: "http://47.114.96.139:8888/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_purchase_1: e.no_purchase_1,
            name_space: "StorageWork.PurchaseOrderListPic.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            t.setData({ "pic_list": res2.data.json_ar_0 });
          },
          fail: (res2) => {
            dd.alert({ content: JSON.stringify(res2) });
          },
          complete: (res2) => {
            dd.hideLoading();
          },
        });
      }
    });
  }
})