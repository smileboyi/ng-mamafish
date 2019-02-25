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
    hidden: boolean;
    position: Position;
  };
  toolbar: {
    background: string;
    hidden: boolean;
    position: Position;
  };
  footer: {
    background: string;
    hidden: boolean;
    position: Position;
  };
  sidepanel: {
    hidden: boolean;
    position: Position;
  };
}

export const defaultLayoutConfig: LayoutConfig = {
  width: 'boxed',
  navbar: {
    background: '',
    collapsed: false,
    hidden: false,
    position: 'start'
  },
  toolbar: {
    background: '',
    hidden: false,
    position: 'below-fixed'
  },
  footer: {
    background: '',
    hidden: false,
    position: 'above'
  },
  sidepanel: {
    hidden: false,
    position: 'right'
  }
};
