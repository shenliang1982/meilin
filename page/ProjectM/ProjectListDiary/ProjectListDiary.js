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
    date_diary: '',
    no_project: '',
  },
  newdate() {
    var t = this;
    dd.datePicker({
      currentDate: t.data.date_diary,
      startDate: '2020-1-1',
      endDate: '2030-1-1',
      success: (res) => {
        t.setData({ "date_diary": res.date });
        t.onLoad();
      },
    });
  },
  handleListItemTap(e) {
    var t = this;
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
    if(t.data.date_diary == ''){
      var now = new Date();
      t.setData({ "date_diary": now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate()) });
      t.setData({ "no_project": e.no_project });
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
        dd.httpRequest({
          url: "http://47.114.96.139/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_project: t.data.no_project,
            date_start: t.data.date_diary,
            date_end: t.data.date_diary + " 23:59:59",
            name_space: "ProjectM.ProjectListDiary.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[日志日期]" + d.date_diary.substr(0, 10);;
              title_1 += "\n[项目名称]" + d.name_project;
              title_1 += "\n[填写者]" + d.pet_name;
              title_1 += "\n[关键字]" + d.keyword;
              var title_2 = "";
              title_2 += "[添加时间]" + d.date_make;
              title_2 += "\n[填写者]" + d.pet_name;

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                , extra: "查看详情"
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
  }
})