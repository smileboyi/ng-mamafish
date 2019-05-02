import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform<T>(data: Array<T>, args?: any): Array<T> {
    const config = Object.assign(
      {},
      {
        pageIndex: 0,
        pageSize: 8,
        length: data.length
      },
      args instanceof Object ? args : {}
    );
    return this.paginate(data, config.pageSize, config.pageIndex);
  }

  paginate<T>(
    data: Array<T>,
    page_size: number,
    page_number: number
  ): Array<T> {
    return data.slice((page_number - 1) * page_size, page_number * page_size);
  }
}
