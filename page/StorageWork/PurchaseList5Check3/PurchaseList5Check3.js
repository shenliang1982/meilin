import list from '/page/biz/components/list';

Page({
  ...list,
  data: {
    listData: {
      //onItemTap: 'handleListItemTap',
      //header: 'list1',
      data: []
    },
    login: {
      username: "",
      code_login: ""
    },
    no_item: "",
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
    if (t.data.no_item == "") t.setData({ "no_item": e.no_item });
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
            no_item: t.data.no_item,
            name_space: "StorageWork.PurchaseList3Check.BindinggridControl3"
          },
          dataType: 'json',
          success: (res2) => {
            //dd.alert({content: "51" + JSON.stringify(res2.data)});
            var d_1 = res2.data.json_ar_0;
            var d_2 = [];
            for (var i = 0; i < d_1.length; i++) {
              var d = d_1[i];
              var title_1 = "";
              title_1 += "[日期]" + d.date_bill;
              title_1 += "\n[单价]" + d.price;
              var title_2 = "";

              var d = {
                title: title_1
                , thumb: "https://zos.alipayobjects.com/rmsportal/NTuILTPhmSpJdydEVwoO.png"
                //, extra: "查看详情"
                , textMode: "wrap"
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