const black87 = 'rgba(black, 0.87)';
const white87 = 'rgba(white, 0.87)';
const black12 = 'rgba(black, 0.12)';
const white12 = 'rgba(white, 0.12)';
const black6 = 'rgba(black, 0.06)';
const white6 = 'rgba(white, 0.06)';
const themeColors: any = {
  red: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    A100: '#ff8a80',
    A200: '#ff5252',
    A400: '#ff1744',
    A700: '#d50000',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: 'white',
      A700: 'white',
    },
  },

  pink: {
    50: '#fce4ec',
    100: '#f8bbd0',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
    A100: '#ff80ab',
    A200: '#ff4081',
    A400: '#f50057',
    A700: '#c51162',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: 'white',
      A700: 'white',
    },
  },

  purple: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    A100: '#ea80fc',
    A200: '#e040fb',
    A400: '#d500f9',
    A700: '#aa00ff',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: 'white',
      400: 'white',
      500: white87,
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: 'white',
      A700: 'white',
    },
  },

  'deep-purple': {
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#673ab7',
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
    A100: '#b388ff',
    A200: '#7c4dff',
    A400: '#651fff',
    A700: '#6200ea',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: 'white',
      400: 'white',
      500: white87,
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: white87,
      A700: white87,
    },
  },

  indigo: {
    50: '#e8eaf6',
    100: '#c5cae9',
    200: '#9fa8da',
    300: '#7986cb',
    400: '#5c6bc0',
    500: '#3f51b5',
    600: '#3949ab',
    700: '#303f9f',
    800: '#283593',
    900: '#1a237e',
    A100: '#8c9eff',
    A200: '#536dfe',
    A400: '#3d5afe',
    A700: '#304ffe',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: 'white',
      400: 'white',
      500: white87,
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: 'white',
      A700: white87,
    },
  },

  blue: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: white87,
      900: white87,
      A100: black87,
      A200: 'white',
      A400: 'white',
      A700: 'white',
    },
  },

  'light-blue': {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    A100: '#80d8ff',
    A200: '#40c4ff',
    A400: '#00b0ff',
    A700: '#0091ea',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: 'white',
      900: white87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: 'white',
    },
  },

  cyan: {
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
    A100: '#84ffff',
    A200: '#18ffff',
    A400: '#00e5ff',
    A700: '#00b8d4',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: 'white',
      900: white87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  teal: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#009688',
    600: '#00897b',
    700: '#00796b',
    800: '#00695c',
    900: '#004d40',
    A100: '#a7ffeb',
    A200: '#64ffda',
    A400: '#1de9b6',
    A700: '#00bfa5',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: white87,
      900: white87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  green: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    A100: '#b9f6ca',
    A200: '#69f0ae',
    A400: '#00e676',
    A700: '#00c853',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: white87,
      900: white87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  'light-green': {
    50: '#f1f8e9',
    100: '#dcedc8',
    200: '#c5e1a5',
    300: '#aed581',
    400: '#9ccc65',
    500: '#8bc34a',
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
    A100: '#ccff90',
    A200: '#b2ff59',
    A400: '#76ff03',
    A700: '#64dd17',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: black87,
      600: black87,
      700: black87,
      800: 'white',
      900: 'white',
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  lime: {
    50: '#f9fbe7',
    100: '#f0f4c3',
    200: '#e6ee9c',
    300: '#dce775',
    400: '#d4e157',
    500: '#cddc39',
    600: '#c0ca33',
    700: '#afb42b',
    800: '#9e9d24',
    900: '#827717',
    A100: '#f4ff81',
    A200: '#eeff41',
    A400: '#c6ff00',
    A700: '#aeea00',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: black87,
      600: black87,
      700: black87,
      800: black87,
      900: 'white',
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  yellow: {
    50: '#fffde7',
    100: '#fff9c4',
    200: '#fff59d',
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b',
    600: '#fdd835',
    700: '#fbc02d',
    800: '#f9a825',
    900: '#f57f17',
    A100: '#ffff8d',
    A200: '#ffff00',
    A400: '#ffea00',
    A700: '#ffd600',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: black87,
      600: black87,
      700: black87,
      800: black87,
      900: black87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  amber: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
    A100: '#ffe57f',
    A200: '#ffd740',
    A400: '#ffc400',
    A700: '#ffab00',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: black87,
      600: black87,
      700: black87,
      800: black87,
      900: black87,
      A100: black87,
      A200: black87,
      A400: black87,
      A700: black87,
    },
  },

  orange: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    A100: '#ffd180',
    A200: '#ffab40',
    A400: '#ff9100',
    A700: '#ff6d00',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: black87,
      600: black87,
      700: black87,
      800: 'white',
      900: 'white',
      A100: black87,
      A200: black87,
      A400: black87,
      A700: 'black',
    },
  },

  'deep-orange': {
    50: '#fbe9e7',
    100: '#ffccbc',
    200: '#ffab91',
    300: '#ff8a65',
    400: '#ff7043',
    500: '#ff5722',
    600: '#f4511e',
    700: '#e64a19',
    800: '#d84315',
    900: '#bf360c',
    A100: '#ff9e80',
    A200: '#ff6e40',
    A400: '#ff3d00',
    A700: '#dd2c00',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: black87,
      500: 'white',
      600: 'white',
      700: 'white',
      800: 'white',
      900: 'white',
      A100: black87,
      A200: black87,
      A400: 'white',
      A700: 'white',
    },
  },

  brown: {
    50: '#efebe9',
    100: '#d7ccc8',
    200: '#bcaaa4',
    300: '#a1887f',
    400: '#8d6e63',
    500: '#795548',
    600: '#6d4c41',
    700: '#5d4037',
    800: '#4e342e',
    900: '#3e2723',
    A100: '#d7ccc8',
    A200: '#bcaaa4',
    A400: '#8d6e63',
    A700: '#5d4037',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: 'white',
      400: 'white',
      500: white87,
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: black87,
      A400: 'white',
      A700: white87,
    },
  },

  'blue-grey': {
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#607d8b',
    600: '#546e7a',
    700: '#455a64',
    800: '#37474f',
    900: '#263238',
    A100: '#cfd8dc',
    A200: '#b0bec5',
    A400: '#78909c',
    A700: '#455a64',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: black87,
      400: 'white',
      500: 'white',
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: black87,
      A400: 'white',
      A700: white87,
    },
  },

  dark: {
    50: '#ECECEE',
    100: '#C5C6CB',
    200: '#9EA1A9',
    300: '#7D818C',
    400: '#5C616F',
    500: '#3C4252',
    600: '#353A48',
    700: '#2D323E',
    800: '#262933',
    900: '#1E2129',
    A100: '#C5C6CB',
    A200: '#9EA1A9',
    A400: '#5C616F',
    A700: '#2D323E',
    contrast: {
      50: black87,
      100: black87,
      200: black87,
      300: 'white',
      400: 'white',
      500: white87,
      600: white87,
      700: white87,
      800: white87,
      900: white87,
      A100: black87,
      A200: white87,
      A400: white87,
      A700: white87,
    },
  },
};

const allColorsName = Object.keys(themeColors);
const allColors = allColorsName.map((name) => themeColors[name]);

const colorReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

export class ThemeColorService {
  public static themeColors = themeColors;
  public static allColors = allColors;
  public static allColorsName = allColorsName;

  public static getColor(colorName: string): any {
    return themeColors[colorName] || false;
  }

  public static colorHex(color: string): any {
    if (/^(rgb|RGB)/.test(color)) {
      const aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex === '0') {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = color;
      }
      return strHex;
    } else if (colorReg.test(color)) {
      const aNum = color.replace(/#/, '').split('');
      if (aNum.length === 6) {
        return color;
      } else if (aNum.length === 3) {
        let numHex = '#';
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return color;
    }
  }

  public static colorRgb(color: string): string {
    let sColor = color.toLowerCase();
    if (sColor && colorReg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return 'RGB(' + sColorChange.join(',') + ')';
    } else {
      return sColor;
    }
  }

  /**
   * 获取颜色亮度 https://www.zhangxinxu.com/wordpress/2018/11/css-background-color-font-auto-match/
   * lightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
   * @param color - 颜色
   * @returns - 颜色亮度
   */
  public static lightness(color: string): number {
    const reg = ThemeColorService.colorRgb(color).split(/(\d+),(\d+),(\d+)/);
    return (
      (Number(reg[1]) * 0.2126 +
        Number(reg[2]) * 0.7152 +
        Number(reg[3]) * 0.0722) /
      255
    );
  }

  /**
   * 背景色自动配文字颜色
   * @param color - 背景颜色
   * @param threshold - 文字颜色变色的临界值，议建0.5~0.6
   * @returns - 文字颜色
   */
  public static contrastColor(color: string, threshold = 0.5): string {
    const lightness = ThemeColorService.lightness(color);
    const val = -((lightness - threshold) * 999999) / 100;
    return `hsl(0, 0%, ${val}%)`;
  }

  /**
   * 背景色自动配边框色
   * @param color - 背景颜色
   * @param threshold - 深色边框出现的临界值，范围0~1，推荐0.8+
   * @returns - 边框色
   */
  public static BorderColor(color: string, threshold = 0.8): string {
    const reg = ThemeColorService.colorRgb(color).split(/(\d+),(\d+),(\d+)/);
    const lightness =
      (Number(reg[1]) * 0.2126 +
        Number(reg[2]) * 0.7152 +
        Number(reg[3]) * 0.0722) /
      255;
    const borderAlpha = (lightness - threshold) / 100;
    // 背景颜色越浅，边框透明度越大，边框颜色越深
    return `rgba(${Number(reg[1]) - 50},${Number(reg[2]) - 50},${
      Number(reg[3]) - 50
    },${borderAlpha})`;
  }
}
