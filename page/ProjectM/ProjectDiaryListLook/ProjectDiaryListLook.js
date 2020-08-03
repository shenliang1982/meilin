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
    userid_ding: '',
    dept_ding: '',
    name_ding: '部门人员',
  },
  new_dept_ding() {
    var t = this;
    dd.complexChoose({
      title: "部门人员",            //标题
      multiple: false,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      success: function (res) {
        if (res.users.length > 0) {
          t.setData({ "userid_ding": res.users[0].userId });
          t.setData({ "dept_ding": "" });
          t.setData({ "name_ding": res.users[0].name });
        }
        else if (res.departments.length > 0) {
          t.setData({ "userid_ding": "" });
          t.setData({ "dept_ding": res.departments[0].name });
          t.setData({ "name_ding": res.departments[0].name });
        }
        t.onLoad();
      },
      fail: function (err) {
      }
    })
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
  onLoad() {
    var t = this;
    if (t.data.date_1 == '') {
      var now = new Date();
      t.setData({ "date_1": now.getFullYear() + "-" + (now.getMonth() + 1) + "-01" });
      t.setData({ "date_2": now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate()) });
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
          url: "http://47.114.96.139:8888/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            date_start: t.data.date_1,
            date_end: t.data.date_2 + " 23:59:59",
            dept_ding: t.data.dept_ding,
            userid_ding: t.data.userid_ding,
            name_space: "ProjectM.ProjectDiaryListLook.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({ content: JSON.stringify(res2) });
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[日志时间]" + d.date_diary.substr(0, 10);
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