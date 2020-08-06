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
        }, {
          icon: '/image/form.png',
          title: '查看',
          entitle: 'Diary',
          page: 'ProjectDiaryListLookDept',
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
            name_menu_1: "梅霖",
            name_space: "Purview.MenuLeft.HideMenu2"
          },
          dataType: 'json',
          success: (res2) => {
            var d_1 = res2.data.json_ar_0;
            var d_2 = t.data.arr.list;
            for (var i = 0; i < d_1.length; i++) {
              for (var j = 0; j < d_2.length; j++) {
                if (d_2[j].title == d_1[i].name_menu_2) {
                  d_2.splice(j, 1);
                  break;
                }
              }
            }
            t.setData({ "arr.list": [] });
            t.setData({ "arr.list": d_2 });
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
