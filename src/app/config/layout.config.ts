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
    headBackground: string;
    bodyBackground: string;
    collapsed: boolean;
    show: boolean;
    position: Position;
  };
  toolbar: {
    background: string;
    show: boolean;
    position: Position;
  };
  footer: {
    background: string;
    show: boolean;
    position: Position;
  };
  sidepanel: {
    show: boolean;
    position: Position;
  };
}

export const defaultLayoutConfig: LayoutConfig = {
  width: 'fullwidth',
  navbar: {
    headBackground: '',
    bodyBackground: '',
    collapsed: false,
    show: true,
    position: 'left'
  },
  toolbar: {
    background: '',
    show: true,
    position: 'above-fixed'
  },
  footer: {
    background: '',
    show: true,
    position: 'below'
  },
  sidepanel: {
    show: true,
    position: 'right'
  }
};
