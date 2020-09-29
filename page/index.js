import lifecycle from '/util/lifecycle';
import animModal from '/util/items';


Page({
  ...lifecycle,
  ...animModal.animOp,
  data: {
    ...animModal.data,
    pageName: 'ProjectM/index',
    pageInfo: {
      pageId: 0,
    },
    hidden: true,
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      onChildItemTap: 'onChildItemTap',
      list: [
        {
          icon: '/image/view.png',
          title: '项目',
          entitle: '梅霖/项目',
          page: 'ProjectM/ProjectList/ProjectList',
        }, {
          icon: '/image/basic.png',
          title: '日志',
          entitle: '梅霖/日志',
          page: 'ProjectM/ProjectDiaryList/ProjectDiaryList',
        }, {
          icon: '/image/form.png',
          title: '查看',
          entitle: '梅霖/日志查看',
          page: 'ProjectM/ProjectDiaryListLookDept/ProjectDiaryListLookDept',
        }, {
          icon: '/image/biz_errorview.png',
          title: '昨日日志',
          entitle: '项目报表/昨日情况',
          page: 'ProjectM/DiaryToday/DiaryToday',
        }, {
          icon: '/image/icon_component_HL.png',
          title: '采购图片',
          entitle: '采购入库/采购图片',
          page: 'StorageWork/PurchaseList1Add/PurchaseList1Add',
        },{
          icon: '/image/biz_tag.png',
          title: '采购确认',
          entitle: '采购入库/采购确认',
          page: 'StorageWork/PurchaseList3Ok/PurchaseList3Ok',
        },{
          icon: '/image/icon_component_HL.png',
          title: '采购审核',
          entitle: '采购入库/采购审核',
          page: 'StorageWork/PurchaseList5Check/PurchaseList5Check',
        },{
          icon: '/image/icon_component_HL.png',
          title: '采购抄送',
          entitle: '采购入库/采购抄送',
          page: 'StorageWork/PurchaseList6Manage/PurchaseList6Manage',
        },{
          icon: '/image/icon_biz_HL.png',
          title: '入库',
          entitle: '采购入库/扫描入库',
          page: 'StorageWork/DingStorageIn/DingStorageIn',
        },{
          icon: '/image/canvas.png',
          title: '入库确认',
          entitle: '采购入库/库管确认',
          page: 'StorageWork/StorageInListCheck/StorageInListCheck',
        },
      ],
    },
    login: {
      username: "",
      code_login: ""
    },
  },
  onLoad(e) {
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
            name_proj: "MeiLin",
            name_space: "Purview.MenuLeft.HideMenuDing"
          },
          dataType: 'json',
          success: (res2) => {
            var d_1 = res2.data.json_ar_0;
            var d_2 = t.data.arr.list;
            for (var i = 0; i < d_1.length; i++) {
              for (var j = 0; j < d_2.length; j++) {
                if (d_2[j].entitle == d_1[i].entitle) {
                  d_2.splice(j, 1);
                  break;
                }
              }
            }
            t.setData({ "arr.list": [] });
            t.setData({ "arr.list": d_2 });
          },
          fail: (res2) => {
            dd.alert({ content: "91" + JSON.stringify(res2) });
          },
          complete: (res2) => {
            dd.hideLoading();
          },
        });
      }
    });
  },
  onGridItemTap(e) {
    const curIndex = e.currentTarget.dataset.index;
    const childList = this.data.arr.list[curIndex];
    if (childList.subs) {
      this.setData({
        hidden: !this.data.hidden,
        curIndex,
      });
      this.createMaskShowAnim();
      this.createContentShowAnim();
    } else {
      this.onChildItemTap({
        currentTarget: {
          dataset: { page: childList.page },
        },
      });
    }
  },
  onChildItemTap(e) {
    const { page } = e.currentTarget.dataset;
    dd.navigateTo({
      url: `${page}`,
    });
  },
  onModalCloseTap() {
    this.createMaskHideAnim();
    this.createContentHideAnim();
    setTimeout(() => {
      this.setData({
        hidden: true,
      });
    }, 210);
  },
});
