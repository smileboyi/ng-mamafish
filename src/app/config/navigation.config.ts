import { UserRole } from '@declare';
import { routingPathConfig as pathConfig } from './routing-path.config';

export interface NavigationItem {
  id: string;
  groupTitle?: string;
  title?: string;
  icon?: string;
  // 权限：游客<普通用户<管理员
  role: UserRole;
  url?: Array<string>;
  children?: Array<NavigationItem>;
}

export const navigationConfig: Array<NavigationItem> = [
  {
    id: 'general',
    groupTitle: '常规',
    role: UserRole.Full,
    children: [
      {
        id: 'dashboards',
        title: '仪表盘',
        icon: 'dashboard',
        role: UserRole.Full,
        children: [
          {
            id: 'analytics',
            title: '分析页',
            role: UserRole.Full,
            url: [pathConfig.app.general, pathConfig.general.dashboards]
          }
        ]
      },
      {
        id: 'pages',
        title: '页面',
        icon: 'page',
        role: UserRole.Full,
        children: [
          {
            id: 'profile',
            title: '个人主页',
            role: UserRole.User,
            url: [
              pathConfig.app.general,
              pathConfig.general.pages,
              pathConfig.pages.profile
            ]
          },
          {
            id: 'errors',
            title: '错误页',
            role: UserRole.Full,
            children: [
              {
                id: 'error_403',
                title: '403',
                role: UserRole.Full,
                url: [
                  pathConfig.app.general,
                  pathConfig.general.pages,
                  pathConfig.pages.errors
                ]
              },
              {
                id: 'error_404',
                title: '404',
                role: UserRole.Full,
                url: [
                  pathConfig.app.general,
                  pathConfig.general.pages,
                  pathConfig.pages.errors
                ]
              },
              {
                id: 'error_500',
                title: '500',
                role: UserRole.Full,
                url: [
                  pathConfig.app.general,
                  pathConfig.general.pages,
                  pathConfig.pages.errors
                ]
              }
            ]
          },
          {
            id: 'login',
            title: '登录',
            role: UserRole.Full,
            url: [
              pathConfig.app.general,
              pathConfig.general.pages,
              pathConfig.pages.login
            ]
          },
          {
            id: 'register',
            title: '注册',
            role: UserRole.Full,
            url: [
              pathConfig.app.general,
              pathConfig.general.pages,
              pathConfig.pages.register
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'applications',
    groupTitle: '应用',
    role: UserRole.User,
    children: [
      {
        id: 'users',
        title: '人员',
        icon: 'users',
        role: UserRole.Manager,
        url: [pathConfig.app.applications, pathConfig.applications.users]
      },
      {
        id: 'mailbox',
        title: '邮箱',
        icon: 'youxiang',
        role: UserRole.User,
        url: [pathConfig.app.applications, pathConfig.applications.mailBox]
      },
      {
        id: 'chat',
        title: '会话',
        icon: 'message',
        role: UserRole.User,
        url: [pathConfig.app.applications, pathConfig.applications.chat]
      }
    ]
  },
  {
    id: 'services',
    groupTitle: '服务',
    role: UserRole.User,
    children: [
      {
        id: 'data-table',
        title: '数据表',
        icon: 'biao',
        role: UserRole.User,
        url: [pathConfig.app.services, pathConfig.services.dataTable]
      },
      {
        id: 'screenshot',
        title: '屏幕截图',
        icon: 'screenshot',
        role: UserRole.User,
        url: [pathConfig.app.services, pathConfig.services.screenshot]
      }
    ]
  }
];

// 兄弟subMenu info,数组索引代表这个subMenu在navigationConfig中的位置
export const equalLevelsubMenuInfo: { [key: string]: Array<any> } = {
  v1: ['dashboards', 'pages'],
  v2: ['', 'errors']
};

// 父子subMenu依赖关系
export const relyLevelsubMenuInfo: Array<Array<string>> = [
  ['dashboards'],
  ['pages', 'errors']
];
