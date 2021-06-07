import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

// https://github.com/SheetJS/js-xlsx/tree/master/demos/angular2
// https://blog.csdn.net/tian_i/article/details/84327329

@Injectable({
  providedIn: 'root',
})
export class XlsxService {
  excelType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  excelExtension = '.xlsx';
  wopts: XLSX.WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  };

  constructor() {}

  numberToChart(i: number): string {
    return String.fromCharCode(65 + i);
  }

  saveAsExcelFile(buffer: string, fileName: string): void {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i !== buffer.length; ++i) {
      // tslint:disable-next-line:no-bitwise
      view[i] = buffer.charCodeAt(i) & 0xff;
    }
    const data = new Blob([arrayBuffer], {
      type: this.excelType,
    });
    FileSaver.saveAs(
      data,
      fileName + '_' + new Date().getTime() + this.excelExtension
    );
  }

  // 参考@notadd/ngx-xlsx
  private exportAsExcelFile(
    json: any,
    excelFileName: string,
    headers?: any,
    sheetNames?: string[] | null
  ): void {
    if (headers === void 0) {
      headers = null;
    }
    if (sheetNames === void 0) {
      sheetNames = null;
    }

    if (!excelFileName) {
      throw new Error('xlsx: Parameter "excelFileName" is required');
    }

    if (!json || !json.length) {
      throw new Error('xlsx: Parameter "json" is required');
    }

    if (headers && headers.length) {
      if (
        headers.length !==
        Object.keys(Array.isArray(json[0]) ? json[0][0] : json[0]).length
      ) {
        throw new Error('xlsx: Parameter "headers" length mismatch');
      }
    }

    if (sheetNames && sheetNames.length) {
      if (
        Array.isArray(json[0])
          ? sheetNames.length !== json.length
          : sheetNames.length !== 1
      ) {
        throw new Error('xlsx: Parameter "sheetNames" length mismatch');
      }
    }

    // 配置workBook
    const workBook = { SheetNames: [] as string[], Sheets: {} as any };
    workBook.SheetNames.push(sheetNames ? sheetNames[0] : 'sheet' + 0);
    const worksheet = XLSX.utils.json_to_sheet(json);
    /* custom header */
    if (headers != null || headers.length !== 0) {
      for (let i = 0; i < headers.length; i++) {
        worksheet[this.numberToChart(i) + '1'] = { v: headers[i] };
      }
    }
    workBook.Sheets[workBook.SheetNames[0]] = worksheet;

    // 前面根据传参配置workBook，调用XLSX.write()，得到buffer，然后再用FileSaver保存到本地
    const excelBuffer = XLSX.write(workBook, this.wopts);
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportExcel(
    json: any,
    excelFileName: string,
    headers?: any,
    sheetNames?: string[]
  ): void {
    this.exportAsExcelFile(json, excelFileName, headers, sheetNames);
  }
}
