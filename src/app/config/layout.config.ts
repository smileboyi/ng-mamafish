import { ThemeColor } from '@declare';

declare type Position =
  | 'above'
  | 'above-static'
  | 'above-fixed'
  | 'below'
  | 'below-fixed'
  | 'left'
  | 'right'
  | 'start'
  | 'end';

export interface LayoutConfig {
  width: 'fullwidth' | 'boxed';
  navbar: {
    collapsed: boolean;
    show: boolean;
    position: Position;
    theme: ThemeColor;
  };
  toolbar: {
    show: boolean;
    position: Position;
    theme: ThemeColor;
  };
  footer: {
    show: boolean;
    position: Position;
    theme: ThemeColor;
  };
  sidepanel: {
    show: boolean;
    position: Position;
  };
}

export const defaultLayoutConfig: LayoutConfig = {
  width: 'fullwidth',
  navbar: {
    collapsed: false,
    show: true,
    position: 'left',
    theme: {
      selectedFg: '#1e88e5',
      selectedBg: '#fff',
    },
  },
  toolbar: {
    show: true,
    position: 'above-fixed',
    theme: {
      selectedFg: '#1e88e5',
      selectedBg: 'rgba(255, 255, 255, 0.7)',
    },
  },
  footer: {
    show: true,
    position: 'below',
    theme: {
      selectedFg: '#2d323e',
      selectedBg: 'rgba(255, 255, 255, 0.87)',
    },
  },
  sidepanel: {
    show: true,
    position: 'right',
  },
};

// 与_themeColor.less一致
export const defaultThemeColor = {
  toolbar: {
    '--toolbarThemeFg': '#1e88e5',
    '--toolbarThemeBg': 'rgba(255, 255, 255, 0.7)',
  },
  footer: {
    '--footerThemeFg': '#2d323e',
    '--footerThemeBg': 'rgba(255, 255, 255, 0.87)',
  },
  navbar: {
    '--navbarThemeFg': '#1e88e5',
    '--navbarThemeBg': '#fff',
  },
};
