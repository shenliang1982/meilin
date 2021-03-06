import list from '/page/biz/components/list';

Page({
  ...list,
  data: {
    listData: {
      onItemTap: 'handleListItemTap',
      onItemLongTap: 'onItemLongTap',
      //header: '日志列表',
      data: []
    },
    login: {
      username: "",
      code_login: ""
    },
  },
  add_scan() {
    var t = this;
    dd.scan({
      type: 'qr',
      success: (res) => {
        //dd.alert({ title: res.code });
        //载入等待
        dd.showLoading({
          content: '加载中...',
          delay: '1000',
        });
        //提交数据
        dd.httpRequest({
          url: "http://47.114.96.139:8888/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_purchase_12: res.code,
            name_space: "StorageWork.DingStorageIn.AddIn"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            t.onLoad();
          },
          fail: (res2) => {
            dd.alert({ content: JSON.stringify(res2) });
          },
          complete: (res2) => {
            dd.hideLoading();
          },
        });
      },
    });
  },
  add_enter() {
    dd.navigateTo({
      url: '../DingStorageInAdd/DingStorageInAdd'
    });
  },
  onItemLongTap(e){
    var d = this.data.listData.data[e.currentTarget.dataset.index];
    dd.navigateTo({
      url: '../StorageInPic/StorageInPic?no_storage_in_1=' + d.no_bill
    });
  },
  handleListItemTap(e) {
    var d = this.data.listData.data[e.currentTarget.dataset.index];
    dd.navigateTo({
      url: '../DingStorageIn2/DingStorageIn2?no_bill=' + d.no_bill
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
            name_space: "StorageWork.DingStorageIn.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[仓库]" + d.name_warehouse;
              title_1 += "\n[采购单号]" + d.no_purchase_1;
              title_1 += "\n[供应商]" + d.name_company;
              title_1 += "\n[日期]" + d.date_bill;
              var title_2 = "";

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                //, extra: "改入库数"
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