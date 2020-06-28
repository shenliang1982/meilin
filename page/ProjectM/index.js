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
          entitle: 'Project',
          page: 'ProjectList',
        }, {
          icon: '/image/basic.png',
          title: '日志',
          entitle: 'Diary',
          page: 'ProjectDiaryList',
        },
      ],
    },
    login: {
      username: "",
      code_login: ""
    },
  },
  onLoad(e) {
    //e.no_ls
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
          url: "http://47.114.96.139/ActBack.ashx",
          method: 'POST',
          data: {
            username: t.data.login.username,
            code_login: t.data.login.code_login,
            name_menu_1: "梅林",
            name_space: "Purview.MenuLeft.HideMenu2"
          },
          dataType: 'json',
          success: (res2) => {
            dd.alert({ content: JSON.stringify(res2) });
            var d_1 = res2.data.json_ar_0;
            for (var i = 0; i < d_1.length; i++) {
              for (var j = 0; j < t.data.arr.list.length; j++) {
                if (t.data.arr.list[j].title == d_1[i].name_menu_2) {
                  t.data.arr.list.splice(j, 1);
                }
              }
            }
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
      url: `${page}/${page}`,
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
