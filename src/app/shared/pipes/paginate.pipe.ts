import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform<T>(data: Array<T>, args?: any): Array<T> {
    const config = Object.assign(
      {},
      {
        pageIndex: 0,
        pageSize: 8,
        length: data.length,
      },
      args instanceof Object ? args : {}
    );
    return this.paginate(data, config.pageSize, config.pageIndex);
  }

  paginate<T>(data: Array<T>, pageSize: number, pageIndex: number): Array<T> {
    return data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  }
}
