Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    pic_list: [],
    no_purchase_1: "",
  },
  add() {
    var t = this;
    dd.chooseImage({
      count: 10,
      success: (res) => {
        var qty_sort = 0;
        if (t.data.pic_list.length > 0) qty_sort = t.data.pic_list[t.data.pic_list.length - 1].qty_sort;
        for (var i = 0; i < res.filePaths.length; i++) {
          qty_sort++;
          //载入等待
          dd.showLoading({
            content: '加载中...',
            delay: '1000',
          });
          //载入列表
          dd.uploadFile({
            url: 'http://47.114.96.139:8888/FileUp.ashx'
              + "?name_table=ls_purchase_1"
              + "&name_column=pic"
              + "&no_key=" + t.data.no_purchase_1
              + "&qty_sort=" + qty_sort
              + "&username=" + t.data.login.username
              + "&code_login=" + t.data.login.code_login,
            fileType: 'image',
            fileName: 'file',
            filePath: res.filePaths[i],
            success: (res2) => {
              t.onLoad();
            },
          });
        }
      },
    });
  },
  del() {
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
        no_bill: t.data.no_purchase_1,
        name_space: "StorageWork.PurchaseList1Add.Delete"
      },
      dataType: 'json',
      success: (res2) => {
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
  onTap(e) {
    var t = this;
    var qty_sort = e.target.targetDataset.name;
    dd.showActionSheet({
      title: qty_sort,
      items: ['换图', '删除'],
      //cancelButtonText: '取消',
      success: (res) => {
        if (res.index == 0) {
          dd.chooseImage({
            count: 1,
            success: (res2) => {
              //载入等待
              dd.showLoading({
                content: '加载中...',
                delay: '1000',
              });
              //载入列表
              dd.uploadFile({
                url: 'http://47.114.96.139:8888/FileUp.ashx'
                  + "?name_table=ls_purchase_1"
                  + "&name_column=pic"
                  + "&no_key=" + t.data.no_purchase_1
                  + "&qty_sort=" + qty_sort
                  + "&username=" + t.data.login.username
                  + "&code_login=" + t.data.login.code_login,
                fileType: 'image',
                fileName: 'file',
                filePath: res2.filePaths[0],
                success: (res3) => {
                  t.onLoad();
                },
                fail: (res3) => {
                  dd.alert({ content: JSON.stringify(res3) });
                },
                complete: (res3) => {
                  dd.hideLoading();
                },
              });
            },
          });
        }
        else if (res.index == 1) {
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
              name_table: "ls_purchase_1",
              name_column: "pic",
              no_key: t.data.no_purchase_1,
              qty_sort: qty_sort,
              name_space: "StorageWork.PurchasePic.Delete"
            },
            dataType: 'json',
            success: (res2) => {
              t.onLoad();
            },
            fail: (res2) => {
              dd.alert({ content: JSON.stringify(res2) });
            },
            complete: (res2) => {
              dd.hideLoading();
            },
          });
        }
      },
    });
  },
  onLoad(e) {
    var t = this;
    if (t.data.no_purchase_1 == "") t.setData({ "no_purchase_1": e.no_purchase_1 });
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
            no_purchase_1: t.data.no_purchase_1,
            name_space: "StorageWork.PurchasePic.BindinggridControl1"
          },
          dataType: 'json',
          success: (res2) => {
            t.setData({ "pic_list": res2.data.json_ar_0 });
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