Page({
  data: {
    login: {
      username: "",
      code_login: "",
      url: ""
    },
    data_1: {},
  },
  select_item_type() {
    var t = this;
    //载入列表
    dd.httpRequest({
      url: t.data.login.url + "ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "StorageWork.PurchaseEditBody.AlxgroupControl1name_item_type"
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.error != "") dd.alert({ content: res2.data.error });
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          d_2.push(d["name_item_type"]);
        }

        dd.showActionSheet({
          title: "选择",
          items: d_2,
          //cancelButtonText: '取消',
          success: (res) => {
            t.setData({ "data_1.no_item_type": d_1[res.index].no_ls });
            t.setData({ "data_1.name_item_type": d_1[res.index].name_item_type });
            t.setData({ "data_1.no_item": "" });
            t.setData({ "data_1.name_item": "" });
            t.setData({ "data_1.unit": "" });
          },
        });
      },
      fail: (res2) => {
        dd.alert({ content: JSON.stringify(res2) });
      },
      complete: (res2) => {
        dd.hideLoading();
      },
    });
  },
  select_item() {
    var t = this;
    //载入列表
    dd.httpRequest({
      url: t.data.login.url + "ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        no_item_type: t.data_1.no_item_type,
        name_space: "StorageWork.PurchaseEditBody.AlxgroupControl1name_item"
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.error != "") dd.alert({ content: res2.data.error });
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          d_2.push(d["name_item"]);
        }

        dd.showActionSheet({
          title: "选择",
          items: d_2,
          //cancelButtonText: '取消',
          success: (res) => {
            t.setData({ "data_1.no_item": d_1[res.index].no_ls });
            t.setData({ "data_1.name_item": d_1[res.index].name_item });
            t.setData({ "data_1.unit": d_1[res.index].unit });
          },
        });
      },
      fail: (res2) => {
        dd.alert({ content: JSON.stringify(res2) });
      },
      complete: (res2) => {
        dd.hideLoading();
      },
    });
  },
  onLoad(e) {
    //e.no_ls
    var t = this;
    //判定是否登录
    dd.getStorage({
      key: 'login',
      success: function(res) {
        t.setData({ login: res.data });
        //载入等待
        dd.showLoading({
          content: '加载中...',
          delay: '1000',
        });
        //载入列表
        dd.httpRequest({
          url: t.data.login.url + "ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_bill: e.no_bill,
            no_body: e.no_body,
            name_space: "StorageWork.PurchaseEditBody.BindinggroupControl1"
          },
          dataType: 'json',
          success: (res2) => {
            if (res2.data.error != "") dd.alert({ content: res2.data.error });
            t.setData({ "data_1": res2.data.json_ar_0[0] });
          },
          fail: (res2) => {
            dd.alert({content: JSON.stringify(res2)});
          },
          complete: (res2) => {
            dd.hideLoading();
          },
        });
      }
    });
  },
  onSubmit(e) {
    var t = this;
    t.data.data_1.qty = e.detail.value.qty;
    t.data.data_1.remark = e.detail.value.remark;
    //载入等待
    dd.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    //提交数据
    var p_in = {
      no_body: t.data.data_1.no_body,
      json_ar_0: [t.data.data_1]
    };
    dd.httpRequest({
      url: t.data.login.url + "ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "StorageWork.PurchaseEditBody.Save",
        json_in: JSON.stringify(p_in),
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.is_ok == 'True'){
          dd.setStorage({key: 'is_on_show_refresh',data: true});
          dd.navigateBack();
        }
        else
          dd.alert({ content: JSON.stringify(res2.data.error) });
      },
      fail: (res2) => {
        dd.alert({content: JSON.stringify(res2)});
      },
      complete: (res2) => {
        dd.hideLoading();
      },
    });
  },
  onReset() {

  },
});