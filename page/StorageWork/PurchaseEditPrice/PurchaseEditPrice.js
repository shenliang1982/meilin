Page({
  data: {
    login: {
      username: "",
      code_login: "",
      url: ""
    },
    data_1: {},
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
            t.setData({ [name_col_no]: d_1[res.index].no_ls });
            t.setData({ [name_col_name]: d_1[res.index][name_col_name] });
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
  select_project() {
    var t = this;
    t.select_item("Task.TaskAddTop.AlxgroupControl1name_project"
    , "no_project", "name_project");
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
            no_ls: e.no_ls,
            name_space: "Task.TaskAnswerYes.BindinggroupControl1"
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
    t.data.data_1.qty_cost = e.detail.value.qty_cost;
    t.data.data_1.qty_effect = e.detail.value.qty_effect;
    t.data.data_1.remark_answer = e.detail.value.remark_answer;
    //载入等待
    dd.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    //提交数据
    var p_in = {
      no_ls: t.data.data_1.no_ls,
      json_ar_0: [t.data.data_1]
    };
    dd.httpRequest({
      url: t.data.login.url + "ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "ProjectLinkUse.TaskAnswerYes.Save",
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