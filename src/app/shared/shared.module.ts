import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QuillModule } from 'ngx-quill';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { LAYOUT_CONFIG, PROFILE_INFO } from '@tokens';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { ThemePanelComponent } from './components/theme-panel/theme-panel.component';
import { BgHeaderComponent } from './components/bg-header/bg-header.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { KeysPipe } from './pipes/keys.pipe';

const APP_CORE_PROVIDERS = [
  {
    provide: LAYOUT_CONFIG,
    useValue: 'layout_config',
  },
  {
    provide: PROFILE_INFO,
    useValue: 'profile_info',
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxPermissionsModule,
    ScrollingModule,
    DragDropModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    NzSelectModule,
    NzAvatarModule,
    NzFormModule,
    NzModalModule,
    NzInputModule,
    NzTableModule,
    NzSpinModule,
    NzResultModule,
    NzTabsModule,
    NzSkeletonModule,
    NzBackTopModule,
    NzPaginationModule,
    NzDividerModule,
    NzCheckboxModule,
    NzProgressModule,
    NzToolTipModule,
    NzPopoverModule,
    NzRadioModule,
    NzSwitchModule,
    NzIconModule,
    NzMessageModule,
    NzDatePickerModule,
  ],
  declarations: [
    ThemePanelComponent,
    BgHeaderComponent,
    ThrottleClickDirective,
    PaginatePipe,
    KeysPipe,
  ],
  providers: [...APP_CORE_PROVIDERS],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // QuillModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    ScrollingModule,
    DragDropModule,
    NgxPermissionsModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    NzSelectModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzTableModule,
    NzSpinModule,
    NzResultModule,
    NzTabsModule,
    NzSkeletonModule,
    NzBackTopModule,
    NzPaginationModule,
    NzDividerModule,
    NzCheckboxModule,
    NzProgressModule,
    NzToolTipModule,
    NzPopoverModule,
    NzRadioModule,
    NzSwitchModule,
    NzIconModule,
    NzMessageModule,
    NzDatePickerModule,
    ThemePanelComponent,
    BgHeaderComponent,
    ThrottleClickDirective,
    PaginatePipe,
    KeysPipe,
  ],
})
export class SharedModule {}
