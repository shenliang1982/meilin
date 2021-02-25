import list from '/page/biz/components/list';

Page({
  ...list,
  data: {
    listData: {
      onItemTap: 'handleListItemTap',
      //onItemLongTap: 'handleListItemLongTap',
      //header: 'list1',
      data: []
    },
    login: {
      username: "",
      code_login: "",
      url: ""
    },
    no_bill: ''
  },
  newdate_1() {
    var t = this;
    dd.datePicker({
      //format: 'yyyy-MM',
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
  add() {
    dd.navigateTo({
      url: '../PurchaseEditBody/PurchaseEditBody?no_bill=' + this.data.no_bill
    });
  },
  handleListItemTap(e) {
    var t = this;
    var d = t.data.listData.data[e.currentTarget.dataset.index];
    dd.navigateTo({
      url: '../PurchaseEditBody/PurchaseEditBody?no_bill=' + d.no_bill+'&no_body='+d.no_body
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
    if (t.data.no_bill == "") t.setData({ "no_bill": e.no_bill });
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
          url: t.data.login.url + "ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_bill: e.no_bill,
            name_space: "StorageWork.PurchaseList2Qty.BindinggridControl2"
          },
          dataType: 'json',
          success: (res2) => {
            if (res2.data.error != "") dd.alert({ content: res2.data.error });
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[大类]" + d.name_item_type;
              title_1 += "\n[规格]" + d.name_item;
              title_1 += "\n[单位]" + d.unit;
              title_1 += "\n[数量]" + d.qty;
              var title_2 = "";

              var dd_2 = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                //, extra: "查看详情"
                , textMode: "wrap"
                , no_body: d.no_body
                , no_bill: d.no_head
                , title_2: title_2
              };
              d_2.push(dd_2);
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