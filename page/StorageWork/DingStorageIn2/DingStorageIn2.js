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
    no_bill: ""
  },
  add_pic() {
    dd.navigateTo({
      url: '../StorageInPic/StorageInPic?no_storage_in_1=' + this.data.no_bill
    });
  },
  handleListItemTap(e) {
    var d = this.data.listData.data[e.currentTarget.dataset.index];
    dd.navigateTo({
      url: '../DingStorageInQty/DingStorageInQty?no_body=' + d.no_body
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
          url: "http://47.114.96.139:8888/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            no_bill: t.data.no_bill,
            name_space: "StorageWork.DingStorageIn.BindinggridControl2"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[供应商]" + d.name_company;
              title_1 += "\n[规格]" + d.name_item;
              title_1 += "\n[采购数量]" + d.qty_purchase;
              title_1 += "\n[剩余数量]" + d.qty_left;
              title_1 += "\n[入库数量]" + d.qty;
              var title_2 = "";

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                , extra: "改入库数"
                , textMode: "wrap"
                , no_body: d.no_body
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