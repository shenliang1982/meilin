import list from '/page/biz/components/list';

Page({
  ...list,
  data: {
    listData: {
      onItemTap: 'handleListItemTap',
      //header: 'list1',
      data: []
    },
    login: {
      username: "",
      code_login: ""
    },
    date_1: '',
    date_2: '',
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
      url: '../PurchaseList6Manage2/PurchaseList6Manage2?no_bill=' + d.no_bill
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
      now.setMonth(now.getMonth() + 1);
      now.setDate(0);
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
            name_space: "StorageWork.PurchaseList6Manage.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[采购单号]" + d.no_bill;
              title_1 += "\n[采购日期]" + d.date_bill;
              title_1 += "\n[仓库]" + d.name_warehouse;
              var title_2 = "";

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                , arrow: 'horizontal'
                //, extra: "详情"
                , textMode: "wrap"
                , no_bill: d.no_bill
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