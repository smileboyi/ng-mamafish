import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ThemeColorService } from './theme-color.service';
import { ThemeColor } from '@declare';

@Component({
  selector: 'cat-theme-panel',
  templateUrl: './theme-panel.component.html',
  styleUrls: ['./theme-panel.component.less']
})
export class ThemePanelComponent implements OnInit {
  paletteColors = ThemeColorService.allColors;
  paletteColorsName = ThemeColorService.allColorsName;
  hueColors: Array<string>;
  hueColorsName: Array<string>;
  contrastColors: Array<string>;
  hues = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'A100',
    'A200',
    'A400',
    'A700'
  ];
  view = 'palettes';
  selectedPalette: string;
  selectedHue = '500';
  selectedFg = '#1e88e5';
  selectedBg = '#bcdcf7';
  selectedHueIndex: number;
  selectedColor = 'Select Color';

  @Input() themeColor: ThemeColor;
  @Input() themeType: 'navbar' | 'toolbar' | 'footer';
  @Output() setThemeColor: EventEmitter<ThemeColor> = new EventEmitter();
  @Output() resetThemeColor: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.themeColor) {
      this.selectedFg = this.themeColor.selectedFg;
      this.selectedBg = this.themeColor.selectedBg;
    }
  }

  selectPalette(index: number): void {
    this.selectedPalette = this.paletteColorsName[index];
    const hueColors = ThemeColorService.themeColors[this.selectedPalette];
    this.contrastColors = hueColors['contrast'];
    const hueColorsName = Object.keys(hueColors);
    const delIdx = hueColorsName.indexOf('contrast');
    hueColorsName.splice(delIdx, 1);
    this.hueColorsName = hueColorsName;
    this.hueColors = this.hueColorsName.map(name => hueColors[name]);
    this.view = 'hues';
  }

  selectHue(index: number): void {
    this.selectedHueIndex = index;
    this.selectedHue = this.hues[index];
    this.selectedFg = this.hueColors[index];
    this.selectedBg = this.contrastColors[this.selectedHue];
    this.selectedColor = this.selectedPalette + ' ' + this.selectedHue;
    this.setThemeColor.emit({
      // 背景色
      selectedFg: this.selectedFg,
      // 文字颜色
      selectedBg: this.selectedBg
    });
  }

  selectCustomize(): void {
    document.getElementById('colorCustomizeIpt').click();
  }

  colorChange(): void {
    const val = (<HTMLInputElement>document.getElementById('colorCustomizeIpt'))
      .value;
    this.selectedFg = val;
    this.selectedColor = val;
    this.selectedHue = '';
    this.selectedBg = ThemeColorService.contrastColor(val);
    this.setThemeColor.emit({
      selectedFg: val,
      selectedBg: this.selectedBg
    });
  }

  deleteColor(): void {
    this.view = 'palettes';
    this.selectedColor = 'Select Color';
    this.selectedFg = '#1e88e5';
    this.selectedBg = '#bcdcf7';
    this.resetThemeColor.emit(this.themeType);
  }
}
