export default (() => {
  window.$GLOBALCONFIG = {};
  +function (global) {
    // 本地开发打开的路径以及端口
    global.$ctx = 'http://localhost:8000';

    // 用户登录信息
    global.STAFF = {
      code: 'admin',
      name: 'xiaotouming',
    };

    // 系统一二级菜单
    global.NAVIGATION = [
      {
        id: 600110230,
        name: 'Basic',
        icon: 'book',
        url: '',
        children: [
            { id: 600110231, name: '表格', url: 'table', icon: 'user' },
            { id: 600110232, name: '编辑器', url: 'editor', icon: 'area-chart' }
        ],
      },
      {
        id: 600110630,
        name: 'WebGL',
        icon: 'book',
        url: '',
        children: [
            { id: 600110631, name: 'gl', url: 'webgl', icon: 'user' }
        ],
      },
      {
        id: 600110330,
        name: 'D3',
        icon: 'book',
        url: '',
        children: [
            { id: 600110331, name: 'Dcharts', url: 'dcharts', icon: 'area-chart' },
        ],
      },
      {
        id: 600110430,
        name: 'Echarts',
        icon: 'book',
        url: '',
        children: [
            { id: 600110431, name: 'Pie', url: 'echarts', icon: 'area-chart' },
        ],
      },
      {
        id: 600110530,
        name: 'Others',
        icon: 'calculator',
        url: '',
        children: [
            { id: 600110532, name: '聊天室', url: 'chat', icon: 'book' },
        ],
      },
    ];
  }(window.$GLOBALCONFIG);
})()

