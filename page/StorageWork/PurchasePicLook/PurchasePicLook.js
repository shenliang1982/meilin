Page({
  data: {
    login: {
      username: "",
      code_login: ""
    },
    pic_list: [],
    no_purchase_1: "",
  },
  onTap(e) {
    var t = this;
    var qty_sort = e.target.targetDataset.name;
    dd.showActionSheet({
      title: qty_sort,
      items: ['换图', '删图'],
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
                  + "&code_login=" + t.data.login.code_login
                  + "&name_space=StorageWork.PurchasePic.BindinggridControl1",
                fileType: 'image',
                fileName: 'file',
                filePath: res2.filePaths[0],
                success: (res3) => {
                  if (res3.data.substr(0, 4) == "http") t.onLoad();
                  else dd.alert({ content: res3.data });
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
              if (res2.data.is_ok) t.onLoad();
              else dd.alert({ content: res2.data.error });
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
  onLongTap(e) {
    dd.alert({ content: e.target.targetDataset.name });
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
          complete: () => {
            dd.hideLoading();
          },
        });
      }
    });
  }
})