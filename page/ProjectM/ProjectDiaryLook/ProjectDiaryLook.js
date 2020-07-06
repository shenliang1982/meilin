Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    data_1: {},
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
          url: "http://47.114.96.139/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_ls: e.no_ls,
            name_space: "ProjectM.ProjectDiaryLook.BindinggroupControl1"
          },
          dataType: 'json',
          success: (res2) => {
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
    //t.data.data_1.no_project = e.detail.value.no_project;
    t.data.data_1.back_add = e.detail.value.back_add;
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
      url: "http://47.114.96.139/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        no_project_diary: t.data.data_1.no_ls,
        back_add: e.detail.value.back_add,
        name_space: "ProjectM.ProjectDiaryLook.SaveBack",
        //json_in: JSON.stringify(p_in),
      },
      dataType: 'json',
      success: (res2) => {
        if (res2.data.is_ok == "True") {
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