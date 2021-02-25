Page({
  data: {
    login: {
      username: "",
      code_login: "",
      url: ""
    },
    data_1: {},
    no_body: ''
  },
  history_price(){
    var t = this;
    dd.navigateTo({
      url: '../PurchaseEditPriceBody2/PurchaseEditPriceBody2?no_body=' + t.data.no_body
    });
  },
  select_item(name_space, name_col_no, name_col_name) {
    var t = this;
    //载入列表
    dd.httpRequest({
      url: t.data.login.url + "ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: name_space
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.error != "") dd.alert({ content: res2.data.error });
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          d_2.push(d[name_col_name]);
        }

        dd.showActionSheet({
          title: "选择",
          items: d_2,
          //cancelButtonText: '取消',
          success: (res) => {
            t.setData({ ["data_1." + name_col_no]: d_1[res.index].no_ls });
            t.setData({ ["data_1." + name_col_name]: d_1[res.index][name_col_name] });
            t.onLoad();
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
  select_company() {
    var t = this;
    t.select_item("StorageWork.PurchaseEditPriceBody.AlxgroupControl1name_company"
    , "no_company", "name_company");
  },
  onLoad(e) {
    //e.no_ls
    var t = this;
    if (t.data.no_body == "") t.setData({ "no_body": e.no_body });
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
            no_body: t.data.no_body,
            name_space: "StorageWork.PurchaseEditPriceBody.BindinggroupControl1"
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
    t.data.data_1.price = e.detail.value.price;
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
        name_space: "StorageWork.PurchaseEditPriceBody.Save",
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
});