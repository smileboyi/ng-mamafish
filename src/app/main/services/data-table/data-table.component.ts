import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { pick, flattenDeep } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PersonInfo } from '@declare';
import { personInfos } from '@mock/data.mock';
import { GlobalService } from '@services/global.service';
import { XlsxService } from '@services/xlsx.service';
import { messageText } from '@config/message-text.config';

interface CheckDataField {
  label: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'cat-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  dataSource: Array<PersonInfo> = personInfos;
  dataNum: number = personInfos.length;
  tableHeaders: { [k: string]: string } = {
    no: 'No.',
    name: 'Name',
    weight: 'Weight',
    sex: 'Sex',
    symbol: 'Symbol',
  };

  isVisible = false;

  // 表头
  fieldOptions: Array<CheckDataField> = [
    { label: 'No.', value: 'no', checked: true },
    { label: 'Name', value: 'name', checked: true },
    { label: 'Weight', value: 'weight', checked: true },
    { label: 'Sex', value: 'sex', checked: true },
    { label: 'Symbol', value: 'symbol', checked: true },
  ];
  checkboxError = false;
  checkFields: Array<string> = ['no', 'name', 'weight', 'sex', 'symbol'];

  // 行数
  radioValue = 'all';
  radioError1 = false;
  radioError2 = false;
  idxArr: Array<number> = [];

  constructor(
    public global: GlobalService,
    private xlsx: XlsxService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  handleModalCancel(): void {
    this.isVisible = false;
  }

  exportNormal(): void {
    this.xlsx.exportExcel(
      this.dataSource,
      'Export-with-normal',
      this.tableHeaders
    );
  }

  exportSpecified(): void {
    const radioError = this.radioError1 || this.radioError2;
    let sheetDatas: Array<PersonInfo> = [];
    if (this.radioValue === 'all') {
      if (this.checkboxError) {
        return;
      }
      sheetDatas = this.dataSource;
    } else {
      if (this.checkboxError || radioError) {
        return;
      }
      const tempDatas: any[] = this.dataSource.map((item: object) => {
        return pick(item, this.checkFields);
      });
      const idxArr = this.idxArr;
      for (let i = 0, j = idxArr.length; i < j; i++) {
        sheetDatas.push(tempDatas[idxArr[i] - 1]);
      }
    }

    if (!sheetDatas.length) {
      this.message.create('error', messageText.ERR_EXPORT_TO_EXCEL);
      return;
    }
    this.xlsx.exportExcel(
      sheetDatas,
      'Export by specified rows and columns',
      this.tableHeaders
    );
    this.isVisible = false;
  }

  selectCheckbox(fields: Array<string>): void {
    this.checkFields = fields;
    this.checkboxError = Boolean(!fields.length);
  }

  keyupOnInput(e: Event, val: string): void {
    this.radioError1 = false;
    this.radioError2 = false;
    const arr = val.split(',');
    const dataNum = this.dataNum;
    for (let i = 0, j = arr.length; i < j; i++) {
      const item = arr[i].trim();
      if (isNaN(Number(item))) {
        if (/^\d+-\d+$/.test(item)) {
          const [_str1, _str2] = item.split('-');
          const str1 = Number(_str1);
          const str2 = Number(_str2);
          if (!(str1 >= 1 && str1 <= str2 && str2 <= dataNum)) {
            if (str1 === 0) {
              this.radioError1 = true;
              break;
            }
            if (str1 > str2) {
              this.radioError2 = true;
              break;
            }
          }
        } else {
          this.radioError2 = true;
          break;
        }
      } else if (!(Number(item) >= 1 && Number(item) <= dataNum)) {
        this.radioError1 = true;
        break;
      }
    }
    if (!(this.radioError1 || this.radioError2)) {
      const idxArr = arr.map((item) => {
        if (/^\d+-\d+$/.test(item)) {
          const [_str1, _str2] = item.split('-');
          const _arr: Array<number> = [];
          const str1 = Number(_str1);
          const str2 = Number(_str2);
          for (let i = str1; i <= str2; i++) {
            _arr.push(i);
          }
          return _arr;
        } else {
          return Number(item);
        }
      });
      this.idxArr = flattenDeep(idxArr);
    }
  }
}
