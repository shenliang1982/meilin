Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    data_1: {},
  },
  datePicker() {
    dd.datePicker({
      currentDate: this.data.data_1.date_diary,
      startDate: '2020-1-1',
      endDate: '2030-1-1',
      success: (res) => {
        this.setData({ "data_1.date_diary": res.date });
      },
    });
  },
  selectProject() {
    var t = this;
    //载入列表
    dd.httpRequest({
      url: "http://47.114.96.139:8888/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "ProjectM.ProjectDiaryEdit.AlxgroupControl1name_project"
      },
      dataType: 'json',
      success: (res2) => {
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          d_2.push(d.name_project);
        }

        dd.showActionSheet({
          title: "选择项目",
          items: d_2,
          //cancelButtonText: '取消',
          success: (res) => {
            t.setData({ "data_1.no_project": d_1[res.index].no_ls });
            t.setData({ "data_1.name_project": d_1[res.index].name_project });
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
  selectModel() {
    var t = this;
    //载入列表
    dd.httpRequest({
      url: "http://47.114.96.139:8888/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "ProjectM.ProjectDiaryEdit.AlxgroupControl1name_model"
      },
      dataType: 'json',
      success: (res2) => {
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          d_2.push(d.name_model);
        }

        dd.showActionSheet({
          title: "选择模板",
          items: d_2,
          //cancelButtonText: '取消',
          success: (res) => {
            t.setData({ "data_1.diary": d_1[res.index].model });
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
            no_ls: e.no_ls,
            name_space: "ProjectM.ProjectDiaryEdit.BindinggroupControl1"
          },
          dataType: 'json',
          success: (res2) => {
            t.setData({ "data_1": res2.data.json_ar_0[0] });
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
  },
  onSubmit(e) {
    var t = this;
    //t.data.data_1.no_project = e.detail.value.no_project;
    t.data.data_1.keyword = e.detail.value.keyword;
    t.data.data_1.diary = e.detail.value.diary;
    t.data.data_1.date_diary = e.detail.value.date_diary;
    t.data.data_1.is_answer_need = (e.detail.value.is_answer_need.length > 0);
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
      url: "http://47.114.96.139:8888/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        name_space: "ProjectM.ProjectDiaryEdit.Save",
        json_in: JSON.stringify(p_in),
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