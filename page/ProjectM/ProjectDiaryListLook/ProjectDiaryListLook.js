import list from '/page/biz/components/list';

Page({
  ...list,
  data: {
    listData: {
      onItemTap: 'handleListItemTap',
      //header: '项目日志',
      data: []
    },
    login: {
      username: "",
      code_login: ""
    },
    date_1: '',
    date_2: '',
    id_acc: '',
    date_1_more: '',
  },
  newdate_1() {
    var t = this;
    dd.datePicker({
      currentDate: t.data.date_1,
      startDate: '2020-1-1',
      endDate: '2030-1-1',
      success: (res) => {
        t.setData({ "date_1": res.date });
        t.onLoad();
      },
    });
  },
  newdate_2() {
    var t = this;
    dd.datePicker({
      currentDate: t.data.date_2,
      startDate: '2020-1-1',
      endDate: '2030-1-1',
      success: (res) => {
        t.setData({ "date_2": res.date });
        t.onLoad();
      },
    });
  },
  handleListItemTap(e) {
    var d = this.data.listData.data[e.currentTarget.dataset.index];
    dd.navigateTo({
      url: '../ProjectDiaryLook/ProjectDiaryLook?no_ls=' + d.no_ls
    });
  },
  onShow() {
    var t = this;
    dd.getStorage({
      key: 'is_on_show_refresh',
      success: function (res) {
        if (res.data) {
          dd.setStorage({ key: 'is_on_show_refresh', data: false });
          t.onLoad();
        }
      }
    });
  },
  onLoad(e) {
    var t = this;
    if (t.data.date_1 == '') {
      var now = new Date();
      var now_1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      t.setData({ "date_1": now_1.getFullYear() + "-" + (now_1.getMonth() + 1) + "-" + (now_1.getDate()) });
      t.setData({ "date_2": now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate()) });
      t.setData({ "id_acc": e.id_acc });
    }
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
        t.setData({ "date_1_more": t.data.date_1 });
        dd.httpRequest({
          url: "http://47.114.96.139:8888/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            date_start: t.data.date_1,
            date_end: t.data.date_2 + " 23:59:59",
            id_acc: t.data.id_acc,
            name_space: "ProjectM.ProjectDiaryListLook.LoadCardView"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({ content: JSON.stringify(res2) });
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += d.diary;
              var title_2 = "";

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                //, extra: "查看详情"
                , textMode: "wrap"
                , no_ls: d_1[i].no_ls
                , title_2: title_2
              };
              d_2.push(d);
            }
            t.setData({ "listData.data": d_2 });
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
  onReachBottom() {
    var t = this;
    //载入等待
    dd.showLoading({
      content: '加载中...',
      delay: '1000',
    });
    //载入列表
    var date_11 = new Date(t.data.date_1_more);
    var date_12 = new Date(date_11.getTime() - 7 * 24 * 60 * 60 * 1000);
    var date_13 = new Date(date_11.getTime() - 1 * 24 * 60 * 60 * 1000);
    var date_start = date_12.getFullYear() + "-" + (date_12.getMonth() + 1) + "-" + (date_12.getDate());
    var date_end = date_13.getFullYear() + "-" + (date_13.getMonth() + 1) + "-" + (date_13.getDate());
    t.setData({ "date_1_more":  date_start});
    dd.httpRequest({
      url: "http://47.114.96.139:8888/ActBack.ashx",
      method: 'POST',
      data: {
        username: t.data.login.username,
        code_login: t.data.login.code_login,
        date_start: date_start,
        date_end: date_end + " 23:59:59",
        id_acc: t.data.id_acc,
        name_space: "ProjectM.ProjectDiaryListLook.LoadCardView"
      },
      dataType: 'json',
      success: (res2) => {
        //dd.alert({ content: JSON.stringify(res2) });
        var d_1 = res2.data.json_ar_0;
        var d_2 = [];
        for (var i = 0; i < d_1.length; i++) {
          var d = d_1[i];
          var title_1 = "";
          title_1 += d.diary;
          var title_2 = "";

          var d = {
            title: title_1
            , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
            //, extra: "查看详情"
            , textMode: "wrap"
            , no_ls: d_1[i].no_ls
            , title_2: title_2
          };
          t.data.listData.data.push(d);
        }
        t.setData({ "listData.data": t.data.listData.data });
      },
      fail: (res2) => {
        dd.alert({ content: JSON.stringify(res2) });
      },
      complete: (res2) => {
        dd.hideLoading();
      },
    });
  }
})