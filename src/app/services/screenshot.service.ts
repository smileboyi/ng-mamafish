import { Injectable, ElementRef } from '@angular/core';
import * as html2canvas from 'html2canvas';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {
  private modelWidth = 520;
  saveImgState = false;

  constructor(private modal: NzModalService) {}

  // 截图，返回一个canvas
  private captureDom(dom: any) {
    /* dom 宽度、高度、距离顶部的偏移量 */
    const style = window.getComputedStyle(dom);
    const width = parseInt(style.width, null);
    const height = parseInt(style.height, null);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.id = 'capture-canvas';
    const context = canvas.getContext('2d');
    const scaleBy = this.getPixelRatio(context);
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    context.scale(scaleBy, scaleBy);
    const options = {
      allowTaint: true, // 允许加载跨域的图片
      useCORS: true,
      tainttest: true, // 检测每张图片都已经加载完成
      scale: scaleBy,
      canvas, // 自定义 canvas
      logging: false, // 日志开关，发布的时候记得改成false
      width, // dom 原始宽度
      height // dom 原始高度
    };
    this.modelWidth = width;
    return html2canvas(dom, options);
  }

  private getPixelRatio(context: any): number {
    const backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  }

  // 截图预览弹窗的保存和取消处理
  capture(element: ElementRef): void {
    if (this.saveImgState) {
      return;
    }
    this.saveImgState = true;

    this.captureDom(element).then(
      canvas => {
        if (!this.saveImgState) {
          return;
        }
        const href = canvas.toDataURL('image/jpeg');
        // nzModal不能显示canvas
        const content = `<img src="${href}">`;
        this.modal.create({
          nzOkText: '保存为图片',
          nzCancelText: '取消',
          nzContent: content,
          nzMaskClosable: false,
          nzClosable: false,
          nzWidth: this.modelWidth,
          nzClassName: 'centre2',
          nzOnOk: () => {
            // 保存
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', href);
            downloadLink.setAttribute(
              'download',
              `capture_${new Date().getTime()}.jpeg`
            );
            downloadLink.click();
            this.saveImgState = false;
          },
          nzOnCancel: () => {
            // 取消
            this.saveImgState = false;
          }
        });
      },
      err => {
        if (!this.saveImgState) {
          return;
        }
        this.modal.error({
          nzTitle: 'This is an error message',
          nzContent: err
        });
      }
    );
  }
}
