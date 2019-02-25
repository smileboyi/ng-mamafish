declare type Position =
  | 'above'
  | 'above-static'
  | 'above-fixed'
  | 'below'
  | 'below-static'
  | 'below-fixed'
  | 'left'
  | 'right'
  | 'start'
  | 'end';

export interface LayoutConfig {
  width: 'fullwidth' | 'boxed';
  navbar: {
    background: string;
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
  width: 'boxed',
  navbar: {
    background: '',
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
    position: 'below-fixed'
  },
  sidepanel: {
    show: true,
    position: 'right'
  }
};
