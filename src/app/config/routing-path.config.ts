export const routingPathConfig = {
  app: {
    default: '',
    general: 'general',
    applications: 'applications',
    services: 'services',
    wildcard: '**',
  },

  general: {
    default: '',
    dashboards: 'dashboards',
    pages: 'pages',
  },

  dashboards: {
    default: '',
    analytics: 'analytics',
  },

  pages: {
    default: '',
    profile: 'profile',
    errors: 'errors/:code',
    login: 'login',
    register: 'register',
  },

  applications: {
    default: '',
    users: 'users',
    mailBox: 'mail-box',
    chat: 'chat',
    editor: 'editor',
    formDesign: 'form-design',
  },

  services: {
    default: '',
    dataTable: 'data-table',
    screenshot: 'screenshot',
  },
};
