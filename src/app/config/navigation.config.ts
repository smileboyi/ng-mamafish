export interface NavigationItem {
  // 多级id共同组成一个路由地址
  id: string;
  groupTitle?: string;
  title?: string;
  type: 'item' | 'group';
  icon?: string;
  // 游客>普通用户>管理员
  role?: 'full' | 'user' | 'manager';
  children?: Array<NavigationItem>;
}

export const navigation: Array<NavigationItem> = [
  {
    id: 'general',
    groupTitle: '常规',
    type: 'group',
    role: 'full',
    children: [
      {
        id: 'dashboard',
        title: '仪表盘',
        type: 'group',
        icon: '',
        role: 'full',
        children: [
          {
            id: 'analytics',
            title: '分析页',
            type: 'item',
            role: 'full'
          }
        ]
      },
      {
        id: 'pages',
        title: '页面',
        type: 'group',
        icon: '',
        role: 'full',
        children: [
          {
            id: 'profile',
            title: '个人主页',
            type: 'item',
            role: 'full'
          },
          {
            id: 'errors',
            title: '错误页',
            type: 'group',
            role: 'full',
            children: [
              {
                id: 'errors_403',
                title: '403',
                type: 'item',
                role: 'full'
              },
              {
                id: 'errors_404',
                title: '404',
                type: 'item',
                role: 'full'
              },
              {
                id: 'errors_500',
                title: '500',
                type: 'item',
                role: 'full'
              }
            ]
          },
          {
            id: 'login',
            title: '登录',
            type: 'item',
            role: 'full'
          },
          {
            id: 'register',
            title: '注册',
            type: 'item',
            role: 'full'
          }
        ]
      }
    ]
  },
  {
    id: 'application',
    groupTitle: '应用',
    type: 'group',
    role: 'user',
    children: [
      {
        id: 'users',
        title: '用户',
        type: 'item',
        icon: '',
        role: 'manager'
      },
      {
        id: 'mailbox',
        title: '邮箱',
        type: 'item',
        icon: '',
        role: 'user'
      },
      {
        id: 'chat',
        title: '会话',
        type: 'item',
        icon: '',
        role: 'user'
      }
    ]
  },
  {
    id: 'service',
    groupTitle: '服务',
    type: 'group',
    role: 'full',
    children: [
      {
        id: 'data-table',
        title: '数据表',
        type: 'item',
        icon: '',
        role: 'user'
      },
      {
        id: 'screenshot',
        title: '屏幕截图',
        type: 'item',
        icon: '',
        role: 'user'
      }
    ]
  }
];
