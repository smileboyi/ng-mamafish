import { UserRole } from '@declare';

export interface NavigationItem {
  // 多级id共同组成一个路由地址
  id: string;
  groupTitle?: string;
  title?: string;
  type: 'item' | 'group';
  icon?: string;
  // 权限：游客<普通用户<管理员
  role?: UserRole;
  children?: Array<NavigationItem>;
}

export const navigation: Array<NavigationItem> = [
  {
    id: 'general',
    groupTitle: '常规',
    type: 'group',
    role: UserRole.Full,
    children: [
      {
        id: 'dashboard',
        title: '仪表盘',
        type: 'group',
        icon: 'dashboard',
        role: UserRole.Full,
        children: [
          {
            id: 'analytics',
            title: '分析页',
            type: 'item',
            role: UserRole.Full
          }
        ]
      },
      {
        id: 'pages',
        title: '页面',
        type: 'group',
        icon: 'page',
        role: UserRole.Full,
        children: [
          {
            id: 'profile',
            title: '个人主页',
            type: 'item',
            role: UserRole.Full
          },
          {
            id: 'errors',
            title: '错误页',
            type: 'group',
            role: UserRole.Full,
            children: [
              {
                id: 'errors_403',
                title: '403',
                type: 'item',
                role: UserRole.Full
              },
              {
                id: 'errors_404',
                title: '404',
                type: 'item',
                role: UserRole.Full
              },
              {
                id: 'errors_500',
                title: '500',
                type: 'item',
                role: UserRole.Full
              }
            ]
          },
          {
            id: 'login',
            title: '登录',
            type: 'item',
            role: UserRole.Full
          },
          {
            id: 'register',
            title: '注册',
            type: 'item',
            role: UserRole.Full
          }
        ]
      }
    ]
  },
  {
    id: 'application',
    groupTitle: '应用',
    type: 'group',
    role: UserRole.User,
    children: [
      {
        id: 'users',
        title: '人员',
        type: 'item',
        icon: 'users',
        role: UserRole.Manager
      },
      {
        id: 'mailbox',
        title: '邮箱',
        type: 'item',
        icon: 'youxiang',
        role: UserRole.User
      },
      {
        id: 'chat',
        title: '会话',
        type: 'item',
        icon: 'message',
        role: UserRole.User
      }
    ]
  },
  {
    id: 'service',
    groupTitle: '服务',
    type: 'group',
    role: UserRole.User,
    children: [
      {
        id: 'data-table',
        title: '数据表',
        type: 'item',
        icon: 'biao',
        role: UserRole.User
      },
      {
        id: 'screenshot',
        title: '屏幕截图',
        type: 'item',
        icon: 'screenshot',
        role: UserRole.User
      }
    ]
  }
];
